import {
  Alert,
  Box,
  FormControl,
  FormHelperText,
  InputBaseComponentProps,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import IFormFields from "../interfaces/IFormFields";

export default function MultiSelect({
  name,
  title,
  description,
  inputProps,
  alert,
  control,
}: {
  name: keyof IFormFields;
  title: string;
  description?: string;
  inputProps?: InputBaseComponentProps;
  alert?: string;
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
            <OutlinedInput
              label={name}
              {...fields}
              error={!!error}
              inputProps={inputProps}
            />
            <FormHelperText sx={{ mb: 2 }}>
              {description}
              {alert && (
                <Alert severity="warning" sx={{ mt: 2 }}>
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
