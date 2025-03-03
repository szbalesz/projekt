
import { Badge, Button, Kbd, Table } from "@chakra-ui/react"
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from "../components/ui/action-bar"
import { Checkbox } from "../components/ui/checkbox"
import { Avatar } from "../components/ui/avatar";
import { useState } from "react"
import { LuPen, LuTrash } from "react-icons/lu";
import { useEffect } from "react";
import { getAllUser } from "../services/UserService";
import { useNavigate } from 'react-router-dom';

export default function AdminUsers () {
  const [selection, setSelection] = useState([]);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const hasSelection = selection.length > 0
  const indeterminate = hasSelection && selection.length < users.length
  useEffect(() => {
    const getusers = async () =>{
      setUsers(await getAllUser());
    }
    getusers();
  }, [])

  return (
    <>
      <Table.Root showColumnBorder>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="6">
            </Table.ColumnHeader>
            <Table.ColumnHeader>Felhasználó</Table.ColumnHeader>
            <Table.ColumnHeader>Rang</Table.ColumnHeader>
            <Table.ColumnHeader>Zenék száma</Table.ColumnHeader>
            <Table.ColumnHeader>Lejátszási listák száma</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            users.map((user) => {
              return (
                <Table.Row
                  key={user.id}
                  data-selected={selection.includes(user.id) ? "" : undefined}
                >
                  <Table.Cell>
                    <Checkbox
                      top="1"
                      aria-label="Select row"
                      checked={selection.includes(user.id)}
                      onCheckedChange={(changes) => {
                        setSelection((prev) =>
                          changes.checked
                            ? [...prev, user.id]
                            : selection.filter((id) => id !== user.id),
                        )
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell><Button onClick={()=> {navigate("/user/"+user.id)}} variant={"ghost"}><Avatar width="25px" height="25px" src={user.profilePictureURL}/>{user.username}</Button></Table.Cell>
                  <Table.Cell>{user.roles.length > 0 ? user.roles.map((role)=> <Badge colorPalette="red">{role}</Badge>) : <Badge>Alap</Badge>}</Table.Cell>
                  <Table.Cell>{user.musiccount}</Table.Cell>
                  <Table.Cell>{user.playlistcount}</Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table.Root>

      <ActionBarRoot open={hasSelection}>
        <ActionBarContent>
          <ActionBarSelectionTrigger>
            {selection.length} kiválasztva
          </ActionBarSelectionTrigger>
          <ActionBarSeparator />
          <Button variant="outline" size="sm">
            Szerkesztés <LuPen/>
          </Button>
          <Button colorPalette={"red"} variant="solid" size="sm">
            Törlés <LuTrash/>
          </Button>
        </ActionBarContent>
      </ActionBarRoot>
    </>
  )
}

