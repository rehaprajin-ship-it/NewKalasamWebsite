import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Kalasam Jaikrishna Industries';
    workbook.lastModifiedBy = 'Admin CMS';
    workbook.created = new Date();
    workbook.modified = new Date();

    // ─────────────────────────────────────────────────────────────
    // Sheet 3: Category Reference (created first so Sheet 1 can reference it if needed)
    // ─────────────────────────────────────────────────────────────
    const catSheet = workbook.addWorksheet('Category Reference', {
      views: [{ showGridLines: true }],
    });

    catSheet.columns = [
      { header: 'Valid Category Name', key: 'category', width: 28 },
      { header: 'Category Slug', key: 'slug', width: 24 },
      { header: 'Description', key: 'description', width: 50 },
    ];

    // Format header
    catSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    catSheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF128C7E' },
    };

    PRODUCT_CATEGORIES.forEach((cat) => {
      catSheet.addRow({
        category: cat.name,
        slug: cat.slug,
        description: cat.description || '',
      });
    });

    // ─────────────────────────────────────────────────────────────
    // Sheet 1: Products (The data entry sheet)
    // ─────────────────────────────────────────────────────────────
    const prodSheet = workbook.addWorksheet('Products', {
      views: [{ state: 'frozen', ySplit: 1, showGridLines: true }],
    });

    const columnsDef = [
      { header: 'row_type', key: 'row_type', width: 16 },
      { header: 'parent_sku', key: 'parent_sku', width: 16 },
      { header: 'product_name', key: 'product_name', width: 32 },
      { header: 'sku', key: 'sku', width: 16 },
      { header: 'category', key: 'category', width: 22 },
      { header: 'material_type', key: 'material_type', width: 18 },
      { header: 'packing_type', key: 'packing_type', width: 24 },
      { header: 'custom_packing_available', key: 'custom_packing_available', width: 24 },
      { header: 'variant_attribute_name', key: 'variant_attribute_name', width: 24 },
      { header: 'variant_attribute_value', key: 'variant_attribute_value', width: 24 },
      { header: 'sort_order', key: 'sort_order', width: 14 },
      { header: 'status', key: 'status', width: 14 },
      { header: 'meta_title', key: 'meta_title', width: 32 },
      { header: 'meta_description', key: 'meta_description', width: 45 },
      { header: 'keywords', key: 'keywords', width: 35 },
      { header: 'on_page_description', key: 'on_page_description', width: 50 },
      { header: 'applications', key: 'applications', width: 35 },
      { header: 'cas_number', key: 'cas_number', width: 16 },
      { header: 'molecular_formula', key: 'molecular_formula', width: 20 },
      { header: 'purity_percentage', key: 'purity_percentage', width: 18 },
      { header: 'hs_code', key: 'hs_code', width: 16 },
      { header: 'shelf_life', key: 'shelf_life', width: 16 },
      { header: 'storage_instructions', key: 'storage_instructions', width: 35 },
      { header: 'image_filename', key: 'image_filename', width: 28 },
      { header: 'msds_link', key: 'msds_link', width: 25 },
      { header: 'coa_link', key: 'coa_link', width: 25 },
      { header: 'tds_link', key: 'tds_link', width: 25 },
    ];

    prodSheet.columns = columnsDef;

    // Header styling
    const headerRow = prodSheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1F2937' }, // Dark slate
    };
    headerRow.height = 28;
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    // Apply data validations for rows 2 to 500
    const categoriesList = `"${PRODUCT_CATEGORIES.map((c) => c.name).join(',')}"`;

    for (let i = 2; i <= 500; i++) {
      // row_type dropdown (Col A / 1)
      prodSheet.getCell(`A${i}`).dataValidation = {
        type: 'list',
        allowBlank: false,
        formulae: ['"Main Product,Variant"'],
        showErrorMessage: true,
        errorTitle: 'Invalid Row Type',
        error: 'Must be either "Main Product" or "Variant".',
      };

      // category dropdown (Col E / 5)
      prodSheet.getCell(`E${i}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [categoriesList],
        showErrorMessage: true,
        errorTitle: 'Invalid Category',
        error: 'Please select a valid category from the list.',
      };

      // custom_packing_available dropdown (Col H / 8)
      prodSheet.getCell(`H${i}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['"Yes,No"'],
        showErrorMessage: true,
        errorTitle: 'Invalid Selection',
        error: 'Must be "Yes" or "No".',
      };

      // status dropdown (Col L / 12)
      prodSheet.getCell(`L${i}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['"Active,Draft"'],
        showErrorMessage: true,
        errorTitle: 'Invalid Status',
        error: 'Must be "Active" or "Draft".',
      };
    }

    // ─────────────────────────────────────────────────────────────
    // Sheet 2: Instructions & Worked Example
    // ─────────────────────────────────────────────────────────────
    const instSheet = workbook.addWorksheet('Instructions', {
      views: [{ showGridLines: true }],
    });

    instSheet.columns = [
      { header: '', key: 'colA', width: 26 },
      { header: '', key: 'colB', width: 22 },
      { header: '', key: 'colC', width: 75 },
    ];

    let rowNum = 1;

    const addTitle = (title: string) => {
      const row = instSheet.getRow(rowNum);
      row.getCell(1).value = title;
      row.font = { bold: true, size: 14, color: { argb: 'FF128C7E' } };
      instSheet.mergeCells(`A${rowNum}:C${rowNum}`);
      rowNum += 2;
    };

    const addSectionHeader = (header: string) => {
      const row = instSheet.getRow(rowNum);
      row.getCell(1).value = header;
      row.font = { bold: true, size: 11, color: { argb: 'FF1F2937' } };
      instSheet.mergeCells(`A${rowNum}:C${rowNum}`);
      rowNum++;
    };

    const addParagraph = (text: string) => {
      const row = instSheet.getRow(rowNum);
      row.getCell(1).value = text;
      instSheet.mergeCells(`A${rowNum}:C${rowNum}`);
      row.alignment = { wrapText: true };
      rowNum++;
    };

    addTitle('Kalasam Enterprise Bulk Product Import Instructions');

    addSectionHeader('1. Understanding Row Types & Hierarchy');
    addParagraph('• "Main Product" row: Represents the base product item. Requires product_name, sku, category, on_page_description, and status.');
    addParagraph('• "Variant" row: Represents a specific size/pack/shape option for a Main Product. Must include parent_sku (matching the Main Product\'s SKU in the same file), variant_attribute_name, and variant_attribute_value.');
    addParagraph('• If a product has no variations, simply create 1 "Main Product" row with its primary SKU and packaging info.');
    rowNum++;

    addSectionHeader('2. Required vs Optional Fields');
    addParagraph('• Required for Main Products: row_type, product_name, sku, category, status, on_page_description, meta_title, meta_description.');
    addParagraph('• Required for Variants: row_type ("Variant"), parent_sku, sku (unique variant SKU), variant_attribute_name, variant_attribute_value.');
    addParagraph('• Optional fields: material_type, packing_type, custom_packing_available, sort_order, keywords, applications, cas_number, molecular_formula, purity_percentage, hs_code, shelf_life, storage_instructions, image_filename, msds_link, coa_link, tds_link.');
    addParagraph('• Blank Field Safeguard: If a field is left blank in the template for an existing product, the import will preserve the existing value in the database. Only provided non-empty values will update the product.');
    rowNum++;

    addSectionHeader('3. Chemical Specifications & Integrity Rule');
    addParagraph('• CRITICAL: Do NOT guess or copy cas_number, molecular_formula, or purity_percentage.');
    addParagraph('• If these values are not yet certified for the product, leave them genuinely blank. They will remain unset and flagged in Admin as "needs verification".');
    rowNum++;

    addSectionHeader('4. Images & Cloudinary Naming');
    addParagraph('• In the "image_filename" column, enter only the short filename (e.g. "lamp-oil-200ml.jpg" or "kalasam-sambrani-cup.png").');
    addParagraph('• The import system automatically attaches the Cloudinary products folder prefix: https://res.cloudinary.com/<cloud-name>/image/upload/v1/products/<image_filename>');
    addParagraph('• If image_filename is left blank, the product uses the standard category placeholder.');
    rowNum++;

    addSectionHeader('5. Worked Example (Lamp Oil 200ml with 250ml Variant)');
    rowNum++;

    // Table of worked example
    const exampleHeaders = [
      'row_type', 'parent_sku', 'product_name', 'sku', 'category',
      'material_type', 'packing_type', 'custom_packing_available',
      'variant_attribute_name', 'variant_attribute_value', 'status',
      'image_filename', 'meta_title'
    ];

    const exRow1 = instSheet.getRow(rowNum);
    exampleHeaders.forEach((h, idx) => {
      exRow1.getCell(idx + 1).value = h;
    });
    exRow1.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    exRow1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF374151' } };
    rowNum++;

    const sampleData = [
      ['Main Product', '', 'Kalasam Lamp Oil 200ml', 'KL032', 'Lamp Oil', 'Liquid', '200ml Bottle', 'Yes', '', '', 'Active', 'lamp-oil-200ml.jpg', 'Kalasam Lamp Oil 200ml | Pure Pooja Oil'],
      ['Variant', 'KL032', 'Kalasam Lamp Oil 250ml Variant', 'KL033', 'Lamp Oil', 'Liquid', '250ml Bottle', 'Yes', 'Volume', '250ml', 'Active', 'lamp-oil-250ml.jpg', 'Kalasam Lamp Oil 250ml | Pure Pooja Oil'],
    ];

    sampleData.forEach((rowValues) => {
      const r = instSheet.getRow(rowNum);
      rowValues.forEach((val, idx) => {
        r.getCell(idx + 1).value = val;
      });
      rowNum++;
    });

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="kalasam-bulk-product-import-template.xlsx"',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    console.error('Failed to generate template:', error);
    return NextResponse.json(
      { error: 'Failed to generate bulk import template', details: error.message },
      { status: 500 }
    );
  }
}
