import React, { useEffect, useState } from 'react'
import { Button, Center, MenuItem, Stack, Text, Theme } from "@chakra-ui/react"
import {
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
import Cookies from "js-cookie";
import BigMusicCard from '../cards/BigMusicCard'
import { Field } from '../components/ui/field'
import { editMusic } from '../services/MusicService'

export default function EditMusicWindow({openbutton,getData, music}) {
    const token = Cookies.get("token");
    const themecolor = localStorage.getItem("themecolor");
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState(music?.title);
    const [artist, setArtist] = useState(music?.artist);
    const [imageurl, setImageurl] = useState(music?.imageUrl);

    const handleEdit = async () => {
        const editm = await editMusic(music,artist,title,imageurl,toaster,setOpen,getData);
    }

    return (
        // Új lejátszási lista ablak
        <DialogRoot size={"xl"} lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement={"center"}>

            <DialogTrigger mx={"auto"} asChild>
                {openbutton}
            </DialogTrigger> 
            
            <DialogBackdrop onClick={()=>setOpen(false)}/>
            <DialogContent>
            <Theme colorPalette={themecolor} display={"flex"} flexDirection={"column"} bg={"Background"} h={"100%"}>
                <DialogHeader>
                    <DialogTitle>Adatok szerkesztése</DialogTitle>
                </DialogHeader>
                <DialogBody display={"flex"} flexDirection={{base: "column", md:"row"}}>
                    <Stack p="5" w={{base: "", md:"md"}} gap="4">
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        if(token){
                            handleEdit();
                        }
                        }}>
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
