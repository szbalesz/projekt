import { Provider } from "./components/ui/provider"
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
  const [token, setToken] = useState("")
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
      let user = {
        username: username,
        password: password
      }
      axios.post("https://localhost:5205/api/auth/login",user)
      .then(response => {
        if(response.data.token != ""){
            setIsLoggedIn(true);
            SetAccount(response.data.result);
            setToken(response.data.token);
            toaster.create({
              title: `Sikeres bejelentkezés!`,
              type: "success",
            })
            navigate("/");
          }
          else{
            toaster.create({
              title: `Sikertelen bejelentkezés!`,
              type: "error",
            })
          }
      })
      .catch(e => {
          console.error("HIBA, Nem sikerült a bejelentkezés: ",e);
        })
  }

  const onLogout=()=>{
    setIsLoggedIn(false);
    SetAccount({});
    setToken("");
    toaster.create({
      title: `Sikeres kijelentkezés!`,
      type: "success",
    })
  }
  return (
    <Provider>
        <Box bg="Background">
          <Main token={token} account={account} isLoggedIn={isLoggedIn} onRegister={onRegister} onLogin={onLogin} onLogout={onLogout}/>
          <Toaster/>
        </Box>
    </Provider>
  );
}

export default App;
