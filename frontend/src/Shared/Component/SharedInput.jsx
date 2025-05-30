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
}) => {
  return (
    <div>
      <Input
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
