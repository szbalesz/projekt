import { Provider } from "./components/ui/provider"
import './App.css';
import Main from "./Main";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account,SetAccount] = useState({
    felhasznalonev: "Kijelentkezve",
    profilkep: ""
  });
  //http://localhost:5202/felhasznalo
  const onLogin=(username,password)=>{
      fetch("http://localhost:5202/user/GetAllUser")
      .then(response => {
        return response.json();
      })
      .then(data => {
          setIsLoggedIn(true);
          SetAccount(data[0]);
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
