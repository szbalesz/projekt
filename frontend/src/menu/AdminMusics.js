
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

export default function AdminMusics () {
  const [selection, setSelection] = useState([])

  const hasSelection = selection.length > 0
  const indeterminate = hasSelection && selection.length < items.length

  const rows = items.map((item) => (
    <Table.Row
      key={item.id}
      data-selected={selection.includes(item.name) ? "" : undefined}
    >
      <Table.Cell>
        <Checkbox
          top="1"
          aria-label="Select row"
          checked={selection.includes(item.name)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.name]
                : selection.filter((name) => name !== item.name),
            )
          }}
        />
      </Table.Cell>
      <Table.Cell><Button variant={"ghost"}><Avatar width="25px" height="25px" src={item.musicimage}/>{item.title}</Button></Table.Cell>
      <Table.Cell>{item.artist}</Table.Cell>
      <Table.Cell><Button variant={"ghost"}><Avatar width="25px" height="25px" src={item.userimage}/>{item.username}</Button></Table.Cell>
    </Table.Row>
  ))

  return (
    <>
      <Table.Root showColumnBorder>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="6">
            </Table.ColumnHeader>
            <Table.ColumnHeader>Zene cím</Table.ColumnHeader>
            <Table.ColumnHeader>Előadó</Table.ColumnHeader>
            <Table.ColumnHeader>Feltöltő</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
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

const items = [
  { id: 1, musicimage : "https://i.ytimg.com/vi/RBlh62UZzCo/maxresdefault.jpg",title: "SZÍNVAK", artist: "VALMAR", userimage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw",username: "Jozsef" }
]
