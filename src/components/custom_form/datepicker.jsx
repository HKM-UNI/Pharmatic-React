"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { FormContext } from "./form";

export function DatePicker({
  fieldname,
  label = "Fecha",
  fromYear = 1950,
  toYear = 2024,
  defaultMonth = null,
  minDate = new Date("1950-01-01"),
}) {
  const form = useContext(FormContext);

  return (
    <FormField
      control={form.control}
      name={fieldname}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn("w-full pl-3 text-left font-normal")}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Elija una fecha</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                fromYear={fromYear}
                toYear={toYear}
                defaultMonth={defaultMonth}
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < minDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
