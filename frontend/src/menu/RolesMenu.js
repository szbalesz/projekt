
import { Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu"
import { useState } from "react"
import { useEffect } from "react";
import { addRoleToUser, removeRoleFromUser } from "../services/AdminService";
import { toaster } from "../components/ui/toaster";
import { getUserId } from "../services/UserService";

export default function RolesMenu({user,load}){
  const theme = localStorage.getItem("themecolor");
  const userid = getUserId();
  const role = user?.roles[0]? user?.roles[0] : "Alap";
  const [value, setValue] = useState(role);
  // Rang változtatása függvény
  const changeRole = async () => {
    if(value !== role){
      if(user?.roles[0]){
        await removeRoleFromUser(user,user?.roles[0],toaster,load);
      }
      await addRoleToUser(user,value,toaster,load,"change");
    }
  }

  useEffect(() => {
    changeRole();
    load();
  }, [value])

  return (
    <MenuRoot>
      <MenuTrigger asChild>
      <Button disabled={user?.id === userid} size={"xs"} colorPalette={
        value === "Admin"? "red"  : "current"
      }>
            {role}
        </Button>
      </MenuTrigger>
      <MenuContent minW="10rem">
        <MenuRadioItemGroup
          value={value}
          onValueChange={(e) => setValue(e.value)}>
          <MenuRadioItem color="red" value="Admin">Admin</MenuRadioItem>
          <MenuRadioItem color={theme} value="Prémium">Prémium</MenuRadioItem>
          <MenuRadioItem value="Alap">Alap</MenuRadioItem>
        </MenuRadioItemGroup>
      </MenuContent>
    </MenuRoot>
  )
}
