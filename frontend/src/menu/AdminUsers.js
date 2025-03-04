import DialogAlert from "../menu/DialogAlert"
import { Badge, Button, Table } from "@chakra-ui/react"
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from "../components/ui/action-bar"
import { Checkbox } from "../components/ui/checkbox"
import { Avatar } from "../components/ui/avatar";
import { useState } from "react"
import { LuImage, LuMail, LuPen, LuRefreshCw, LuTrash } from "react-icons/lu";
import { useEffect } from "react";
import { getAllUser } from "../services/UserService";
import { useNavigate } from 'react-router-dom';
import { deleteSelectedUsers } from "../services/AdminService";
import { toaster } from "../components/ui/toaster";
import EditPicture from "./EditPicture";
import EmailChange from "./EmailChange";
import UsernameChange from "./UsernameChange";

export default function AdminUsers ({selectedmenu}) {
  const [selection, setSelection] = useState([]);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const hasSelection = selection.length > 0

  useEffect(() => {
    setSelection([]);
  }, [selectedmenu])

  useEffect(() => {
    load();
  }, [])
  
  const load = async () =>{
    const getusers = async () =>{
      setUsers(await getAllUser());
    }
    getusers();
    setSelection([]);
  }

  return (
    <>
      <Table.ScrollArea mx={"auto"} maxW={window.innerWidth} borderWidth={"1px"} rounded={"xl"}>
      <Table.Root showColumnBorder>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w={"5"}>
              <Button onClick={load} variant={"ghost"} p={"0"} size={"xs"}><LuRefreshCw/></Button>
            </Table.ColumnHeader>
            <Table.ColumnHeader>Felhasználó</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Rang</Table.ColumnHeader>
            <Table.ColumnHeader>Zenék száma</Table.ColumnHeader>
            <Table.ColumnHeader>Lejátszási listák száma</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            users.map((user) => {
              return (
                <Table.Row key={user}
                  data-selected={selection.includes(user) ? "" : undefined}
                >
                  <Table.Cell textAlign={"center"}>
                    <Checkbox
                      top="1"
                      aria-label="Select row"
                      checked={selection.includes(user)}
                      onCheckedChange={(changes) => {
                        setSelection((prev) =>
                          changes.checked
                            ? [...prev, user]
                            : selection.filter((id) => id !== user),
                        )
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell><Button onClick={()=> {navigate("/user/"+user?.id)}} variant={"ghost"}><Avatar width="25px" height="25px" src={user?.profilePictureURL}/>{user?.username}</Button></Table.Cell>
                  <Table.Cell>{user?.email}</Table.Cell>
                  <Table.Cell>{user?.roles.length > 0 ? 
                  user?.roles.map((role)=> {
                    if(role === "Admin"){
                      return <Badge key={role} bg={"red"} color="bg">{role}</Badge>
                    }
                    else{
                      return <Badge key={role}>{role}</Badge>
                    }
                    }) 
                  : <Badge>Alap</Badge>}
                  </Table.Cell>
                  <Table.Cell>{user?.musiccount}</Table.Cell>
                  <Table.Cell>{user?.playlistcount}</Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table.Root>
  </Table.ScrollArea>
      <ActionBarRoot open={hasSelection}>
        <ActionBarContent>
          <ActionBarSelectionTrigger>
            {selection.length} kiválasztva
          </ActionBarSelectionTrigger>
          <ActionBarSeparator />
          <EditPicture openbutton={<Button 
           disabled={selection.length !== 1}
           variant="outline" size="sm">
            Profilkép módosítása <LuImage/>
          </Button>} profilePictureURL={selection[0]?.profilePictureURL} userid={selection[0]?.id} load={load}/>
          <UsernameChange openbutton={<Button 
           disabled={selection.length !== 1}
           variant="outline" size="sm">
            Felhasználónév módosítása <LuPen/>
          </Button>} userid={selection[0]?.id} currentusername={selection[0]?.username} load={load}/>
          <EmailChange openbutton={<Button 
           disabled={selection.length !== 1}
           variant="outline" size="sm">
            Emailcím módosítása <LuMail/>
          </Button>} userid={selection[0]?.id} currentemail={selection[0]?.email} load={load}/>
          <DialogAlert 
           openButton={<Button colorPalette={"red"} variant="solid" size="sm">Törlés <LuTrash/></Button>}
           title={"Biztosan törölni szeretnéd?"} 
           func={()=> deleteSelectedUsers(selection,toaster,load)} 
           text={"Ez a művelet nem vonható vissza. Ez véglegesen törli a kiválasztott felhasználókat a rendszerből."} buttontext={"Törlés"}/>
        </ActionBarContent>
      </ActionBarRoot>
    </>
  )
}

