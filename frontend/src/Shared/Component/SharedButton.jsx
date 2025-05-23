import { Button } from "@/components/ui/button"

const SharedButton = ({label, className}) => {
  return (
    <>
      <Button className={className}>
        {label}
      </Button>
    </>
  )
}

export default SharedButton
