import React, { useState } from 'react'
import { Button, Center, MenuItem, Stack, Text, Theme } from "@chakra-ui/react"
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
import BigMusicCard from '../cards/BigMusicCard'
import { Field } from '../components/ui/field'

export default function EditMusicWindow({ userid, getPlaylists}) {
    const token = Cookies.get("token");
    const themecolor = localStorage.getItem("themecolor");
    const [playlistName, setPlaylistName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [open, setOpen] = useState(false)
    const prevImg = "https://t3.ftcdn.net/jpg/04/62/60/80/360_F_462608080_J2AJrf8h0fmbFqnTVUQfza8JivYOfShz.jpg";
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [imageurl, setImageurl] = useState("");
    const [musicfile, setMusicfile] = useState(null);

    return (
        // Új lejátszási lista ablak
        <DialogRoot size={"xl"} lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement={"center"}>
            <DialogTrigger mx={"auto"} asChild>
            <MenuItem value="szerkeszt"><LuPen/>Adatok szerkesztése</MenuItem>
            </DialogTrigger>
            <DialogBackdrop onClick={()=>setOpen(false)}/>
            <DialogContent>
            <Theme colorPalette={themecolor} display={"flex"} flexDirection={"column"} bg={"Background"} h={"100%"}>
                <DialogHeader>
                    <DialogTitle>Adatok szerkesztése</DialogTitle>
                </DialogHeader>
                <DialogBody display={"flex"} flexDirection={{base: "column", md:"row"}}>
                    <Stack p="5" w={{base: "", md:"md"}} gap="4">
                    <form>
                            <Field py="1" label="Zene cím" required helperText="Add meg a zene címét.">
                                <Input value={title} onChange={(q) => setTitle(q.target.value)} placeholder="Walkin' a street"/>
                            </Field>
                            <Field py="2" label="Zene előadó" required helperText="Add meg a zene előadóját.">
                                <Input value={artist} onChange={(q) => setArtist(q.target.value)} placeholder="Desh"/>
                            </Field>
                            <Field py="1" label="Zene borítókép url" required helperText="Add meg a zene borítójának az urljét.">
                                <Input value={imageurl} onChange={(q) => setImageurl(q.target.value)} placeholder="https://image.jpg"/>
                            </Field>
                            {token? <Button mt={"5"} type="submit">Mentés</Button> : <>
                            <Button mt={"5"} disabled>Mentés</Button>
                            <Text color={"colorPalette.300"}>Jelentkezz be a funkció használatához!</Text>
                            </>}
                            </form>
                        </Stack>
                    <Center paddingLeft={{base: "0", md : "75px"}} w={{base: "100%", md:"350px"}} h="400px">
                        <BigMusicCard music={{
                            title: title !== ""? title : "Cím",
                            artist: artist !== ""? artist : "Előadó",
                            imageUrl: imageurl
                        }}/>
                        </Center>
                </DialogBody>
                <DialogCloseTrigger onClick={()=>setOpen(false)} />
                </Theme>
            </DialogContent>
        </DialogRoot>
    )
}
