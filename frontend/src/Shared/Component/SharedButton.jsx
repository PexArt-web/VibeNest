import { Button } from "@/components/ui/button"
import {motion} from "framer-motion"
const SharedButton = ({type, label, className, whileTap, disabled}) => {
  return (
    <>
      <motion.Button type ={type} className={className} whileTap={whileTap} disabled={disabled}>
        {label}
      </motion.Button>
    </>
  )
}

export default SharedButton
