'use client';

import React, { useState, useRef } from 'react';
import ExcelJS from 'exceljs';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { saveProduct } from '@/lib/firestore';
import type { Product, ProductCategory, ProductVariant } from '@/types';

interface BulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingProducts: Product[];
  onImportComplete: () => void;
}

interface ParsedRow {
  rowNumber: number;
  row_type: string;
  parent_sku?: string;
  product_name?: string;
  sku: string;
  category?: string;
  material_type?: string;
  packing_type?: string;
  custom_packing_available?: string;
  variant_attribute_name?: string;
  variant_attribute_value?: string;
  sort_order?: number;
  status?: string;
  meta_title?: string;
  meta_description?: string;
  keywords?: string;
  on_page_description?: string;
  applications?: string;
  cas_number?: string;
  molecular_formula?: string;
  purity_percentage?: string;
  hs_code?: string;
  shelf_life?: string;
  storage_instructions?: string;
  image_filename?: string;
  msds_link?: string;
  coa_link?: string;
  tds_link?: string;
  errors: string[];
  warnings: string[];
  isNew: boolean;
}

const VALID_CATEGORIES = PRODUCT_CATEGORIES.map((c) => c.name);
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'kalasam';

export default function BulkImportModal({
  isOpen,
  onClose,
  existingProducts,
  onImportComplete,
}: BulkImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([]);
  const [importing, setImporting] = useState(false);
  const [importStep, setImportStep] = useState<'upload' | 'preview' | 'results'>('upload');
  const [importResults, setImportResults] = useState<{
    created: number;
    updated: number;
    skipped: number;
    details: string[];
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const resetState = () => {
    setFile(null);
    setParsing(false);
    setParsedRows([]);
    setImporting(false);
    setImportStep('upload');
    setImportResults(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.xlsx')) {
      alert('Please upload a valid .xlsx file.');
      return;
    }

    setFile(selectedFile);
    setParsing(true);

    try {
      const buffer = await selectedFile.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);

      const worksheet = workbook.getWorksheet('Products') || workbook.worksheets[0];
      if (!worksheet) {
        throw new Error('Worksheet "Products" not found in the workbook.');
      }

      // Map headers
      const headers: Record<string, number> = {};
      const headerRow = worksheet.getRow(1);
      headerRow.eachCell((cell, colNumber) => {
        const val = cell.value?.toString().trim().toLowerCase();
        if (val) headers[val] = colNumber;
      });

      const getVal = (row: ExcelJS.Row, colKey: string): string => {
        const colIdx = headers[colKey];
        if (!colIdx) return '';
        const cell = row.getCell(colIdx);
        if (cell.value === null || cell.value === undefined) return '';
        if (typeof cell.value === 'object' && 'text' in cell.value) {
          return (cell.value as any).text.toString().trim();
        }
        return cell.value.toString().trim();
      };

      const rows: ParsedRow[] = [];
      const seenSkus = new Set<string>();

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header

        const row_type = getVal(row, 'row_type');
        const sku = getVal(row, 'sku');

        // Skip completely empty rows
        if (!row_type && !sku) return;

        const rowData: ParsedRow = {
          rowNumber,
          row_type,
          parent_sku: getVal(row, 'parent_sku'),
          product_name: getVal(row, 'product_name'),
          sku,
          category: getVal(row, 'category'),
          material_type: getVal(row, 'material_type'),
          packing_type: getVal(row, 'packing_type'),
          custom_packing_available: getVal(row, 'custom_packing_available'),
          variant_attribute_name: getVal(row, 'variant_attribute_name'),
          variant_attribute_value: getVal(row, 'variant_attribute_value'),
          sort_order: getVal(row, 'sort_order') ? parseInt(getVal(row, 'sort_order'), 10) : undefined,
          status: getVal(row, 'status'),
          meta_title: getVal(row, 'meta_title'),
          meta_description: getVal(row, 'meta_description'),
          keywords: getVal(row, 'keywords'),
          on_page_description: getVal(row, 'on_page_description'),
          applications: getVal(row, 'applications'),
          cas_number: getVal(row, 'cas_number'),
          molecular_formula: getVal(row, 'molecular_formula'),
          purity_percentage: getVal(row, 'purity_percentage'),
          hs_code: getVal(row, 'hs_code'),
          shelf_life: getVal(row, 'shelf_life'),
          storage_instructions: getVal(row, 'storage_instructions'),
          image_filename: getVal(row, 'image_filename'),
          msds_link: getVal(row, 'msds_link'),
          coa_link: getVal(row, 'coa_link'),
          tds_link: getVal(row, 'tds_link'),
          errors: [],
          warnings: [],
          isNew: true,
        };

        // ── Validation Rules ──
        if (!rowData.row_type) {
          rowData.errors.push('row_type is required (Main Product or Variant).');
        } else if (!['main product', 'variant'].includes(rowData.row_type.toLowerCase())) {
          rowData.errors.push(`Invalid row_type: "${rowData.row_type}". Must be Main Product or Variant.`);
        }

        if (!rowData.sku) {
          rowData.errors.push('SKU is required.');
        } else {
          if (seenSkus.has(rowData.sku.toUpperCase())) {
            rowData.errors.push(`Duplicate SKU "${rowData.sku}" within this file.`);
          }
          seenSkus.add(rowData.sku.toUpperCase());
        }

        const isMain = rowData.row_type.toLowerCase() === 'main product';
        const isVariant = rowData.row_type.toLowerCase() === 'variant';

        if (isMain) {
          if (!rowData.product_name) rowData.errors.push('product_name is required for Main Products.');
          if (!rowData.category) {
            rowData.errors.push('category is required for Main Products.');
          } else if (!VALID_CATEGORIES.includes(rowData.category as ProductCategory)) {
            rowData.errors.push(`Invalid category "${rowData.category}". Must match one of: ${VALID_CATEGORIES.join(', ')}.`);
          }
          if (!rowData.on_page_description) {
            rowData.errors.push('on_page_description is required for Main Products.');
          }
          if (!rowData.status) {
            rowData.errors.push('status is required (Active or Draft).');
          }

          // Check if existing product in Firestore
          const exists = existingProducts.some(
            (p) =>
              (p as any).sku?.toUpperCase() === rowData.sku.toUpperCase() ||
              p.slug === rowData.product_name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
          );
          rowData.isNew = !exists;
        }

        if (isVariant) {
          if (!rowData.parent_sku) {
            rowData.errors.push('parent_sku is required for Variant rows.');
          }
          if (!rowData.variant_attribute_name) {
            rowData.errors.push('variant_attribute_name is required for Variant rows (e.g. Volume, Shape).');
          }
          if (!rowData.variant_attribute_value) {
            rowData.errors.push('variant_attribute_value is required for Variant rows (e.g. 250ml, Big Tablet).');
          }
        }

        // Warnings (non-blocking)
        if (rowData.meta_title && rowData.meta_title.length > 60) {
          rowData.warnings.push(`meta_title is ${rowData.meta_title.length} chars (recommended ≤ 60).`);
        }
        if (rowData.meta_description) {
          if (rowData.meta_description.length < 120 || rowData.meta_description.length > 160) {
            rowData.warnings.push(`meta_description is ${rowData.meta_description.length} chars (recommended 120–160).`);
          }
        }

        rows.push(rowData);
      });

      // Second pass: Ensure all Variant parent_skus exist in file or existing DB
      rows.forEach((r) => {
        if (r.row_type.toLowerCase() === 'variant' && r.parent_sku) {
          const parentInFile = rows.find(
            (m) =>
              m.row_type.toLowerCase() === 'main product' &&
              m.sku.toUpperCase() === r.parent_sku?.toUpperCase()
          );
          const parentInDb = existingProducts.find(
            (p) =>
              (p as any).sku?.toUpperCase() === r.parent_sku?.toUpperCase() ||
              p.variants?.some((v) => v.sku?.toUpperCase() === r.parent_sku?.toUpperCase())
          );

          if (!parentInFile && !parentInDb) {
            r.errors.push(`parent_sku "${r.parent_sku}" was not found in this file or the existing catalog.`);
          }
        }
      });

      setParsedRows(rows);
      setImportStep('preview');
    } catch (err: any) {
      alert(`Error reading Excel file: ${err.message}`);
    } finally {
      setParsing(false);
    }
  };

  const handleCommitImport = async () => {
    const errorRows = parsedRows.filter((r) => r.errors.length > 0);
    if (errorRows.length > 0) {
      if (
        !confirm(
          `There are ${errorRows.length} rows with errors that will be SKIPPED. Do you want to proceed with the remaining valid rows?`
        )
      ) {
        return;
      }
    }

    setImporting(true);

    let createdCount = 0;
    let updatedCount = 0;
    let skippedCount = errorRows.length;
    const details: string[] = [];

    try {
      const validRows = parsedRows.filter((r) => r.errors.length === 0);
      const mainRows = validRows.filter((r) => r.row_type.toLowerCase() === 'main product');
      const variantRows = validRows.filter((r) => r.row_type.toLowerCase() === 'variant');

      // Process Main Products first
      for (const m of mainRows) {
        const slug =
          m.product_name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
          m.sku.toLowerCase();

        // Check if exists in DB
        const existing = existingProducts.find(
          (p) => (p as any).sku?.toUpperCase() === m.sku.toUpperCase() || p.slug === slug
        );

        const buildImageUrl = (filename?: string) => {
          if (!filename) return null;
          if (filename.startsWith('http://') || filename.startsWith('https://')) return filename;
          return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1/products/${filename.replace(/^\/+/, '')}`;
        };

        const imageUrl = buildImageUrl(m.image_filename);

        const downloads = existing?.downloads ? [...existing.downloads] : [];
        if (m.msds_link) {
          downloads.push({ type: 'MSDS', label: 'Material Safety Data Sheet', url: m.msds_link });
        }
        if (m.coa_link) {
          downloads.push({ type: 'COA', label: 'Certificate of Analysis', url: m.coa_link });
        }
        if (m.tds_link) {
          downloads.push({ type: 'TDS', label: 'Technical Data Sheet', url: m.tds_link });
        }

        const payload: any = {
          name: m.product_name || existing?.name || '',
          slug: existing?.slug || slug,
          category: (m.category as ProductCategory) || existing?.category || 'Industrial Product',
          sku: m.sku || (existing as any)?.sku || '',
          shortDescription:
            m.on_page_description?.slice(0, 160) || existing?.shortDescription || 'Quality manufacturer product.',
          description: m.on_page_description || existing?.description || '',
          status: (m.status?.toLowerCase() as any) || existing?.status || 'active',
          featured: existing?.featured ?? false,
          exportAvailable: existing?.exportAvailable ?? true,
          downloads,
        };

        // Merge safeguard: only update if new non-empty value provided
        if (imageUrl) payload.images = [imageUrl, ...(existing?.images?.filter((img) => img !== imageUrl) || [])];
        if (m.material_type) payload.appearance = m.material_type;
        if (m.applications) payload.applications = m.applications.split(',').map((s) => s.trim()).filter(Boolean);
        if (m.cas_number) payload.casNumber = m.cas_number;
        if (m.molecular_formula) payload.molecularFormula = m.molecular_formula;
        if (m.purity_percentage) payload.purity = m.purity_percentage;
        if (m.shelf_life) payload.shelfLife = m.shelf_life;
        if (m.storage_instructions) payload.storage = m.storage_instructions;
        if (m.sort_order !== undefined) payload.sortOrder = m.sort_order;

        payload.seo = {
          metaTitle: m.meta_title || existing?.seo?.metaTitle || `${m.product_name} | Kalasam Jaikrishna Industries`,
          metaDescription:
            m.meta_description ||
            existing?.seo?.metaDescription ||
            m.on_page_description?.slice(0, 155) ||
            'Manufacturer & exporter of synthetic camphor and pooja products.',
          keywords: m.keywords || existing?.seo?.keywords || `${m.product_name}, kalasam, jaikrishna industries`,
        };

        // Initial variants array
        payload.variants = existing?.variants ? [...existing.variants] : [];

        // Save main product
        const savedId = await saveProduct(payload, existing?.id);
        if (existing) {
          updatedCount++;
          details.push(`Updated Main Product: ${m.product_name} (${m.sku})`);
        } else {
          createdCount++;
          details.push(`Created Main Product: ${m.product_name} (${m.sku})`);
        }

        // Attach saved ID to memory for variant linking
        (m as any).dbId = savedId;
      }

      // Process Variants and merge into parent products
      for (const v of variantRows) {
        // Find parent product in existing DB or newly created
        const parentMain = mainRows.find((m) => m.sku.toUpperCase() === v.parent_sku?.toUpperCase());
        const parentFromDb = existingProducts.find(
          (p) => (p as any).sku?.toUpperCase() === v.parent_sku?.toUpperCase()
        );

        const parentId = (parentMain as any)?.dbId || parentFromDb?.id;
        if (!parentId) {
          skippedCount++;
          details.push(`Skipped Variant ${v.sku}: Parent product ${v.parent_sku} not located.`);
          continue;
        }

        const newVariant: any = {
          id: `var-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          sku: v.sku,
          attributes: {
            [v.variant_attribute_name || 'Option']: v.variant_attribute_value || 'Default',
          },
          packingType: v.packing_type || 'Standard Pack',
          materialType: v.material_type || 'Standard',
          customPackingAvailable: v.custom_packing_available?.toLowerCase() === 'yes',
        };
        if (v.sort_order !== undefined && !isNaN(v.sort_order)) {
          newVariant.sortOrder = v.sort_order;
        }

        // Fetch latest parent from memory or DB
        const currentVariants: ProductVariant[] = parentFromDb?.variants ? [...parentFromDb.variants] : [];
        const existingVariantIdx = currentVariants.findIndex((x) => x.sku.toUpperCase() === v.sku.toUpperCase());

        if (existingVariantIdx >= 0) {
          currentVariants[existingVariantIdx] = {
            ...currentVariants[existingVariantIdx],
            ...newVariant,
            id: currentVariants[existingVariantIdx].id,
          };
          details.push(`Updated Variant: ${v.sku} on Parent ${v.parent_sku}`);
        } else {
          currentVariants.push(newVariant);
          details.push(`Added New Variant: ${v.sku} on Parent ${v.parent_sku}`);
        }

        await saveProduct({ variants: currentVariants }, parentId);
      }

      setImportResults({
        created: createdCount,
        updated: updatedCount,
        skipped: skippedCount,
        details,
      });
      setImportStep('results');
      onImportComplete();
    } catch (err: any) {
      alert(`Import failed: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  const validCount = parsedRows.filter((r) => r.errors.length === 0).length;
  const errorCount = parsedRows.filter((r) => r.errors.length > 0).length;
  const warningCount = parsedRows.filter((r) => r.warnings.length > 0).length;
  const newCount = parsedRows.filter((r) => r.errors.length === 0 && r.isNew && r.row_type.toLowerCase() === 'main product').length;
  const updateCount = parsedRows.filter((r) => r.errors.length === 0 && !r.isNew && r.row_type.toLowerCase() === 'main product').length;
  const variantCount = parsedRows.filter((r) => r.errors.length === 0 && r.row_type.toLowerCase() === 'variant').length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] shadow-2xl flex flex-col overflow-hidden border border-gray-100">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h3 className="text-lg font-800 text-gray-900 flex items-center gap-2">
              <span>📊</span> Bulk Product Import via Excel
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Upload, validate, and preview your offline Excel catalog before committing changes to Firestore.
            </p>
          </div>
          <button
            onClick={() => {
              resetState();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {importStep === 'upload' && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-200 hover:border-[#128C7E] rounded-2xl p-10 text-center transition-colors bg-gray-50/40">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#128C7E] text-2xl flex items-center justify-center mx-auto mb-4">
                  📥
                </div>
                <h4 className="text-base font-700 text-gray-900">Upload Filled Products Excel File</h4>
                <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                  Select your completed <code className="text-[#128C7E] bg-emerald-50 px-1.5 py-0.5 rounded-sm">.xlsx</code> template. The system will parse every row and display a full preview before saving anything.
                </p>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".xlsx"
                  className="hidden"
                  id="bulk-import-file"
                />

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <label
                    htmlFor="bulk-import-file"
                    className="px-5 py-2.5 bg-[#128C7E] hover:bg-[#075E54] text-white font-700 text-xs rounded-xl shadow-xs cursor-pointer transition-all inline-flex items-center gap-2"
                  >
                    {parsing ? 'Parsing Excel...' : 'Choose .xlsx File'}
                  </label>
                  <a
                    href="/api/admin/bulk-template"
                    download="kalasam-bulk-product-import-template.xlsx"
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-700 text-xs rounded-xl cursor-pointer transition-colors inline-flex items-center gap-1.5"
                  >
                    ⬇️ Download Fresh Template
                  </a>
                </div>

                {file && (
                  <p className="mt-4 text-xs font-600 text-emerald-700">
                    Selected file: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>

              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-800 space-y-1">
                <p className="font-700 flex items-center gap-1">
                  <span>💡</span> Import Rules & Safety Highlights:
                </p>
                <p>• Blank spec fields will NOT overwrite existing verified CAS or Purity data in the database.</p>
                <p>• Variant rows must reference their parent product SKU via the <code className="font-mono">parent_sku</code> column.</p>
                <p>• Short image filenames will automatically link to Cloudinary’s products directory.</p>
              </div>
            </div>
          )}

          {importStep === 'preview' && (
            <div className="space-y-6">
              {/* Summary Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-center">
                  <span className="text-[10px] font-800 uppercase tracking-wider text-emerald-700 block">New Products</span>
                  <span className="text-2xl font-900 text-emerald-900 mt-0.5 block">{newCount}</span>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-center">
                  <span className="text-[10px] font-800 uppercase tracking-wider text-blue-700 block">Updates & Variants</span>
                  <span className="text-2xl font-900 text-blue-900 mt-0.5 block">{updateCount + variantCount}</span>
                </div>
                <div className={`rounded-xl p-3.5 text-center border ${errorCount > 0 ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
                  <span className="text-[10px] font-800 uppercase tracking-wider block">Rows with Errors</span>
                  <span className="text-2xl font-900 mt-0.5 block">{errorCount}</span>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-center">
                  <span className="text-[10px] font-800 uppercase tracking-wider text-amber-700 block">Warnings</span>
                  <span className="text-2xl font-900 text-amber-900 mt-0.5 block">{warningCount}</span>
                </div>
              </div>

              {/* Table of parsed rows */}
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="max-h-72 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 text-gray-600 font-700 border-b border-gray-200 sticky top-0">
                      <tr>
                        <th className="p-3 w-14">Row</th>
                        <th className="p-3 w-28">Type</th>
                        <th className="p-3 w-24">SKU</th>
                        <th className="p-3">Name / Variant</th>
                        <th className="p-3 w-28">Category</th>
                        <th className="p-3 w-32">Action / Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {parsedRows.map((r) => {
                        const hasErrors = r.errors.length > 0;
                        const hasWarnings = r.warnings.length > 0;

                        return (
                          <tr
                            key={r.rowNumber}
                            className={`hover:bg-gray-50/70 transition-colors ${
                              hasErrors ? 'bg-rose-50/40' : hasWarnings ? 'bg-amber-50/30' : ''
                            }`}
                          >
                            <td className="p-3 font-mono text-gray-500 font-600">{r.rowNumber}</td>
                            <td className="p-3 font-600 text-gray-800">
                              <span className={`px-2 py-0.5 rounded-sm text-[10px] font-800 uppercase ${r.row_type.toLowerCase() === 'main product' ? 'bg-purple-100 text-purple-800' : 'bg-cyan-100 text-cyan-800'}`}>
                                {r.row_type}
                              </span>
                            </td>
                            <td className="p-3 font-mono font-700 text-gray-900">{r.sku}</td>
                            <td className="p-3">
                              <p className="font-700 text-gray-900">{r.product_name || `Variant for ${r.parent_sku}`}</p>
                              {hasErrors && (
                                <p className="text-[11px] text-rose-600 font-600 mt-1">
                                  ❌ {r.errors.join(' | ')}
                                </p>
                              )}
                              {hasWarnings && (
                                <p className="text-[11px] text-amber-600 font-500 mt-0.5">
                                  ⚠️ {r.warnings.join(' | ')}
                                </p>
                              )}
                            </td>
                            <td className="p-3 text-gray-600">{r.category || '—'}</td>
                            <td className="p-3">
                              {hasErrors ? (
                                <span className="text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full text-[10px] font-800">
                                  Will Skip
                                </span>
                              ) : r.row_type.toLowerCase() === 'variant' ? (
                                <span className="text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded-full text-[10px] font-800">
                                  Link Variant
                                </span>
                              ) : r.isNew ? (
                                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px] font-800">
                                  + Create New
                                </span>
                              ) : (
                                <span className="text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full text-[10px] font-800">
                                  🔄 Update
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {importStep === 'results' && importResults && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#128C7E] text-3xl flex items-center justify-center mx-auto">
                ✓
              </div>
              <div>
                <h4 className="text-lg font-800 text-gray-900">Bulk Import Completed!</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Products and variants have been safely processed and updated in Firestore.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                  <span className="text-xs font-700 text-emerald-800">Created</span>
                  <span className="text-2xl font-900 text-emerald-900 block mt-1">{importResults.created}</span>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                  <span className="text-xs font-700 text-blue-800">Updated</span>
                  <span className="text-2xl font-900 text-blue-900 block mt-1">{importResults.updated}</span>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                  <span className="text-xs font-700 text-gray-700">Skipped</span>
                  <span className="text-2xl font-900 text-gray-900 block mt-1">{importResults.skipped}</span>
                </div>
              </div>

              {importResults.details.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-4 text-left border border-gray-200 max-h-48 overflow-y-auto text-xs font-mono text-gray-700 space-y-1">
                  {importResults.details.map((d, i) => (
                    <div key={i}>• {d}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          {importStep === 'upload' && (
            <button
              onClick={() => {
                resetState();
                onClose();
              }}
              className="px-4 py-2 text-xs font-700 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          )}

          {importStep === 'preview' && (
            <>
              <button
                onClick={() => setImportStep('upload')}
                className="px-4 py-2 text-xs font-700 text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                ← Back to Upload
              </button>
              <button
                onClick={handleCommitImport}
                disabled={importing || validCount === 0}
                className="px-5 py-2.5 bg-[#128C7E] hover:bg-[#075E54] disabled:opacity-50 text-white text-xs font-700 rounded-xl cursor-pointer shadow-xs transition-all flex items-center gap-2"
              >
                {importing ? 'Committing to Firestore...' : `Confirm & Commit (${validCount} rows) →`}
              </button>
            </>
          )}

          {importStep === 'results' && (
            <button
              onClick={() => {
                resetState();
                onClose();
              }}
              className="ml-auto px-6 py-2.5 bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-700 rounded-xl cursor-pointer shadow-xs transition-all"
            >
              Done & Refresh Catalog
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
