import api from "./Api";
import Cookies from "js-cookie";
import { toaster } from "../components/ui/toaster";
import { sendEmail } from "./EmailService";
import { jwtDecode } from "jwt-decode";


// Lekéri hogy legutóbbi bejelentkezéskor bepipálta e a maradjon bejelentkezve opciót
export const getStayLoggedIn = () => {
  const stayLoggedIn = localStorage.getItem("stayLoggedIn");
  return stayLoggedIn === "true";
}
// Lekéri a tokent a megfelelő tárolóból
export const getToken = () => {
  let token;
  if (getStayLoggedIn()) {
    token = Cookies.get("token");
  } else {
    token = sessionStorage.getItem("token");
  }
  if(token){
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
  
      if(decoded.exp < currentTime){ // Ha az exp kisebb, mint a mostani idő, akkor lejárt a token
        toaster.create({ title: "A token lejárt! Kérlek jelentkezz be újra!", type: "error" });
        onLogout();
      }
      else{
        return token;
      }
    } catch (e) {}
  }
  return token;
}
// Regisztrációs függvény
export const onRegister = async (username, email, password, navigate, onLogin) => {
  let newUser = {
    username,
    email,
    password,
    birthDate: "2025-02-04T13:22:44.891Z",
    phoneNumber: "06301234567"
  };

  await api.post("/auth/register", newUser)
    .then(response => {
      if(response.data.message !== "Sikeres regisztráció."){
        toaster.create({ title: response.data.message, type: "error" });
      }
      else{
        toaster.create({ title: "Sikeres regisztráció.", type: "success" });
        sendEmail(email, username, "register");
        navigate("/login");
      }
    })
    .catch(e => {
      console.error("HIBA, Nem sikerült a regisztráció: ", e);
      toaster.create({ title: "Sikertelen regisztráció!", type: "error" });
    });
}
// Bejelentkezés függvény
export const onLogin = async (username, password,stayLoggedIn) => {
  let user = { username, password };
  let token;
  await api.post("/auth/login", user)
    .then(response => {
      token = response.data.token;
      if (token) {
        localStorage.setItem("stayLoggedIn",stayLoggedIn);
        if(stayLoggedIn){
          Cookies.set("token", response.data.token, { expires: 1, secure: true });
        }
        else{
          sessionStorage.setItem("token", response.data.token);
        }
      } else {
        toaster.create({ title: "Sikertelen bejelentkezés!", type: "error" });
      }
    })
    .catch(e => console.error("HIBA, Nem sikerült a bejelentkezés: ", e));
    return token;
}
// Kijelentkezés függvény
export const onLogout = () => {
  Cookies.remove("token");
  sessionStorage.removeItem("token");;
}
