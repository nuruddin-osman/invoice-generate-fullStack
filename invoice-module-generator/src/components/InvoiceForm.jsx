import React from "react";
import DatePickers from "../utils/DatePickers";
import { IoMdClose } from "react-icons/io";
import ImageUploads from "./ImageUploads";

const InvoiceForm = ({ invoiceData, dispatch }) => {
  const handleFromChange = (field, value) => {
    dispatch({
      type: "UPDATE_FROM_FIELD",
      payload: { field, value },
    });
  };

  const handleToChange = (field, value) => {
    dispatch({
      type: "UPDATE_TO_FIELD",
      payload: { field, value },
    });
  };

  const handleItemChange = (id, field, value) => {
    dispatch({
      type: "UPDATE_ITEM",
      payload: { id, field, value },
    });
  };

  const addItem = () => {
    dispatch({ type: "ADD_ITEM" });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const handleTaxRateChange = (value) => {
    dispatch({
      type: "UPDATE_TAX_RATE",
      payload: parseFloat(value) || 0,
    });
  };

  const timestamp = Date.now()
    .toString()
    .split("")
    .reverse()
    .join("")
    .slice(0, 6);
  const handleCreateInvoiceNum = () => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: { field: "invoiceNumber", value: `INV-${timestamp}` },
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg md:text-2xl font-bold mb-3 md:mb-6">
        Invoice Details
      </h2>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Invoice Title
          </label>
          <input
            type="text"
            value={invoiceData.invoiceTitle}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                payload: { field: "invoiceTitle", value: e.target.value },
              })
            }
            className="inputCommonClass"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Invoice Number
          </label>
          <button onClick={handleCreateInvoiceNum} className="inputCommonClass">
            Press for invoice number
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Invoice Date</label>
          <DatePickers
            value={invoiceData.date}
            onChange={(formattedDate) => {
              dispatch({
                type: "UPDATE_FIELD",
                payload: { field: "date", value: formattedDate },
              });
            }}
          />
        </div>
      </div>

      {/* From Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">From (Your Company)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Company Name"
            value={invoiceData.from.companyName}
            onChange={(e) => handleFromChange("companyName", e.target.value)}
            className="inputCommonClass"
          />
          <input
            type="text"
            placeholder="Address"
            value={invoiceData.from.address}
            onChange={(e) => handleFromChange("address", e.target.value)}
            className="inputCommonClass"
          />
          <input
            type="email"
            placeholder="Email"
            value={invoiceData.from.email}
            onChange={(e) => handleFromChange("email", e.target.value)}
            className="inputCommonClass"
          />
          <input
            type="text"
            placeholder="Phone"
            value={invoiceData.from.phone}
            onChange={(e) => handleFromChange("phone", e.target.value)}
            className="inputCommonClass"
          />
        </div>
      </div>

      {/* To Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">To (Client)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Client Name"
            value={invoiceData.to.clientName}
            onChange={(e) => handleToChange("clientName", e.target.value)}
            className="inputCommonClass"
          />
          <input
            type="text"
            placeholder="Address"
            value={invoiceData.to.address}
            onChange={(e) => handleToChange("address", e.target.value)}
            className="inputCommonClass"
          />
          <input
            type="email"
            placeholder="Email"
            value={invoiceData.to.email}
            onChange={(e) => handleToChange("email", e.target.value)}
            className="inputCommonClass"
          />
          <input
            type="text"
            placeholder="Phone"
            value={invoiceData.to.phone}
            onChange={(e) => handleToChange("phone", e.target.value)}
            className="inputCommonClass"
          />
        </div>
      </div>

      {/* Items Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Items</h3>
          <button
            onClick={addItem}
            className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-500"
          >
            Add Item
          </button>
        </div>

        {invoiceData.items.map((item, index) => (
          <div key={item.id} className="flex flex-wrap gap-2 mb-2 items-center">
            <div className="w-full sm:w-[48%] lg:w-2/5">
              <input
                type="text"
                placeholder="Item name"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(item.id, "name", e.target.value)
                }
                className="inputCommonClass"
              />
            </div>
            <div className="w-[48%] sm:w-[23%] lg:w-[10%]">
              <input
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(
                    item.id,
                    "quantity",
                    parseInt(e.target.value) || 0
                  )
                }
                className="inputCommonClass"
              />
            </div>
            <div className="w-[48%] sm:w-[23%] lg:w-[15%]">
              <input
                type="number"
                placeholder="Unit Price"
                value={item.unitPrice}
                onChange={(e) =>
                  handleItemChange(
                    item.id,
                    "unitPrice",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="inputCommonClass"
              />
            </div>
            <div className="w-[48%] sm:w-[23%] lg:w-[18%]">
              <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-center">
                {(item.quantity * item.unitPrice).toFixed(2)}
              </div>
            </div>
            <div className="w-[48%] sm:w-[23%] lg:w-[10%] text-right">
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-2xl px-3 py-2 text-center transition-all duration-500"
              >
                <IoMdClose />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tax and Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Tax Rate (%)</label>
          <input
            type="number"
            value={invoiceData.taxRate}
            onChange={(e) => handleTaxRateChange(e.target.value)}
            className="inputCommonClass"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            value={invoiceData.notes}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                payload: { field: "notes", value: e.target.value },
              })
            }
            rows="3"
            className="inputCommonClass"
          />
        </div>
      </div>
      <ImageUploads />
    </div>
  );
};

export default InvoiceForm;
