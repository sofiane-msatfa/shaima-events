import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useAddress } from "@/api/adresse-gouv";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { FormAutocomplete, type FormAutocompleteProps } from "./form-autocomplete";
import type { Feature } from "@common/dto/adresse-gouv-response";

interface FormAddressProps
  extends Omit<
    FormAutocompleteProps<Feature, false, false, false>,
    | "loading"
    | "onInputChange"
    | "getOptionLabel"
    | "options"
    | "filterOptions"
    | "isOptionEqualToValue"
    | "renderInput"
  > {}

export function FormAddress(props: FormAddressProps) {
  const [address, setAddress] = useState("");
  const { getValues } = useFormContext();

  const getDefaultOptions = (): Feature[] => {
    const currentAddress = getValues(props.name) as Feature | undefined;
    return currentAddress ? [currentAddress] : [];
  };

  const debounceAddress = useDebounceValue(address);
  const { data: features, isLoading } = useAddress(debounceAddress);
  const options = features || getDefaultOptions();

  return (
    <FormAutocomplete
      clearOnBlur
      selectOnFocus
      loading={isLoading}
      onInputChange={(_event, value) => setAddress(value)}
      getOptionLabel={(option) => {
        return typeof option === "string" ? option : option.properties.label;
      }}
      options={options}
      filterOptions={(x) => x}
      isOptionEqualToValue={(option, value) => option.properties.label === value.properties.label}
      {...props}
    />
  );
}
