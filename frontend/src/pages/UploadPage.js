import { Button, Center, Flex, Heading, Input, Stack } from '@chakra-ui/react'
import { Field } from "../components/ui/field"
import {
    FileUploadList,
    FileUploadRoot,
    FileUploadTrigger,
} from "../components/ui/file-upload"
import { HiUpload } from "react-icons/hi"
import React from 'react'

export default function UploadPage() {
    return (
        <Center>
            <Flex direction="column" justifyContent="center" textAlign="center">
                <Heading pb="5"> Zene feltöltés </Heading>
                <form>
                    <Stack gap="4" w="md">
                        <Field label="Zene cím" required helperText="Add meg a zene címét.">
                            <Input placeholder="Walkin' a street" />
                        </Field>
                        <Field label="Zene előadó" required helperText="Add meg a zene előadóját.">
                            <Input placeholder="Desh" />
                        </Field>
                        <Field label="Zene borítókép url" required helperText="Add meg a zene borítójának az urljét.">
                            <Input placeholder="https://image.jpg" />
                        </Field>
                        <FileUploadRoot maxFiles={1} accept={["audio/*"]}>
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
            </Flex>
        </Center>
    )
}
