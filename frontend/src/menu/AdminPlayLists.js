
import { Badge, Button, Kbd, Table } from "@chakra-ui/react"
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
import { getAllPlaylist, getPlaylistById } from "../services/PlaylistService";
import { getUserId, getUserProfile } from "../services/UserService";
import { useNavigate } from 'react-router-dom';
import { toaster } from "../components/ui/toaster";
import DialogAlert from "./DialogAlert";
import { deleteSelectedPlaylists } from "../services/AdminService";
import EditPlaylistWindow from "./EditPlaylistWindow";

export default function AdminPlayLists({selectedmenu}) {
  const [selection, setSelection] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [creators, setCreators] = useState([]);
  const [musiccounts, setMusiccounts] = useState([]);
  const hasSelection = selection.length > 0
  const navigate = useNavigate();
  const userid = getUserId();
  // Lejátszási lista készítőjének adatainak lekérése
  const getCreator = async (id) => {
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

  // Ha valtoznak a lejátszási listák akkor lekéri az adataikat
  useEffect(() => {
    const fetchData = async () => {
      const newProfiles = {};
      const newCounts = {};
      for (let playlist of playlists) {
        if(!newCounts[playlist?.id]){
          const musiccount = (await getPlaylistById(playlist.id)).musics.length;
          newCounts[playlist?.id] = musiccount;
        }
        if (!newProfiles[playlist?.creatorId]) {
          const profile = await getCreator(playlist?.creatorId);
          newProfiles[playlist?.creatorId] = profile;
        }
      }
      setCreators(newProfiles);
      setMusiccounts(newCounts);
    };
    fetchData();
  }, [playlists]);
  
  // Betöltés függvény
  const load = async () => {
    // Lejátszási listák lekérése
    setPlaylists(await getAllPlaylist());
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
            <Table.ColumnHeader>Lejátszási lista</Table.ColumnHeader>
            <Table.ColumnHeader>Zenék száma</Table.ColumnHeader>
            <Table.ColumnHeader>Készítő</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            playlists.map((playlist) => { 
              const profile = creators[playlist?.creatorId];
              const musiccount = musiccounts[playlist?.id];
            return (
            <Table.Row
              key={playlist?.id}
              data-selected={selection.includes(playlist) ? "" : undefined}
            >
              <Table.Cell>
                <Checkbox
                  top="1"
                  aria-label="Select row"
                  checked={selection.includes(playlist)}
                  onCheckedChange={(changes) => {
                    setSelection((prev) =>
                      changes.checked
                        ? [...prev, playlist]
                        : selection.filter((name) => name !== playlist),
                    )
                  }}
                />
              </Table.Cell>
              <Table.Cell><Button onClick={()=> {navigate("/playlist/"+playlist?.id)}} variant={"ghost"}><Avatar width="25px" height="25px" src={playlist?.imageUrl}/>{playlist?.playlistName}</Button></Table.Cell>
              <Table.Cell>{musiccount}</Table.Cell>
              <Table.Cell><Button onClick={()=> {navigate("/user/"+playlist?.creatorId)}} variant={"ghost"}><Avatar width="25px" height="25px" src={profile?.profilePictureURL}/>{profile?.username + ((profile?.id === userid) ? " (Te)" : "")}</Button></Table.Cell>
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
          <EditPlaylistWindow openbutton={<Button
           disabled={selection.length !== 1}
           variant="outline" size="sm">
            Szerkesztés <LuPen/>
          </Button>} playlist={selection[0]} load={load}/>
          <DialogAlert 
           openButton={<Button colorPalette={"red"} variant="solid" size="sm">Törlés <LuTrash/></Button>}
           title={"Biztosan törölni szeretnéd?"} 
           func={()=> deleteSelectedPlaylists(selection,toaster,load)} 
           text={"Ez a művelet nem vonható vissza. Ez véglegesen törli a kiválasztott lejátszási listákat a rendszerből."} buttontext={"Törlés"}/>
        </ActionBarContent>
      </ActionBarRoot>
    </>
  )
}
