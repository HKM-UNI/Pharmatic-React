import { createContext, useContext, useState } from "react";
import { FormDescription, Form as ShadcnForm } from "../ui/form";

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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";

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

export function FormComboBox({
  fieldname,
  label = "ComboBox",
  options = [],
  selectPlaceHolder = "Select value",
  searchPlaceHolder = "Search value",
  notFoundMessage = "Value not found",
  multipleValues = false,
  ...props
}) {
  const form = useContext(FormContext);
  const [open, setOpen] = useState(false);

  const selectedText = (selected) => {
    if (multipleValues) {
      if (selected.length >= 1)
        return selected.map((item) => item.label).join(", ");
      else return selectPlaceHolder;
    } else return options.find((opt) => opt.value === selected)?.label;
  };
  const setValue = (value) => {
    form.setValue(fieldname, value);
    setOpen(false);
  };
  const setValues = (values, selectedObj) => {
    if (values !== null) {
      if (values.find((v) => v.value === selectedObj.value)) {
        form.setValue(
          fieldname,
          values.filter((v) => v.value !== selectedObj.value),
        );
        return null;
      }
      form.setValue(fieldname, [...values, selectedObj]);
    } else form.setValue(fieldname, [selectedObj]);
  };

  const isSelectedIn = (values, checkValue) => {
    if (values !== null) {
      if (multipleValues) {
        return values.find((v) => v.value === checkValue);
      } else return values === checkValue;
    }
  };
  return (
    <FormField
      control={form.control}
      name={fieldname}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-end">
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="justify-between font-normal"
                aria-expanded={open}
              >
                {field.value ? selectedText(field.value) : selectPlaceHolder}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder={searchPlaceHolder} />
                <CommandList>
                  <CommandEmpty>{notFoundMessage}</CommandEmpty>
                  <CommandGroup>
                    {options.map((opt, idx) => (
                      <CommandItem
                        key={idx}
                        value={opt.value}
                        onSelect={() => {
                          multipleValues
                            ? setValues(field.value, opt)
                            : setValue(opt.value);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            isSelectedIn(field.value, opt.value)
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {opt.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
