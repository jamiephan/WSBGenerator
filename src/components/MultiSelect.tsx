import {
  Alert,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import IFormFields from "../interfaces/IFormFields";
import type MultiSelectionOption from "../types/MultiSelectionOption";

export default function MultiSelect({
  name,
  title,
  description,
  alert,
  options = [],
  optionsDescription = [],
  control,
}: {
  name: keyof IFormFields;
  title: string;
  description?: string;
  alert?: string;
  options: MultiSelectionOption[];
  optionsDescription: string[];
  control: Control<IFormFields>;
}) {
  return (
    <Box sx={{ mb: 2 }}>
      <h4>{title}</h4>
      <Controller
        name={name}
        control={control}
        render={({ field: fields, fieldState: { error } }) => (
          <FormControl fullWidth>
            <InputLabel>{name}</InputLabel>
            <Select label={name} {...fields} error={!!error}>
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {description}
              <ul>
                {optionsDescription.map((description, i) => (
                  <li key={description}>
                    <b>
                      <i>{options[i]}</i>
                    </b>
                    : {description}
                  </li>
                ))}
              </ul>
              {alert && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  {alert}
                </Alert>
              )}
            </FormHelperText>
          </FormControl>
        )}
      />
    </Box>
  );
}
