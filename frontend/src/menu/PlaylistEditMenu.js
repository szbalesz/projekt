import React from 'react'
import { Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu"
import { LuCircleX, LuEllipsis, LuPen, LuUserRoundPlus } from 'react-icons/lu'

export default function PlaylistEditMenu() {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
      <Button size={"s"} variant={"ghost"}>
                <LuEllipsis/>
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="hozzaad"><LuUserRoundPlus/> Hozzáadás a saját listáimhoz</MenuItem>
        <MenuItem value="szerkeszt"><LuPen/>Adatok szerkesztése</MenuItem>
        <MenuItem value="torles"><LuCircleX/>Törlés</MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}
