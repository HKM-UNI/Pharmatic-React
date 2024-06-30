import { FormFileInput } from "@/components/custom_form/form";
import { useState } from "react";

/** @param {{defaultSrc: string}} */
export default function ProductFormImage({ defaultSrc }) {
  const [previewSrc, setPreviewSrc] = useState(defaultSrc);

  const handleSelectedFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <div className="rounded-xl border-2 shadow">
        <img src={previewSrc} className="h-72" alt="Medicamento" />
      </div>
      <div className="flex flex-row items-center justify-between">
        <FormFileInput
          fieldname="imageFile"
          onFileChange={handleSelectedFile}
        />
      </div>
    </div>
  );
}
