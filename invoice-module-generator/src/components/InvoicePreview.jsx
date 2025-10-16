import React from "react";
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2";
import Template3 from "../templates/Template3";
import Template4 from "../templates/Template4";

const InvoicePreview = ({ template, invoiceData }) => {
  const renderTemplate = () => {
    switch (template) {
      case "template1":
        return <Template1 invoiceData={invoiceData} />;
      case "template2":
        return <Template2 invoiceData={invoiceData} />;
      case "template3":
        return <Template3 invoiceData={invoiceData} />;
      case "template4":
        return <Template4 invoiceData={invoiceData} />;
      default:
        return <Template1 invoiceData={invoiceData} />;
    }
  };

  return (
    <div className="bg-white  shadow-lg overflow-hidden">
      <div className="">{renderTemplate()}</div>
    </div>
  );
};

export default InvoicePreview;
