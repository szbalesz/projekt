import React from 'react'
import { Flex, HStack } from "@chakra-ui/react"
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../components/ui/accordion"
import { Avatar } from "../components/ui/avatar"

export default function About() {
    return (
        <Flex mx={"auto"} maxWidth={"650px"}> 
            <AccordionRoot collapsible defaultValue={["b"]}>
          {items.map((item, index) => (
            <AccordionItem key={index} value={item.name}>
              <AccordionItemTrigger>
                <Avatar shape="rounded" src={item.image} name={item.name} />
                <HStack>
                  {item.name}{" "}
                </HStack>
              </AccordionItemTrigger>
              <AccordionItemContent>{item.bio}</AccordionItemContent>
            </AccordionItem>
          ))}
        </AccordionRoot>
        </Flex>
      )
}
const items = [
    {
      name: "Száraz Bálint Csaba",
      bio: "asdasd",
      image: "https://yt3.googleusercontent.com/xzvwuor2VIDCJU0MrRcEhYk12Tat4mFafmLWPdmC3AXCp3FS_0ne5WdDzEKP8MTQ9wr4hUBsew=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      name: "Csehi Tamás",
      bio: "asdasd",
      image: "https://i.pravatar.cc/150?u=b",
    },
    {
      name: "Fehér Tamás",
      bio: "asdasdasd",
      image: "https://i.ytimg.com/vi/QDHjHO7jdqg/maxresdefault.jpg",
    },
  ]