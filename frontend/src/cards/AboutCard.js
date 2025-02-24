import React from 'react'
import { Box, Button, Card } from "@chakra-ui/react"
import { LuInstagram } from 'react-icons/lu'


export default function AboutCard({item}) {
  return (
    <Card.Root m={"5"} maxW="sm" textAlign={"center"} justifyContent={"center"} overflow="hidden">
      <Box
      backgroundPosition={"center"}
      backgroundSize={"cover"}
      height={"250px"}
      width={"250px"}
      backgroundImage={`url(${item.image})`}
      />
      <Card.Body gap="2">
        <Card.Title>{item.name}</Card.Title>
        <Card.Description>
          {item.bio}
        </Card.Description>
      </Card.Body>
      <Card.Footer display={"flex"} mx={"auto"} gap="2">
        <Button variant="solid"><LuInstagram/></Button>
      </Card.Footer>
    </Card.Root>
  )
}
