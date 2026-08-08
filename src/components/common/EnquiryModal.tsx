'use client';

import { useState, useEffect } from 'react';

export default function EnquiryModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Listen for global event from MobileBottomBar
  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent;
      const details = customEvent.detail || (typeof window !== 'undefined' ? (window as any).currentProductDetail : null);
      if (details) {
        setFormData((prev) => ({
          ...prev,
          product: details.product || '',
          casNo: details.casNo || '',
          grade: details.grade || '',
        }));
      }
      setIsOpen(true);
    };
    window.addEventListener('open-enquiry-modal', handler);
    return () => window.removeEventListener('open-enquiry-modal', handler);
  }, []);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    city: '',
    pincode: '',
    gst: '',
    product: '',
    quantity: '',
    casNo: '',
    grade: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaChecked) {
      alert('Please verify that you are not a robot.');
      return;
    }
    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setCaptchaChecked(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        city: '',
        pincode: '',
        gst: '',
        product: '',
        quantity: '',
        casNo: '',
        grade: '',
        message: '',
      });
    }, 2500);
  };

  return (
    <>
      {/* Custom Styles for Enquiry Button Animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes enquiry-wiggle {
          0%, 100% {
            transform: translateY(-50%) rotate(180deg) translateX(0);
          }
          50% {
            transform: translateY(-50%) rotate(180deg) translateX(-4px);
            box-shadow: -4px 0 16px rgba(43, 138, 62, 0.6);
          }
        }
        @keyframes enquiry-ripple {
          0% {
            transform: translateY(-50%) scale(0.95);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-50%) scale(1.15) translateX(-8px);
            opacity: 0.3;
          }
          100% {
            transform: translateY(-50%) scale(1.3) translateX(-16px);
            opacity: 0;
          }
        }
        @keyframes enquiry-shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-enquiry-wiggle {
          animation: enquiry-wiggle 3s infinite ease-in-out;
        }
        .animate-enquiry-ripple-1 {
          animation: enquiry-ripple 2.5s infinite ease-out;
        }
        .animate-enquiry-ripple-2 {
          animation: enquiry-ripple 2.5s infinite ease-out 1.25s;
        }
        .shimmer-bg {
          background: linear-gradient(120deg, #2b8a3e 30%, #4ccd3c 50%, #2b8a3e 70%);
          background-size: 200% 100%;
          animation: enquiry-shimmer 3s infinite linear;
          will-change: background-position;
        }
      `}} />



      {/* Modal Dialog Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl relative max-h-[95vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Body */}
            <div className="p-5 md:p-6 overflow-y-auto">
              {isSubmitted ? (
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-700 text-gray-900">Inquiry Submitted!</h3>
                  <p className="text-sm text-gray-600 mt-2 max-w-sm">
                    Thank you for contacting Kalasam Jaikrishna Industries. Our technical sales team will review your requirements and get back to you shortly.
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-4">
                    <h2 className="text-xl font-800 text-gray-950">Get In Touch</h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Tell us what you need — we&apos;ll get back to you shortly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Row 1: Name, Email, Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Name *"
                          className="w-full px-2.5 py-2 rounded-md border border-gray-200 text-base sm:text-xs text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-[#2b8a3e] focus:ring-1 focus:ring-[#2b8a3e] outline-hidden transition-all"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Your Email *"
                          className="w-full px-2.5 py-1.5 rounded-md border border-gray-200 text-xs text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-[#2b8a3e] focus:ring-1 focus:ring-[#2b8a3e] outline-hidden transition-all"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Mobile Number *"
                          className="w-full px-2.5 py-1.5 rounded-md border border-gray-200 text-xs text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-[#2b8a3e] focus:ring-1 focus:ring-[#2b8a3e] outline-hidden transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Company, Country, City */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <input
                          type="text"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Company Name *"
                          className="w-full px-2.5 py-1.5 rounded-md border border-gray-200 text-xs text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-[#2b8a3e] focus:ring-1 focus:ring-[#2b8a3e] outline-hidden transition-all"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="country"
                          required
                          value={formData.country}
                          onChange={handleInputChange}
                          placeholder="Country *"
                          className="w-full px-2.5 py-1.5 rounded-md border border-gray-200 text-xs text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-[#2b8a3e] focus:ring-1 focus:ring-[#2b8a3e] outline-hidden transition-all"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City *"
                          className="w-full px-2.5 py-1.5 rounded-md border border-gray-200 text-xs text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-[#2b8a3e] focus:ring-1 focus:ring-[#2b8a3e] outline-hidden transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 3: Pincode, GST, Product */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <input
                          type="text"
                          inputMode="numeric"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="Pincode"
                          className="w-full px-2.5 py-2 rounded-md border border-gray-200 text-base sm:text-xs text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-[#2b8a3e] focus:ring-1 focus:ring-[#2b8a3e] outline-hidden transition-all"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="gst"
                          value={formData.gst}
                          onChange={handleInputChange}
                          placeholder="GST No."
                          className="w-full px-2.5 py-1.5 rounded-md border border-gray-200 text-xs text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-[#2b8a3e] focus:ring-1 focus:ring-[#2b8a3e] outline-hidden transition-all"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="product"
                          required
                          value={formData.product}
                          onChange={handleInputChange}
                          placeholder="Product Name *"
                          className="w-full px-2.5 py-1.5 rounded-md border border-gray-200 text-xs text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-[#2b8a3e] focus:ring-1 focus:ring-[#2b8a3e] outline-hidden transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 4: Quantity, CAS, Grade */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <input
                          type="text"
                          name="quantity"
                          required
                          value={formData.quantity}
                          onChange={handleInputChange}
                          placeholder="Quantity - Kg *"
                          className="w-full px-2.5 py-1.5 rounded-md border border-gray-200 text-xs text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-[#2b8a3e] focus:ring-1 focus:ring-[#2b8a3e] outline-hidden transition-all"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="casNo"
                          value={formData.casNo}
                          onChange={handleInputChange}
                          placeholder="CAS No."
                          className="w-full px-2.5 py-1.5 rounded-md border border-gray-200 text-xs text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-[#2b8a3e] focus:ring-1 focus:ring-[#2b8a3e] outline-hidden transition-all"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="grade"
                          value={formData.grade}
                          onChange={handleInputChange}
                          placeholder="Form / Grade"
                          className="w-full px-2.5 py-1.5 rounded-md border border-gray-200 text-xs text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-[#2b8a3e] focus:ring-1 focus:ring-[#2b8a3e] outline-hidden transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 5: Message */}
                    <div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Message (optional)"
                        rows={2}
                        className="w-full px-2.5 py-1.5 rounded-md border border-gray-200 text-xs text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-[#2b8a3e] focus:ring-1 focus:ring-[#2b8a3e] outline-hidden transition-all resize-none"
                      />
                    </div>

                    {/* Row 6: reCAPTCHA simulator */}
                    <div className="pt-1 flex justify-start">
                      <div className="inline-flex items-center justify-between bg-gray-50 border border-gray-200 rounded p-2.5 w-60 select-none">
                        <label className="flex items-center gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={captchaChecked}
                            onChange={(e) => setCaptchaChecked(e.target.checked)}
                            className="w-4.5 h-4.5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                          />
                          <span className="text-[11px] font-500 text-gray-700">I&apos;m not a robot</span>
                        </label>
                        <div className="flex flex-col items-center justify-center opacity-85">
                          <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.07 4.93A10 10 0 0 0 2 12h3a7 7 0 1 1 7 7v3a10 10 0 0 0 7.07-17.07z" />
                            <path d="M12 2a10 10 0 0 0-7.07 17.07L7.07 17.07A7 7 0 1 1 12 5V2z" />
                          </svg>
                          <span className="text-[7px] text-gray-400 mt-0.5 tracking-tighter">reCAPTCHA</span>
                        </div>
                      </div>
                    </div>

                    {/* Row 7: Submit button */}
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#2b8a3e] hover:bg-[#226e31] active:bg-[#1a5525] text-white font-700 rounded-md text-xs transition-colors cursor-pointer shadow-md"
                    >
                      Submit Inquiry
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
