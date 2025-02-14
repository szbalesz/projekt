import { Box, Button, Center, Flex, Heading, Input, Stack } from '@chakra-ui/react';
import { Field } from "../components/ui/field";
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from "../components/ui/file-upload";
import { HiUpload } from "react-icons/hi";
import React, { useState } from 'react';
import api from "../Api"
import { toaster } from '../components/ui/toaster';
import BigMusicCard from "../BigMusicCard"
import Cookies from "js-cookie"

export default function UploadPage() {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [imageurl, setImageurl] = useState("");
    const [musicfile, setMusicfile] = useState(null);
    const userid = Cookies.get("userid");

    const uploadMusic = async () => {
        const formData = new FormData();
        formData.append("Title", title);
        formData.append("Artist", artist);
        formData.append("ImageUrl", imageurl);
        formData.append("MusicFile", musicfile);
        formData.append("UploaderId", userid);

        try {
            const response = await api.post("/Music/UploadMusic", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                toaster.create({
                    title: `Zene sikeresen feltöltve!`,
                    type: "success",
                })
                setTitle("");
                setArtist("");
                setImageurl("");
                setMusicfile(null);
            } else {
                toaster.create({
                    title: `Hiba történt a fájl feltöltésekor.`,
                    type: "error",
                })
            }
        } catch (error) {
            toaster.create({
                title: `Hiba történt a kapcsolatban.`,
                type: "error",
            })
        }
    };

    return (
        <Center>
            <Flex direction="column" justifyContent="center" textAlign="center">
                <Heading p="3"> Zene feltöltés </Heading>
                <Flex direction={{base: "column", md:"row"}}>
                    <form onSubmit={(f) => {
                            f.preventDefault();
                            uploadMusic();
                        }}>
                        <Stack p="5" gap="4" w={{base: "sm", md:"md"}}>
                            <Field label="Zene cím" required helperText="Add meg a zene címét.">
                                <Input value={title} onChange={(q) => setTitle(q.target.value)} placeholder="Walkin' a street"/>
                            </Field>
                            <Field label="Zene előadó" required helperText="Add meg a zene előadóját.">
                                <Input value={artist} onChange={(q) => setArtist(q.target.value)} placeholder="Desh"/>
                            </Field>
                            <Field label="Zene borítókép url" required helperText="Add meg a zene borítójának az urljét.">
                                <Input value={imageurl} onChange={(q) => setImageurl(q.target.value)} placeholder="https://image.jpg"/>
                            </Field>
                            <FileUploadRoot value={musicfile} onChange={(q) => setMusicfile(q.target.files[0])} required maxFiles={1} accept={["audio/*"]}>
                                <FileUploadTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <HiUpload /> Upload file
                                    </Button>
                                </FileUploadTrigger>
                                <FileUploadList />
                            </FileUploadRoot>
                            <Button type="submit">Feltöltés</Button>
                        </Stack>
                    </form>
                    <Center w={{base: "100%", md:"350px"}} h="400px">
                        <BigMusicCard music={{
                            title: title !== ""? title : "Cím",
                            artist: artist !== ""? artist : "Előadó",
                            imageUrl: imageurl
                        }}/>
                    </Center>
                </Flex>
            </Flex>
        </Center>
    );
}
