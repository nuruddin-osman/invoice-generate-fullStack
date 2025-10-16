import React from "react";
import { useInvoice } from "./hooks/useInvoice";
import TemplateSelector from "./components/TemplateSelector";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";
import ExportButton from "./components/ExportButton";

const App = () => {
  const { state, dispatch } = useInvoice();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
            Invoice Generator
          </h1>
          <p className="text-gray-600 text-xs md:text-base">
            Create professional invoices in minutes
          </p>
        </header>

        {/* Template Selection for desktop */}
        <div className="hidden md:block">
          <TemplateSelector
            selectedTemplate={state.template}
            onTemplateSelect={(template) =>
              dispatch({ type: "SET_TEMPLATE", payload: template })
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          {/* Left Column = Form */}
          <div>
            <InvoiceForm invoiceData={state.invoiceData} dispatch={dispatch} />
          </div>
          {/* Template Selection for mobile */}
          <div className="md:hidden">
            <TemplateSelector
              selectedTemplate={state.template}
              onTemplateSelect={(template) =>
                dispatch({ type: "SET_TEMPLATE", payload: template })
              }
            />
          </div>

          {/* Right Column = Preview */}
          <div className="sticky top-4">
            <div className="p-4 bg-[#D1D3D4] border-b">
              <h3 className="font-semibold text-2xl">Live Preview</h3>
            </div>
            <div id="invoice-preview">
              <InvoicePreview
                template={state.template}
                invoiceData={state.invoiceData}
              />
            </div>
            {/* Export Button */}
            <div className="mt-6 text-right">
              <ExportButton
                template={state.template}
                invoiceData={state.invoiceData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
