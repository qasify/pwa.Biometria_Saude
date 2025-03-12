export interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}
