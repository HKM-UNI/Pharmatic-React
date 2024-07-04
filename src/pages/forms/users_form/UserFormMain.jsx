import { FormInput } from "@/components/custom_form";
import UserFormImage from "./UserFormImage";

/** @param {{ edit: boolean, defaultImgSrc: string }} */
export default function UserFormMain({ edit = false, defaultImgSrc }) {
  return (
    <div className="flex items-start justify-center gap-10 pb-5 pt-5 2xl:pt-16">
      <div className="w-80 space-y-4 md:w-2/5 2xl:w-1/4">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 2xl:grid-cols-1">
          <FormInput
            fieldname="username"
            label="Nombre de Usuario (*)"
            placeholder="Usuario"
          />

          {edit ? null : (
            <FormInput
              type="password"
              fieldname="password"
              label="Contraseña (*)"
              placeholder="********"
            />
          )}

          <FormInput
            fieldname="pharmacistCode"
            label="Código Farmacéutico (*)"
            placeholder="PH-3456"
          />

          <FormInput
            type="number"
            fieldname="phone"
            label="Número de Teléfono"
            placeholder="86574394"
          />
        </div>

        <FormInput
          type="email"
          fieldname="email"
          label="Correo Electrónico"
          placeholder="usuario@mail.com"
        />
      </div>

      <UserFormImage defaultSrc={defaultImgSrc} />
    </div>
  );
}
