import React from "react";

const templates = [
  {
    id: "template1",
    name: "Classic Blue",
    colors: ["#F5EFE6", "#E8DFCA", "#6D94C5", "#CBDCEB"],
    preview: "bg-[#F5EFE6] border-2 border-[#6D94C5]",
  },
  {
    id: "template2",
    name: "Dark Elegant",
    colors: ["#19183B", "#708993", "#A1C2BD", "#E7F2EF"],
    preview: "bg-[#19183B] border-2 border-[#A1C2BD]",
  },
  {
    id: "template3",
    name: "Warm Orange",
    colors: ["#F9F5F0", "#F2EAD3", "#F4991A", "#344F1F"],
    preview: "bg-[#F9F5F0] border-2 border-[#F4991A]",
  },
  {
    id: "template4",
    name: "Vibrant Mix",
    colors: ["#EF7722", "#FAA533", "#2d2d2d", "#0BA6DF"],
    preview: "bg-[#EBEBEB] border-2 border-[#0BA6DF]",
  },
];

const TemplateSelector = ({ selectedTemplate, onTemplateSelect }) => {
  return (
    <div className="mb-6 bg-[#DEDED1] p-6 rounded-md">
      <h2 className="text-xl font-bold mb-4">Choose a Template</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`cursor-pointer rounded-lg p-1.5 md:p-3 transition-all duration-300 ${
              selectedTemplate === template.id
                ? "ring-2 ring-blue-500 ring-offset-1 transform scale-105"
                : "hover:shadow-lg"
            }`}
            onClick={() => onTemplateSelect(template.id)}
          >
            <div
              className={`md:h-32 p-2 rounded-md ${template.preview} flex items-center justify-center`}
            >
              <span
                className="font-semibold text-center"
                style={{
                  color: template.colors[2],
                }}
              >
                {template.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
