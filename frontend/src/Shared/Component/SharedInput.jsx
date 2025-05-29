import { Input } from "@/components/ui/input"

const SharedInput = ({type, placeholder, value, className}) => {
  return (
    <div>
      <Input type={type} placeholder={placeholder} value={value} className={className}/>
    </div>
  )
}

export default SharedInput
