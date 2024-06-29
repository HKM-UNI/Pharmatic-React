import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { FormContext } from "./form";

/** @typedef {{label: string, value: number}} ComboBoxOption */

/**
 * Updates the customers list via API
 * @callback ComboBoxMapFn
 * @param {object} item
 * @returns {ComboBoxOption}
 */

/**
 * @typedef Props
 * @property {string} fieldname
 * @property {string} endpoint
 * @property {string} label
 * @property {ComboBoxMapFn} optionMapper
 * @property {string} selectPlaceHolder
 * @property {string} searchPlaceHolder
 * @property {string} notFoundMessage
 * @property {boolean} multipleValues
 */

/** @type {ComboBoxOption[]} */
const initialOptionsState = [];

/** @param {Props} */
export function LazyFormComboBox({
  fieldname,
  endpoint,
  optionMapper,
  label = "ComboBox",
  selectPlaceHolder = "Select value",
  searchPlaceHolder = "Search value",
  notFoundMessage = "Value not found",
  multipleValues = false,
}) {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useSWR(open && endpoint);
  const [options, setOptions] = useState(initialOptionsState);
  const form = useContext(FormContext);

  useEffect(() => {
    if (data) {
      setOptions(data.map((d) => optionMapper(d)));
    }
  }, [data]);

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

  const emptyContent = isLoading ? (
    <div className="flex justify-center">
      <Loader2 className="animate-spin" />
    </div>
  ) : (
    notFoundMessage
  );

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
                  <CommandEmpty>{emptyContent}</CommandEmpty>
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
