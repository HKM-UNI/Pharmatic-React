import { FormFileInput } from "@/components/custom_form/form";
import { useEffect, useState } from "react";

/** @param {{ defaultSrc: string }} */
export default function UserFormImage({ defaultSrc }) {
  const [previewSrc, setPreviewSrc] = useState(defaultSrc);

  useEffect(() => {
    if (defaultSrc) {
      setPreviewSrc(defaultSrc);
    }
  }, [defaultSrc]);

  // Esta funcion permite leer los datos del archivo
  //  para asi mostrarla en la previsualizacion.
  const handleSelectedFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-center rounded-xl border-2 shadow">
        <img src={previewSrc} className="h-60 w-60" alt="Medicamento" />
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
