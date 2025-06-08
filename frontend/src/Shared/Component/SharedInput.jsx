import { Input } from "@/components/ui/input";

const SharedInput = ({
  type,
  name,
  placeholder,
  value,
  className,
  onChange,
  required,
  autoComplete,
  accept
}) => {
  return (
    <div>
      <Input
        accept={accept}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className={className}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default SharedInput;
