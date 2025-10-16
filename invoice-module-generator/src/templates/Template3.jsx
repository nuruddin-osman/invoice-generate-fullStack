import React from "react";
import { IoCall } from "react-icons/io5";
import { CgMail } from "react-icons/cg";

const Template3 = ({ invoiceData }) => {
  const colors = {
    background: "#F9F5F0",
    secondary: "#F2EAD3",
    primary: "#F4991A",
    accent: "#344F1F",
  };

  return (
    <div className="p-4" style={{ backgroundColor: colors.background }}>
      <div className="max-w-4xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-4">
          <div className="inline-block  rounded-full">
            <h1
              className={`text-3xl font-bold`}
              style={{ color: colors.primary }}
            >
              {invoiceData.invoiceTitle}
            </h1>
          </div>
          <div className="flex justify-center items-center gap-6 mt-2">
            <div
              className="text-sm md:text-lg font-semibold"
              style={{ color: colors.accent }}
            >
              Invoice:{" "}
              <span className="font-bold">#{invoiceData.invoiceNumber}</span>
            </div>
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colors.primary }}
            ></div>
            <div
              className="text-sm md:text-lg font-semibold"
              style={{ color: colors.accent }}
            >
              Date: {invoiceData.date}
            </div>
          </div>
        </div>

        {/* From/To Section  cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
          <div
            className="p-3 rounded-xl shadow-lg"
            style={{ backgroundColor: colors.secondary }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors.primary }}
              ></div>
              <h3
                className="text-xl font-bold"
                style={{ color: colors.accent }}
              >
                From
              </h3>
            </div>
            <div className="space-y-1">
              <p
                className="text-lg font-semibold"
                style={{ color: colors.accent }}
              >
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
            <div className="flex items-center gap-3 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors.primary }}
              ></div>
              <h3
                className="text-xl font-bold"
                style={{ color: colors.accent }}
              >
                Bill To
              </h3>
            </div>
            <div className="space-y-1">
              <p
                className="text-lg font-semibold"
                style={{ color: colors.accent }}
              >
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
        <div className="mb-3 overflow-hidden rounded-lg shadow-lg hidden md:block">
          <div className="p-2" style={{ backgroundColor: colors.primary }}>
            <h3 className="text-lg font-bold text-white text-center">
              Invoice Items
            </h3>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: colors.accent }}>
                <th className="p-2 text-left text-white font-semibold">
                  Item Description
                </th>
                <th className="p-2 text-center text-white font-semibold">
                  Qty
                </th>
                <th className="p-2 text-right text-white font-semibold">
                  Unit Price
                </th>
                <th className="p-2 text-right text-white font-semibold">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "" : ""}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? colors.secondary : "#FFFFFF",
                  }}
                >
                  <td
                    className="p-2 font-medium"
                    style={{ color: colors.accent }}
                  >
                    {item.name}
                  </td>
                  <td
                    className="p-2 text-center"
                    style={{ color: colors.accent }}
                  >
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
        {/* Items Cards for Mobile */}
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

        {/* Totals summary Section  */}
        <div className="flex justify-end mb-3">
          <div className="w-full md:w-96">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div
                className="p-2 text-center"
                style={{ backgroundColor: colors.primary }}
              >
                <h3 className="text-base font-bold text-white">Total Amount</h3>
              </div>
              <div
                className="p-3 space-y-2"
                style={{ backgroundColor: colors.secondary }}
              >
                <div
                  className="flex justify-between items-center pb-2 border-b"
                  style={{ borderColor: colors.primary }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: colors.accent }}
                  >
                    Subtotal:
                  </span>
                  <span className="font-bold" style={{ color: colors.accent }}>
                    ${invoiceData.subtotal}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center pb-2 border-b"
                  style={{ borderColor: colors.primary }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: colors.accent }}
                  >
                    Tax ({invoiceData.taxRate}%):
                  </span>
                  <span className="font-bold" style={{ color: colors.accent }}>
                    ${invoiceData.taxAmount.toFixed(2)}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center px-2 py-2 rounded-lg"
                  style={{ backgroundColor: colors.accent }}
                >
                  <span className="text-base font-bold text-white">
                    Total Due:
                  </span>
                  <span className="text-base font-bold text-white">
                    ${invoiceData.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        {invoiceData.notes && (
          <div
            className=" p-2 rounded-xl"
            style={{ backgroundColor: colors.secondary }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.primary }}
              ></div>
              <h4
                className="text-lg font-bold"
                style={{ color: colors.accent }}
              >
                Additional Notes
              </h4>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              {invoiceData.notes}
            </p>
          </div>
        )}

        {/* Footer */}
        <div
          className="text-center mt-3 pt-3 border-t"
          style={{ borderColor: colors.primary }}
        >
          <p className="text-sm" style={{ color: colors.accent }}>
            Thank you for your business! • {invoiceData.from.companyName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Template3;
