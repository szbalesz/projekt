import React from 'react'
import { Center } from "@chakra-ui/react"
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../components/ui/accordion"
import { Avatar } from "../components/ui/avatar"
import AboutCard from '../AboutCard'

export default function About() {
    return (
        <Center display={"flex"} flexWrap={"wrap"}>
          {items.map((item,index)=> <AboutCard item={item}/>)}
        </Center>
      )
}
const items = [
    {
      name: "Száraz Bálint Csaba",
      bio: "Frontend <-> Backend kapcsolat",
      image: "https://yt3.googleusercontent.com/xzvwuor2VIDCJU0MrRcEhYk12Tat4mFafmLWPdmC3AXCp3FS_0ne5WdDzEKP8MTQ9wr4hUBsew=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      name: "Csehi Tamás",
      bio: "Fronted UI + Dokumentáció",
      image: "https://i.pravatar.cc/150?u=b",
    },
    {
      name: "Fehér Tamás",
      bio: "Backend + Adatbázis",
      image: "https://i.ytimg.com/vi/QDHjHO7jdqg/maxresdefault.jpg",
    },
  ]