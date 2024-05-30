/* ----------------------------------------- DwSelect-------------------------------------- */
export interface ISelectLabels {
  label: string;
  value: string;
  defaultSelect?: boolean;
}

export interface IDwSelectProps {
  name: string;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
  selectLabels: ISelectLabels[];
}
/* ------------------------------- DwInput------------------------- */
export interface IDwInputProps {
  name: string;
  label: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiline?: false;
  [key: string]: unknown;
  isLoading?: boolean;
  autofocus?: boolean;
}

/* -----------------------------------------DwPasswordProps -------------------------------- */
export interface IDwPasswordProps {
  name: string;
  label: string;
  type?: string; // Type is optional because it will be controlled internally
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
  isLoading?: boolean;
  autofocus?: boolean;
}

export interface IEndAdornmentProps {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}
