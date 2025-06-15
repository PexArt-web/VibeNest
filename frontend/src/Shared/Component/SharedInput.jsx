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
  accept,
  id
}) => {
  return (
    <div>
      <Input
        accept={accept}
        type={type}
        name={name}
        id={id}
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
