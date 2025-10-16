import React from "react";

const Template2 = ({ invoiceData }) => {
  const colors = {
    background: "#19183B",
    secondary: "#708993",
    primary: "#A1C2BD",
    accent: "#E7F2EF",
  };

  return (
    <div
      className="p-4 text-white"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-4">
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: colors.primary }}
          >
            {invoiceData.invoiceTitle}
          </h1>
          <p className="text-lg" style={{ color: colors.accent }}>
            Invoice #: {invoiceData.invoiceNumber} | Date: {invoiceData.date}
          </p>
        </div>

        {/* From/To Section cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: colors.secondary }}
          >
            <h3 className="font-bold mb-2 text-lg">FROM</h3>
            <p className="font-semibold">{invoiceData.from.companyName}</p>
            <p>{invoiceData.from.address}</p>
            <p>{invoiceData.from.email}</p>
            <p>{invoiceData.from.phone}</p>
          </div>
          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: colors.secondary }}
          >
            <h3 className="font-bold mb-2 text-lg">BILL TO</h3>
            <p className="font-semibold">{invoiceData.to.clientName}</p>
            <p>{invoiceData.to.address}</p>
            <p>{invoiceData.to.email}</p>
            <p>{invoiceData.to.phone}</p>
          </div>
        </div>

        {/* Items Table for desktop*/}
        <div className="mb-4 hidden md:block">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ backgroundColor: colors.primary }}>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right">Price</th>
                <th className="p-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor:
                      index % 2 === 0
                        ? "rgba(161, 194, 189, 0.1)"
                        : "rgba(112, 137, 147, 0.2)",
                  }}
                >
                  <td className="p-3">{item.name}</td>
                  <td className="p-3 text-center">{item.quantity}</td>
                  <td className="p-3 text-right">${item.unitPrice}</td>
                  <td className="p-3 text-right">
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
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${item.quantity * item.unitPrice}
                  </p>
                  <p className="text-sm text-gray-600">
                    ${item.unitPrice} each
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Totals summary */}
        <div className="flex justify-end mb-4">
          <div className="w-80">
            <div
              className="flex justify-between p-3 border-b"
              style={{ borderColor: colors.primary }}
            >
              <span>Subtotal:</span>
              <span>${invoiceData.subtotal}</span>
            </div>
            <div
              className="flex justify-between p-3 border-b mb-2"
              style={{ borderColor: colors.primary }}
            >
              <span>Tax ({invoiceData.taxRate}%):</span>
              <span>${invoiceData.taxAmount.toFixed(2)}</span>
            </div>
            <div
              className="flex justify-between p-4 font-bold text-xl"
              style={{
                backgroundColor: colors.primary,
                color: colors.background,
              }}
            >
              <span>TOTAL DUE:</span>
              <span>${invoiceData.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoiceData.notes && (
          <div
            className="p-4 rounded-lg"
            style={{ backgroundColor: colors.secondary }}
          >
            <h4 className="font-bold mb-2">Notes</h4>
            <p>{invoiceData.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Template2;
