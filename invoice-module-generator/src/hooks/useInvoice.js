import { useReducer } from "react";

const initialState = {
  template: "template1",
  invoiceData: {
    invoiceTitle: "Service Invoice",
    invoiceNumber: "INV-001",
    date: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
    from: {
      companyName: "Nuruddin Ltd",
      address: "Mohakhali, dhaka-1215",
      email: "mdnuruddinosman@gamil.com",
      phone: "+8801641657427",
    },
    to: {
      clientName: "Betopia Groupe",
      address: "Banasree, Dhaka-1219",
      email: "betopia@example.com",
      phone: "+0987654321",
    },
    items: [
      {
        id: 1,
        name: "Web Development",
        quantity: 1,
        unitPrice: 1000,
      },
    ],
    subtotal: 1000,
    taxRate: 10,
    taxAmount: 100,
    totalAmount: 1100,
    notes: "Thank you for your business!",
    signature: null,
  },
};

function invoiceReducer(state, action) {
  switch (action.type) {
    case "SET_TEMPLATE":
      return { ...state, template: action.payload };

    case "UPDATE_FIELD":
      return {
        ...state,
        invoiceData: {
          ...state.invoiceData,
          [action.payload.field]: action.payload.value,
        },
      };

    case "UPDATE_FROM_FIELD":
      return {
        ...state,
        invoiceData: {
          ...state.invoiceData,
          from: {
            ...state.invoiceData.from,
            [action.payload.field]: action.payload.value,
          },
        },
      };

    case "UPDATE_TO_FIELD":
      return {
        ...state,
        invoiceData: {
          ...state.invoiceData,
          to: {
            ...state.invoiceData.to,
            [action.payload.field]: action.payload.value,
          },
        },
      };

    case "ADD_ITEM":
      const newItem = {
        id: Date.now(),
        name: "",
        quantity: 1,
        unitPrice: 0,
        total: 0,
      };
      return {
        ...state,
        invoiceData: {
          ...state.invoiceData,
          items: [...state.invoiceData.items, newItem],
        },
      };

    case "UPDATE_ITEM":
      const updatedItems = state.invoiceData.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, [action.payload.field]: action.payload.value }
          : item
      );

      // Recalculate totals

      const subtotal = updatedItems.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      );

      const taxAmount = subtotal * (state.invoiceData.taxRate / 100);
      const totalAmount = subtotal + taxAmount;

      return {
        ...state,
        invoiceData: {
          ...state.invoiceData,
          items: updatedItems,
          subtotal,
          taxAmount,
          totalAmount,
        },
      };

    case "REMOVE_ITEM":
      const filteredItems = state.invoiceData.items.filter(
        (item) => item.id !== action.payload
      );
      const newSubtotal = filteredItems.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      );
      const newTaxAmount = newSubtotal * (state.invoiceData.taxRate / 100);
      const newTotalAmount = newSubtotal + newTaxAmount;

      return {
        ...state,
        invoiceData: {
          ...state.invoiceData,
          items: filteredItems,
          subtotal: newSubtotal,
          taxAmount: newTaxAmount,
          totalAmount: newTotalAmount,
        },
      };

    case "UPDATE_TAX_RATE":
      const taxRate = action.payload;
      console.log(action.payload);

      const tax = state.invoiceData.subtotal * (taxRate / 100);

      return {
        ...state,
        invoiceData: {
          ...state.invoiceData,
          taxRate,
          taxAmount: tax,
          totalAmount: state.invoiceData.subtotal + tax,
        },
      };

    default:
      return state;
  }
}

export function useInvoice() {
  const [state, dispatch] = useReducer(invoiceReducer, initialState);

  return {
    state,
    dispatch,
  };
}
