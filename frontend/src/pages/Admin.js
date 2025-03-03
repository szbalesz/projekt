import React from 'react'
import { Center } from "@chakra-ui/react"
import { Tabs } from "@chakra-ui/react"
import { LuBookHeadphones, LuFolder, LuMic, LuMusic, LuSquareCheck, LuUser } from "react-icons/lu"
import AdminUsers from '../menu/AdminUsers'
import AdminMusics from '../menu/AdminMusics'
import AdminPlayList from '../menu/AdminPlayLists'
export default function Admin() {
    return (
      // Admin oldal
        <Center pt={"5"} mx={"auto"} maxW={"5xl"}>
            <Tabs.Root w={"5xl"} defaultValue="adminusers" variant="plain" >
      <Tabs.List w={"100%"} justifyContent={"center"} rounded="l3" p="1">
        <Tabs.Trigger value="adminusers">
          <LuUser />
          Összes felhasználó
        </Tabs.Trigger>
        <Tabs.Trigger value="adminmusics">
          <LuMusic />
          Összes zene
        </Tabs.Trigger>
        <Tabs.Trigger value="adminplaylists">
          <LuBookHeadphones />
          Összes lejátszási lista
        </Tabs.Trigger>
        <Tabs.Indicator rounded="l2" />
      </Tabs.List>
      <Tabs.Content value="adminusers">
        <AdminUsers/>
      </Tabs.Content>
      <Tabs.Content value="adminmusics">
        <AdminMusics/>
    </Tabs.Content>
      <Tabs.Content value="adminplaylists">
        <AdminPlayList/>
      </Tabs.Content>
    </Tabs.Root>
        </Center>
      )
}