import React, { useState } from 'react';

/**
 * Static QR Pay page. Image is fixed in code: add your QR image at public/qr-pay.png.
 * No upload — replace the file in the project to change the QR.
 */
const QR_IMAGE_PATH = './qr.jpeg';
export default function QrPay() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="space-y-6">
      <div className="page-card p-5">
        <h1 className="text-2xl font-bold text-slate-800">Pay via QR</h1>
        <p className="text-slate-600 mt-1">Scan the QR code below to make your payment.</p>
      </div>
      <div className="page-card p-6 max-w-md flex flex-col items-center">
        {!imageError ? (
          <img
            src="./qr.jpeg"
            alt="Payment QR Code"
            className="w-full max-w-sm h-auto rounded-lg border border-slate-200 shadow-sm object-contain bg-white"
            onError={() => setImageError(true)}
          />
        ) : null}
        {imageError ? (
          <div className="mt-4 p-4 bg-slate-100 rounded-lg text-center text-slate-600 text-sm">
            <p className="font-medium">QR image not found.</p>
            <p className="mt-1">Add your image at <code className="bg-slate-200 px-1 rounded">frontend/public/qr-pay.png</code> (static, no upload).</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
