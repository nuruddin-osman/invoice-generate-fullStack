import React from "react";

const Template1 = ({ invoiceData }) => {
  const colors = {
    background: "#F5EFE6",
    secondary: "#E8DFCA",
    primary: "#6D94C5",
    accent: "#CBDCEB",
  };

  return (
    <div className="p-4" style={{ backgroundColor: colors.background }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          className="flex justify-between items-center mb-4 p-4 rounded-lg"
          style={{ backgroundColor: colors.secondary }}
        >
          <div>
            <h1
              className="text-lg md:text-3xl font-bold leading-5"
              style={{ color: colors.primary }}
            >
              {invoiceData.invoiceTitle}
            </h1>
            <p className="text-sm md:text-lg" style={{ color: colors.primary }}>
              #{invoiceData.invoiceNumber}
            </p>
          </div>
          <div className="text-right ">
            <p className=" font-semibold text-xs md:text-base">
              Date: {invoiceData.date}
            </p>
          </div>
        </div>

        {/* From/To Section cards*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div
            className="p-4 rounded-lg"
            style={{ backgroundColor: colors.accent }}
          >
            <h3 className="font-bold mb-2" style={{ color: colors.primary }}>
              From:
            </h3>
            <p className="font-semibold">{invoiceData.from.companyName}</p>
            <p>{invoiceData.from.address}</p>
            <p>{invoiceData.from.email}</p>
            <p>{invoiceData.from.phone}</p>
          </div>
          <div
            className="p-4 rounded-lg"
            style={{ backgroundColor: colors.accent }}
          >
            <h3 className="font-bold mb-2" style={{ color: colors.primary }}>
              To:
            </h3>
            <p className="font-semibold">{invoiceData.to.clientName}</p>
            <p>{invoiceData.to.address}</p>
            <p>{invoiceData.to.email}</p>
            <p>{invoiceData.to.phone}</p>
          </div>
        </div>

        {/* Items Table for Desktop */}
        <div className="mb-4 hidden md:block">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ backgroundColor: colors.primary }}>
                <th className="text-white p-3 text-left">Item</th>
                <th className="text-white p-3 text-center">Quantity</th>
                <th className="text-white p-3 text-right">Unit Price</th>
                <th className="text-white p-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? colors.accent : colors.secondary,
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
                backgroundColor:
                  index % 2 === 0 ? colors.accent : colors.secondary,
                borderColor: colors.primary,
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

        {/* Totals summary*/}
        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between p-2">
              <span>Subtotal:</span>
              <span>${invoiceData.subtotal}</span>
            </div>
            <div className="flex justify-between p-2">
              <span>Tax ({invoiceData.taxRate}%):</span>
              <span>${invoiceData.taxAmount.toFixed(2)}</span>
            </div>
            <div
              className="flex justify-between p-3 font-bold text-lg"
              style={{ backgroundColor: colors.primary, color: "white" }}
            >
              <span>Total:</span>
              <span>${invoiceData.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoiceData.notes && (
          <div
            className="mt-4 p-2 rounded-lg"
            style={{ backgroundColor: colors.secondary }}
          >
            <h4 className="font-bold mb-2" style={{ color: colors.primary }}>
              Notes:
            </h4>
            <p>{invoiceData.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template1;
