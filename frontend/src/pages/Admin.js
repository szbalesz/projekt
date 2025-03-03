import React, { useEffect } from 'react'
import { Center } from "@chakra-ui/react"
import { Tabs } from "@chakra-ui/react"
import { LuBookHeadphones, LuMusic, LuUser } from "react-icons/lu"
import AdminUsers from '../menu/AdminUsers'
import AdminMusics from '../menu/AdminMusics'
import AdminPlayList from '../menu/AdminPlayLists'
import { useNavigate } from 'react-router-dom';
import { getUserRoles } from '../services/UserService'
import Cookies from "js-cookie";

export default function Admin() {
  const navigate = useNavigate();
  const userid = Cookies.get("userid");
  useEffect(() => {
    const getroles = async () => {
      let roles = await getUserRoles(userid);
      console.log(roles);
      // Addig csak kikommentelve érhető el mert még a role hozzáadás nem működik
      // if (!roles.includes("Admin")) { 
      //   navigate("/");
      // }
    };
    getroles();
  }, [])
  
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