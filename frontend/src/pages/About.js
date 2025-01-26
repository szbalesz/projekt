import React from 'react'
import { AbsoluteCenter, Flex, HStack } from "@chakra-ui/react"
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../components/ui/accordion"
import { Avatar } from "../components/ui/avatar"

export default function About() {
    return (
        <Flex mx={"auto"} width={"650px"}> 
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
      name: "Bálint",
      bio: "asdasd",
      image: "https://i.pravatar.cc/150?u=a",
    },
    {
      name: "Tamás",
      bio: "asdasd",
      image: "https://i.pravatar.cc/150?u=b",
    },
    {
      name: "Tamás",
      bio: "asdasdasd",
      image: "https://i.pravatar.cc/150?u=c",
    },
  ]