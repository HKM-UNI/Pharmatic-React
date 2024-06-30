import { createContext, useContext } from "react";
import { Form as ShadcnForm } from "../ui/form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export const FormContext = createContext(null);

export function Form({
  form,
  onValidSubmit,
  className = "",
  children,
  ...props
}) {
  return (
    <ShadcnForm {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className={className}
        {...props}
      >
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      </form>
    </ShadcnForm>
  );
}

export function FormInput({
  fieldname,
  type = "text",
  label = "Campo",
  placeholder = "Valor",
  ...props
}) {
  const form = useContext(FormContext);
  return (
    <FormField
      control={form.control}
      name={fieldname}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...props}
              {...field}
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function FormSelect({
  fieldname,
  label = "Select",
  placeholder = "Seleccione una opción",
  options = [{ label: "", value: "" }],
  ...props
}) {
  const form = useContext(FormContext);

  return (
    <FormField
      control={form.control}
      name={fieldname}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value || ""}
            {...props}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((opt, idx) => (
                <SelectItem key={idx} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

/**
 *  @callback FileChangedCallback
 * @param {File} file
 * @returns {void}
 */

/* "FormFileInput" No existe en los componentes de ShadCn
   Solamente es un input personalizado de tipo "file"
   Aunque tiene hardcodeado el filtro de imagenes en "accept".

  Si se necesita manejar una previsualizacion, hay un ejemplo en "ProductFormImage".
*/

/** @param {{fieldname: string, onFileChange: FileChangedCallback}} */
export function FormFileInput({ fieldname, onFileChange = () => {} }) {
  const form = useContext(FormContext);
  return (
    <FormField
      control={form.control}
      name={fieldname}
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem>
          <FormControl>
            <Input
              {...fieldProps}
              type="file"
              accept="image/*"
              onChange={(event) => {
                const selectedFile =
                  event.target.files && event.target.files[0];
                if (selectedFile) {
                  onFileChange(selectedFile);
                }
                return onChange(selectedFile);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

/** @param {{fieldname: string}} */
export function FormSwitch({ fieldname, ...props }) {
  const form = useContext(FormContext);
  return (
    <FormField
      control={form.control}
      name={fieldname}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              {...props}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
