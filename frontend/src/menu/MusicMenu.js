import { Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu"
import AddToPlaylistMenu from '../menu/AddToPlaylistMenu';
import { LuCircleX, LuList } from "react-icons/lu";
import DialogAlert from "./DialogAlert";
import EditMusicWindow from "./EditMusicWindow";
import Cookies from "js-cookie"

export default function MusicMenu({isUploader,getMusic,music, setFavorite, isFavorite, musicId, deleteMusic}) {
  const token = Cookies.get("token");
  return (
    <MenuRoot>
      <MenuTrigger asChild>
      <Button p={1} m={1} variant="solid"><LuList/></Button> 
      </MenuTrigger>
      <MenuContent>
        {token? 
        <AddToPlaylistMenu setFavorite={setFavorite} isFavorite={isFavorite} musicId={musicId}/> 
        : null}
        {isUploader? 
        <>
        <EditMusicWindow music={music} getMusic={getMusic}/>
        <DialogAlert openButton={<MenuItem value="torles" color={"red.500"}><LuCircleX/>Törlés</MenuItem>} title={"Biztosan törölni szeretnéd?"} func={deleteMusic} text={"Ez a művelet nem vonható vissza. Ez véglegesen törli a zenét a rendszerből."} buttontext={"Törlés"}/>
        </>
        : null}
      </MenuContent>
    </MenuRoot>
  )
}
