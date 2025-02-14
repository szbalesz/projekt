import React from 'react'
import { Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu"
import { LuList } from 'react-icons/lu'

export default function AddToPlaylistMenu() {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
      <Button p={1} m={1} variant="solid"><LuList/></Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="new-txt">New Text File</MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}
