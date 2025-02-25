import React, { useState } from 'react'
import { Button, Flex, Image, MenuItem, Text, Theme } from "@chakra-ui/react"
import {
    DialogActionTrigger,
    DialogBackdrop,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "@chakra-ui/react"
import { toaster } from '../components/ui/toaster'
import api from '../Api'
import Cookies from "js-cookie";
import { LuPen } from 'react-icons/lu'

export default function EditPlaylistWindow({ userid, getPlaylists}) {
    const token = Cookies.get("token");
    const themecolor = localStorage.getItem("themecolor");
    const [playlistName, setPlaylistName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [open, setOpen] = useState(false)
    const prevImg = "https://t3.ftcdn.net/jpg/04/62/60/80/360_F_462608080_J2AJrf8h0fmbFqnTVUQfza8JivYOfShz.jpg";
    return (
        // Új lejátszási lista ablak
        <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement={"center"}>
            <DialogTrigger mx={"auto"} asChild>
            <MenuItem value="szerkeszt"><LuPen/>Adatok szerkesztése</MenuItem>
            </DialogTrigger>
            <DialogBackdrop onClick={()=>setOpen(false)}/>
            <DialogContent>
            <Theme colorPalette={themecolor} display={"flex"} flexDirection={"column"} bg={"Background"} h={"100%"}>
                <DialogHeader>
                    <DialogTitle>Adatok szerkesztése</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form>
                        <Flex direction={"row"} pb={"3"}>
                            <Button borderRadius="lg" variant="ghost" height="150px" width="150px" backgroundPosition="center" backgroundImage={"url("+(imageUrl.length < 10 ? prevImg : imageUrl)+")"} backgroundSize="cover" boxShadow={`0 0 15px 0 ${themecolor}`}/>
                            <Flex width={"full"} direction={"column"} p={"5"}>
                                <Input required value={playlistName} onChange={(e)=> setPlaylistName(e.target.value)} placeholder="Írd be az új nevet" />
                                <Input required value={imageUrl} onChange={(e)=> setImageUrl(e.target.value)} my={"5"} placeholder="Új kép elérési útja" />
                            </Flex>
                        </Flex>
                        <Flex justifyContent={"right"}>
                            <Button type='submit'>Mentés</Button>
                        </Flex>
                    </form>
                </DialogBody>
                <DialogCloseTrigger onClick={()=>setOpen(false)} />
                </Theme>
            </DialogContent>
        </DialogRoot>
    )
}
