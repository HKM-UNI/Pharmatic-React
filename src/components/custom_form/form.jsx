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

export const FormControlContext = createContext(null);

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
        <FormControlContext.Provider value={form.control}>
          {children}
        </FormControlContext.Provider>
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
  const control = useContext(FormControlContext);

  return (
    <FormField
      control={control}
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
  const control = useContext(FormControlContext);

  return (
    <FormField
      control={control}
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
