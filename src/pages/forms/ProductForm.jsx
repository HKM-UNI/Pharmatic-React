import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DynamicPanel from "@/shared/DynamicPanel";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronsUpDown } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const formSchema = yup
  .object({
    catalogNo: yup.number().required("El nombre es requerido"),
    categoryNo: yup.number(),
    subcategoryNo: yup.number(),
    providerNo: yup.number(),
    contentSize: yup.number().integer().moreThan(0),
    discount: yup.number().positive().min(0).max(100),
    consign: yup.bool(),
    purchasePrice: yup.number().positive(),
    sellingPrice: yup.number().positive(),
    tags: yup.string(),
  })
  .required();

const productDefaults = {
  catalogNo: null,
  categoryNo: null,
  subcategoryNo: null,
  providerNo: null,
  contentSize: null,
  discount: null,
  consign: false,
  purchasePrice: null,
  sellingPrice: null,
  tags: "",
};

export default function ProductForm() {
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: productDefaults,
  });

  function onSubmit(values) {
    console.log(values);
  }

  return <></>;
}
