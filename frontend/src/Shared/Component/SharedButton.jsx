import { Button } from "@/components/ui/button"
import {motion} from "framer-motion"
const SharedButton = ({label, className, whileTap}) => {
  return (
    <>
      <motion.Button className={className} whileTap={whileTap}>
        {label}
      </motion.Button>
    </>
  )
}

export default SharedButton
