
import { Badge, Button, Table } from "@chakra-ui/react"
import {
  MenuContent,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu"
import { useState } from "react"
import { HiSortAscending } from "react-icons/hi"

export default function RolesMenu({rolename}){
  const [value, setValue] = useState("asc");
  const theme = localStorage.getItem("themecolor");
  return (
    <MenuRoot>
      <MenuTrigger asChild>
      <Button size={"xs"} colorPalette={
        rolename === "Admin"? "red"  : "current"
      }>
            {rolename}
        </Button>
      </MenuTrigger>
      <MenuContent minW="10rem">
        <MenuRadioItemGroup
          value={value}
          onValueChange={(e) => setValue(e.value)}
        >
          <MenuRadioItem color="red" value="admin">Admin</MenuRadioItem>
          <MenuRadioItem color={theme} value="premium">Prémium</MenuRadioItem>
          <MenuRadioItem value="alap">Alap</MenuRadioItem>
        </MenuRadioItemGroup>
      </MenuContent>
    </MenuRoot>
  )
}
