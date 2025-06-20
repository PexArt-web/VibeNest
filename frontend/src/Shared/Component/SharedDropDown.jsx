import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { color } from "framer-motion";
const SharedDropDown = ({ parentLabel, dropDownLabel, handleDelete , dropDownIcon}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={"text-black hover:bg-gray-100 hover:text-black bg-gray-700"} >
          {parentLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleDelete} className="text-red-500 hover:bg-red-100">
            {dropDownLabel}
            <DropdownMenuShortcut >{dropDownIcon}</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SharedDropDown;
