import React, { useEffect, useState } from 'react'
import { Center } from "@chakra-ui/react"
import { Tabs } from "@chakra-ui/react"
import { LuBookHeadphones, LuMusic, LuUser } from "react-icons/lu"
import AdminUsers from '../menu/AdminUsers'
import AdminMusics from '../menu/AdminMusics'
import AdminPlayList from '../menu/AdminPlayLists'
import { useNavigate } from 'react-router-dom';
import { getUserId, getUserRoles } from '../services/UserService'

export default function Admin() {
  const navigate = useNavigate();
  const userid = getUserId();
  const [selectedmenu, setSelectedMenu] = useState("adminusers")
  useEffect(() => {
    const getroles = async () => {
      let roles = await getUserRoles(userid);
      if (!roles.includes("Admin")) { 
        navigate("/");
      }
    };
    getroles();
  }, [])
  
    return (
      // Admin oldal
        <Center pt={"5"} mx={"auto"} maxW={"5xl"}>
    <Tabs.Root w={"5xl"} defaultValue={selectedmenu} variant="plain" >
      <Tabs.List flexDir={{base: "column", md: "row"}} textAlign={"center"} w={"100%"} justifyContent={"center"} rounded="l3" p="1">
        <Tabs.Trigger mx={"auto"} onClick={()=> setSelectedMenu("adminusers")} value="adminusers">
          <LuUser />
          Összes felhasználó
        </Tabs.Trigger>
        <Tabs.Trigger mx={"auto"} onClick={()=> setSelectedMenu("adminmusics")} value="adminmusics">
          <LuMusic />
          Összes zene
        </Tabs.Trigger>
        <Tabs.Trigger mx={"auto"} onClick={()=> setSelectedMenu("adminplaylists")} value="adminplaylists">
          <LuBookHeadphones />
          Összes lejátszási lista
        </Tabs.Trigger>
        <Tabs.Indicator rounded="l2" />
      </Tabs.List>
      <Tabs.Content value="adminusers">
        <AdminUsers selectedmenu={selectedmenu}/>
      </Tabs.Content>
      <Tabs.Content value="adminmusics">
        <AdminMusics selectedmenu={selectedmenu}/>
    </Tabs.Content>
      <Tabs.Content value="adminplaylists">
        <AdminPlayList selectedmenu={selectedmenu}/>
      </Tabs.Content>
    </Tabs.Root>
        </Center>
      )
}