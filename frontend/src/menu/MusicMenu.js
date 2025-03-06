import { Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu"
import AddToPlaylistMenu from '../menu/AddToPlaylistMenu';
import { LuCircleX, LuList, LuPen } from "react-icons/lu";
import DialogAlert from "./DialogAlert";
import EditMusicWindow from "./EditMusicWindow";
import { getToken } from "../services/AuthService";

export default function MusicMenu({getData, isUploader, music, setFavorite, isFavorite, musicId, deleteMusic}) {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
      <Button p={1} m={1} variant="solid"><LuList/></Button> 
      </MenuTrigger>
      <MenuContent>
        {getToken()? 
        <AddToPlaylistMenu setFavorite={setFavorite} isFavorite={isFavorite} musicId={musicId}/> 
        : null}
        {isUploader? 
        <>
        <EditMusicWindow openbutton={<MenuItem value="szerkeszt"><LuPen/>Adatok szerkesztése</MenuItem>} getData={getData} music={music} />
        <DialogAlert openButton={<MenuItem value="torles" color={"red.500"}><LuCircleX/>Törlés</MenuItem>} title={"Biztosan törölni szeretnéd?"} func={deleteMusic} text={"Ez a művelet nem vonható vissza. Ez véglegesen törli a zenét a rendszerből."} buttontext={"Törlés"}/>
        </>
        : null}
      </MenuContent>
    </MenuRoot>
  )
}
