import { Provider } from "./components/ui/provider"
import './App.css';
import Main from "./Main";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { Toaster, toaster } from "./components/ui/toaster"
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account,SetAccount] = useState({});
  const onRegister=(username,email,password)=>{
    console.log("Regisztráció");
      let newUser = {
        username: username,
        email: email,
        password: password //teszt
      }
      toaster.create({
        title: `Sikeres regisztráció.`,
        type: "success",
      })
      navigate("/login");
      console.log(newUser);
    
  }

  const onLogin=(username,password)=>{
      axios.get("https://localhost:5205/user/GetAllUser")
      .then(response => {
          setIsLoggedIn(true);
          SetAccount(response.data[0]);
          if(response.data[0] != null){
            toaster.create({
              title: `Sikeres bejelentkezés!`,
              type: "success",
            })
          }
          navigate("/");
      })
      .catch(e => {
          console.error("HIBA, Nem sikerült a bejelentkezés: ",e);
          toaster.create({
            title: `Sikertelen bejelentkezés!`,
            type: "error",
          })
        })
  }

  const onLogout=()=>{
    setIsLoggedIn(false);
    SetAccount({});
    toaster.create({
      title: `Sikeres kijelentkezés!`,
      type: "success",
    })
  }
  return (
    <Provider>
        <Box bg="Background">
          <Main account={account} isLoggedIn={isLoggedIn} onRegister={onRegister} onLogin={onLogin} onLogout={onLogout}/>
          <Toaster/>
        </Box>
    </Provider>
  );
}

export default App;
