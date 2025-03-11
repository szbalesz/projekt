
import { Button, Table,
 } from "@chakra-ui/react"
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from "../components/ui/action-bar"
import { Checkbox } from "../components/ui/checkbox"
import { Avatar } from "../components/ui/avatar";
import { useEffect, useState } from "react"
import { LuPen, LuRefreshCw, LuTrash } from "react-icons/lu";
import { getAllMusic } from "../services/MusicService";
import { getUserId, getUserProfile } from "../services/UserService";
import { useNavigate } from "react-router-dom"
import DialogAlert from "./DialogAlert";
import { toaster } from "../components/ui/toaster";
import { deleteSelectedMusics } from "../services/AdminService";
import EditMusicWindow from "./EditMusicWindow";

export default function AdminMusics ({selectedmenu}) {
  const [selection, setSelection] = useState([])
  const [musics,setMusics] = useState([]);
  const [uploaders, setUploaders] = useState([]);
  const hasSelection = selection.length > 0
  const navigate = useNavigate();
  const userid = getUserId();
  // Zene feltöltőjének lekérése
  const getUploader = async (id) => {
    const user = await getUserProfile(id);
    return { 
     id: id,
     username: user.username,
     profilePictureURL: user.profilePictureURL
    }
   }

  // Menü váltáskor törli a kijelőlést, és újratölti az adatokat
  useEffect(() => {
    setSelection([]);
    load();
  }, [selectedmenu])
   
  useEffect(() => {
    load();
  }, [])

  // Zenék lista változásakor lekéri az adataikat
  useEffect(() => {
    const fetchProfiles = async () => {
      const newProfiles = {};
      for (let music of musics) {
        if (!newProfiles[music?.uploaderId]) {
          const profile = await getUploader(music?.uploaderId);
          newProfiles[music?.uploaderId] = profile;
        }
      }
      setUploaders(newProfiles);
    };
    fetchProfiles();
  }, [musics]);
  
  const load = async () =>{
    // Zenék lekérése
    setMusics(await getAllMusic());
    // Eddigi kijelölések törlése
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
            <Table.ColumnHeader>Zene cím</Table.ColumnHeader>
            <Table.ColumnHeader>Előadó</Table.ColumnHeader>
            <Table.ColumnHeader>Feltöltő</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            musics.map((music) => {
            const profile = uploaders[music?.uploaderId];
            return (
            <Table.Row
              key={music?.id}
              data-selected={selection.includes(music) ? "" : undefined}
            >
              <Table.Cell>
                <Checkbox
                  top="1"
                  aria-label="Select row"
                  checked={selection.includes(music)}
                  onCheckedChange={(changes) => {
                    setSelection((prev) =>
                      changes.checked
                        ? [...prev, music]
                        : selection.filter((name) => name !== music),
                    )
                  }}
                />
              </Table.Cell>
              <Table.Cell>
              <Button onClick={()=>{
                navigate("/music/"+music?.id)
              }} variant={"ghost"}><Avatar width="25px" height="25px" src={music?.imageUrl}/>{music?.title}</Button>
              </Table.Cell>
              <Table.Cell>{music?.artist}</Table.Cell>
              <Table.Cell><Button onClick={()=>{
                navigate("/user/"+music?.uploaderId)
              }} variant={"ghost"}><Avatar width="25px" height="25px" src={profile?.profilePictureURL}/>{profile?.username + ((profile?.id === userid) ? " (Te)" : "")}</Button></Table.Cell>
            </Table.Row>
          )})
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
          <EditMusicWindow 
            openbutton={<Button
            disabled={selection?.length !== 1}
            variant="outline" size="sm">
              Szerkesztés <LuPen/>
            </Button>} 
            music={selection[0]} 
            getData={load}/>
          <DialogAlert 
           openButton={<Button colorPalette={"red"} variant="solid" size="sm">Törlés <LuTrash/></Button>}
           title={"Biztosan törölni szeretnéd?"} 
           func={()=> deleteSelectedMusics(selection,toaster,load)} 
           text={"Ez a művelet nem vonható vissza. Ez véglegesen törli a kiválasztott zenéket a rendszerből."} buttontext={"Törlés"}/>
        </ActionBarContent>
      </ActionBarRoot>
    </>
  )
}
