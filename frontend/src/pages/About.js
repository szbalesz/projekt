import React from 'react'
import { Center } from "@chakra-ui/react"
import AboutCard from '../cards/AboutCard'

export default function About() {
    return (
      // Rólunk oldal
        <Center display={"flex"} flexWrap={"wrap"}>
          {items.map((item,index)=> <AboutCard key={index} item={item}/>)} {/* Kártyák betöltése */}
        </Center>
      )
}
// Rólunk oldal kártyái
const items = [
    {
      name: "Csehi Tamás",
      bio: "Fronted UI + Dokumentáció",
      image: "https://i.ytimg.com/vi/nnyWGcffY1w/hqdefault.jpg",
    },
    {
      name: "Száraz Bálint Csaba",
      bio: "Frontend <-> Backend kapcsolat",
      image: "https://yt3.googleusercontent.com/xzvwuor2VIDCJU0MrRcEhYk12Tat4mFafmLWPdmC3AXCp3FS_0ne5WdDzEKP8MTQ9wr4hUBsew=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      name: "Fehér Tamás",
      bio: "Backend + Adatbázis",
      image: "https://archive.org/download/busakjozsefesacsaladszentsege/busakjozsefesacsaladszentsege.thumbs/Bus%C3%A1k%20J%C3%B3zsef%20%20%C3%A9s%20a%20csal%C3%A1d%20szents%C3%A9ge_000010.jpg",
    },
  ]