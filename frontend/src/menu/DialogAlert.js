import React from 'react'
import { Button } from "@chakra-ui/react"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"

export default function DialogAlert({openButton,func,title,text,buttontext}) {
  return (
    <DialogRoot role="alertdialog">
    <DialogTrigger as={"div"} asChild>
      {openButton}
    </DialogTrigger>
    <DialogContent border="10px solid" borderColor="bg" rounded="xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <p>
        {text}
        </p>
      </DialogBody>
      <DialogFooter>
        <DialogActionTrigger asChild>
          <Button variant="outline">Vissza</Button>
        </DialogActionTrigger>
        <DialogActionTrigger as={"div"}>
            <Button colorPalette="red" onClick={func}>{buttontext}</Button>
        </DialogActionTrigger>
      </DialogFooter>
      <DialogCloseTrigger />
    </DialogContent>
  </DialogRoot>
  )
}
