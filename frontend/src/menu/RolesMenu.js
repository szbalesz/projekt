
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
import { useEffect } from "react";
import { addRoleToUser, removeRoleFromUser } from "../services/AdminService";
import { toaster } from "../components/ui/toaster";
import { getUserId } from "../services/UserService";

export default function RolesMenu({user,load}){
  const [value, setValue] = useState(user?.roles[0]);
  const theme = localStorage.getItem("themecolor");
  const userid = getUserId();
  const func = async () => {
    if(value !== user?.roles[0]){
      await removeRoleFromUser(user,user?.roles[0],toaster,load);
      await addRoleToUser(user,value,toaster,load);
    }
  }

  useEffect(() => {
    func();
    load();
  }, [value])

  return (
    <MenuRoot>
      <MenuTrigger asChild>
      <Button disabled={user?.id === userid} size={"xs"} colorPalette={
        value === "Admin"? "red"  : "current"
      }>
            {user?.roles[0]}
        </Button>
      </MenuTrigger>
      <MenuContent minW="10rem">
        <MenuRadioItemGroup
          value={value}
          onValueChange={(e) => setValue(e.value)}
        >
          <MenuRadioItem color="red" value="Admin">Admin</MenuRadioItem>
          <MenuRadioItem color={theme} value="Prémium">Prémium</MenuRadioItem>
          <MenuRadioItem value="Alap">Alap</MenuRadioItem>
        </MenuRadioItemGroup>
      </MenuContent>
    </MenuRoot>
  )
}
