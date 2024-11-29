import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';

export async function handleFileChange<T extends FieldValues>(
  e: React.ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<T>,
  fieldName: Path<T>,
  setImagePreview?: (value: string) => void
) {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (setImagePreview) {
        setImagePreview(base64String);
      }
      setValue(fieldName, base64String as PathValue<T, Path<T>>);
    };
    reader.readAsDataURL(file);
  }
}
