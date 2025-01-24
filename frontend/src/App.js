import { Provider } from "./components/ui/provider"
import './App.css';
import Main from "./Main";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account,SetAccount] = useState({
    felhasznalonev: "Kijelentkezve",
    profilkep: ""
  });
  //http://localhost:5202/felhasznalo
  const onLogin=(username,password)=>{
      axios.get("https://localhost:5205/user/GetAllUser")
      .then(response => {
          setIsLoggedIn(true);
          SetAccount(response.data[0]);
      })
      .catch(e => {console.error("HIBA, Nem sikerült a bejelentkezés: ",e)})
  }
  return (
    <Provider>
        <Box bg="Background">
          <Main account={account} isLoggedIn={isLoggedIn} onLogin={onLogin}/>
        </Box>
    </Provider>
  );
}

export default App;
