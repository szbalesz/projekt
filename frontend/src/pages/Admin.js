import React from 'react'
import { Center } from "@chakra-ui/react"
import { Tabs } from "@chakra-ui/react"
import { LuBookHeadphones, LuFolder, LuMic, LuMusic, LuSquareCheck, LuUser } from "react-icons/lu"
import AdminUsers from '../menu/AdminUsers'
export default function Admin() {
    return (
      // Admin oldal
        <Center pt={"5"} mx={"auto"} maxW={"5xl"}>
            <Tabs.Root w={"5xl"} defaultValue="members" variant="plain" >
      <Tabs.List w={"100%"} justifyContent={"center"} rounded="l3" p="1">
        <Tabs.Trigger value="members">
          <LuUser />
          Összes felhasználó
        </Tabs.Trigger>
        <Tabs.Trigger value="projects">
          <LuMusic />
          Összes zene
        </Tabs.Trigger>
        <Tabs.Trigger value="tasks">
          <LuBookHeadphones />
          Összes lejátszási lista
        </Tabs.Trigger>
        <Tabs.Indicator rounded="l2" />
      </Tabs.List>
      <Tabs.Content value="members">
        <AdminUsers/>
      </Tabs.Content>
      <Tabs.Content value="projects">Manage your projects</Tabs.Content>
      <Tabs.Content value="tasks">
      </Tabs.Content>
    </Tabs.Root>
        </Center>
      )
}