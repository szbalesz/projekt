import { Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuTriggerItem,
} from "../components/ui/menu"
import AddToPlaylistMenu from '../menu/AddToPlaylistMenu';
import { LuCircleX, LuList } from "react-icons/lu";
import DialogAlert from "./DialogAlert";
import EditMusicWindow from "./EditMusicWindow";

export default function MusicMenu({setFavorite, isFavorite, musicId, deleteMusic}) {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
      <Button p={1} m={1} variant="solid"><LuList/></Button> 
      </MenuTrigger>
      <MenuContent>
        <AddToPlaylistMenu setFavorite={setFavorite} isFavorite={isFavorite} musicId={musicId}/>
        <EditMusicWindow/>
        <DialogAlert openButton={<MenuItem value="torles" color={"red.500"}><LuCircleX/>Törlés</MenuItem>} title={"Biztosan törölni szeretnéd?"} func={deleteMusic} text={"Ez a művelet nem vonható vissza. Ez véglegesen törli a lejátszási listát a rendszerből."} buttontext={"Törlés"}/>
      </MenuContent>
    </MenuRoot>
  )
}
