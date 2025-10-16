import React from "react";
import { IoCall } from "react-icons/io5";
import { CgMail } from "react-icons/cg";
import { CgNotes } from "react-icons/cg";

const Template4 = ({ invoiceData }) => {
  const colors = {
    background: "#EBEBEB",
    secondary: "#FFFFFF",
    primary: "#0BA6DF",
    accent: "#EF7722",
    highlight: "#FAA533",
  };

  return (
    <div className="p-3" style={{ backgroundColor: colors.background }}>
      <div className="max-w-4xl mx-auto">
        {/*  Header with gradient */}
        <div className="rounded-xl overflow-hidden shadow-xl mb-3">
          <div
            className="p-2 text-white"
            style={{
              background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.highlight} 100%)`,
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">
                  {invoiceData.invoiceTitle}
                </h1>
                <p className="text-base opacity-90">Professional Invoice</p>
              </div>
              <div className="text-right">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-2 py-1">
                  <p className="text-xs opacity-90">Invoice No.</p>
                  <p className="text-lg font-bold">
                    #{invoiceData.invoiceNumber}
                  </p>
                </div>
                <p className="text-xs opacity-90">Date: {invoiceData.date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* From/To Section - Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
          <div
            className="p-3 rounded-xl shadow-lg"
            style={{ backgroundColor: colors.secondary }}
          >
            <div className="mb-1">
              <h3
                className="text-xl font-bold"
                style={{ color: colors.primary }}
              >
                From
              </h3>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-gray-800">
                {invoiceData.from.companyName}
              </p>
              <p className="text-gray-700 text-sm">
                {invoiceData.from.address}
              </p>
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <div className="text-lg text-gray-700">
                  <CgMail />
                </div>
                <span>{invoiceData.from.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <div className="text-lg text-gray-700">
                  <IoCall />
                </div>
                <span>{invoiceData.from.phone}</span>
              </div>
            </div>
          </div>

          <div
            className="p-3 rounded-xl shadow-lg"
            style={{ backgroundColor: colors.secondary }}
          >
            <div className="mb-1">
              <h3
                className="text-xl font-bold"
                style={{ color: colors.primary }}
              >
                Bill To
              </h3>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-gray-800">
                {invoiceData.to.clientName}
              </p>
              <p className="text-gray-700 text-sm">{invoiceData.to.address}</p>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="text-lg text-gray-700">
                  <CgMail />
                </div>
                <span>{invoiceData.to.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <div className="text-lg text-gray-700">
                  <IoCall />
                </div>
                <span>{invoiceData.to.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table for desktop */}
        <div className="bg-white rounded-md shadow-lg overflow-hidden mb-3 hidden md:block">
          <div className="p-2" style={{ backgroundColor: colors.primary }}>
            <h3 className="text-lg font-bold text-white text-center">
              Items & Services
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  style={{ backgroundColor: colors.background }}
                  className="text-sm"
                >
                  <th className="p-2 text-left font-bold text-gray-700">
                    Description
                  </th>
                  <th className="p-2 text-center font-bold text-gray-700">
                    Quantity
                  </th>
                  <th className="p-2 text-right font-bold text-gray-700">
                    Unit Price
                  </th>
                  <th className="p-2 text-right font-bold text-gray-700">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`text-sm ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="p-2 font-semibold text-gray-800">
                      {item.name}
                    </td>
                    <td className="p-2 text-center text-gray-600">
                      {item.quantity}
                    </td>
                    <td
                      className="p-2 text-right font-semibold"
                      style={{ color: colors.primary }}
                    >
                      ${item.unitPrice}
                    </td>
                    <td
                      className="p-2 text-right font-bold"
                      style={{ color: colors.accent }}
                    >
                      ${item.quantity * item.unitPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Items Cards - Mobile */}
        <div className="mb-4 md:hidden space-y-2">
          {invoiceData.items.map((item, index) => (
            <div
              key={item.id}
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.secondary,
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-700">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${item.quantity * item.unitPrice}
                  </p>
                  <p className="text-sm text-gray-700">
                    ${item.unitPrice} each
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div
          className={`grid grid-cols-1 gap-3 ${
            invoiceData.notes ? "lg:grid-cols-[1fr_2fr]" : "lg:grid-cols-1"
          }`}
        >
          {/* Notes Section */}
          {invoiceData.notes && (
            <div className="bg-white rounded-md shadow-lg p-3 order-2 md:order-1">
              <h4 className="text-base font-bold mb-1 flex items-center gap-2">
                <span style={{ color: colors.primary }}>
                  <CgNotes />
                </span>
                <span style={{ color: colors.primary }}>Notes</span>
              </h4>
              <p className="text-gray-600 leading-relaxed text-xs max-w-fit overflow-hidden">
                {invoiceData.notes}
              </p>
            </div>
          )}

          {/* Totals Section */}
          <div className="bg-white rounded-md shadow-lg p-3 order-1 md:order-2">
            <h4
              className="text-lg font-bold mb-2 text-center"
              style={{ color: colors.primary }}
            >
              Payment Summary
            </h4>
            <div className="space-y-1">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold text-gray-800">
                  ${invoiceData.subtotal}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">
                  Tax ({invoiceData.taxRate}%):
                </span>
                <span className="font-semibold text-gray-800">
                  ${invoiceData.taxAmount.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-200">
                <div
                  className="flex justify-between items-center py-2 px-3 rounded-lg font-bold text-lg"
                  style={{
                    background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.highlight} 100%)`,
                    color: "white",
                  }}
                >
                  <span>Total Amount</span>
                  <span>${invoiceData.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div
              className="mt-2 p-2 rounded-md text-center"
              style={{ backgroundColor: colors.background }}
            >
              <p className="text-sm text-gray-600">Payment Due Upon Receipt</p>
              <p className="text-xs text-gray-500 mt-1">
                Thank you for your business!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 pt-1">
          <div className="flex justify-center gap-3 mb-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="text-lg text-gray-700">
                <CgMail />
              </div>
              <span>{invoiceData.from.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="text-lg text-gray-700">
                <IoCall />
              </div>
              <span>{invoiceData.from.phone}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {invoiceData.from.companyName}.
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Template4;
