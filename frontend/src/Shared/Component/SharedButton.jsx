import { Button } from "@/components/ui/button"
import {motion} from "framer-motion"
const SharedButton = ({type, label, className, whileTap, disabled,handleClick}) => {
  return (
    <>
      <motion.Button type ={type} className={className} whileTap={whileTap} disabled={disabled} onClick={handleClick}>
        {label}
      </motion.Button>
    </>
  )
}

export default SharedButton
