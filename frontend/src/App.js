import { Provider } from "./components/ui/provider";
import Main from "./Main";
import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Toaster, toaster } from "./components/ui/toaster";
import { useNavigate } from "react-router-dom";
import api from "./Api";
import Cookies from "js-cookie";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedToken = Cookies.get("token");
    if (savedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const onRegister = (username, email, password) => {
    let newUser = {
      username,
      email,
      password,
      birthDate: "2025-02-04T13:22:44.891Z",
      phoneNumber: "06301234567"
    };

    api.post("/auth/register", newUser)
      .then(response => {
        toaster.create({ title: "Sikeres regisztráció.", type: "success" });
          navigate("/login");
          onLogin(username,password)
      })
      .catch(e => {
        console.error("HIBA, Nem sikerült a regisztráció: ", e);
        toaster.create({ title: "Sikertelen regisztráció!", type: "error" });
      });
  };

  const onLogin = (username, password) => {
    let user = { username, password };
    api.post("/auth/login", user)
      .then(response => {
        if (response.data.token) {
          setIsLoggedIn(true);
          console.log(response)
          Cookies.set("token", response.data.token, { expires: 1, secure: true });
          Cookies.set("userid", response.data.id, { expires: 1, secure: true });
          toaster.create({ title: "Sikeres bejelentkezés!", type: "success" });
          navigate("/");
        } else {
          toaster.create({ title: "Sikertelen bejelentkezés!", type: "error" });
        }
      })
      .catch(e => console.error("HIBA, Nem sikerült a bejelentkezés: ", e));
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove("token");
    Cookies.remove("userid");
    toaster.create({ title: "Sikeres kijelentkezés!", type: "success" });
  };

  return (
    <Provider>
      <Box bg="Background">
        <Main isLoggedIn={isLoggedIn} onRegister={onRegister} onLogin={onLogin} onLogout={onLogout} />
        <Toaster />
      </Box>
    </Provider>
  );
}

export default App;
