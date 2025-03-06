import api from "./Api";
import Cookies from "js-cookie";
import { toaster } from "../components/ui/toaster";
import { sendEmail } from "./EmailService";


// Lekéri hogy legutóbbi bejelentkezéskor bepipálta e a maradjon bejelentkezve opciót
export const getStayLoggedIn = () => {
  const stayLoggedIn = localStorage.getItem("stayLoggedIn");
  return stayLoggedIn === "true";
}
// Lekéri a tokent a megfelelő tárolóból
export const getToken = () => {
  if (getStayLoggedIn()) {
    return Cookies.get("token");
  } else {
    return sessionStorage.getItem("token");
  }
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
  await api.post("/auth/login", user)
    .then(response => {
      if (response.data.token) {
        localStorage.setItem("stayLoggedIn",stayLoggedIn);
        if(stayLoggedIn){
          Cookies.set("token", response.data.token, { expires: 1, secure: true });
          Cookies.set("userid", response.data.id, { expires: 1, secure: true });
        }
        else{
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("userid", response.data.id);
        }
        toaster.create({ title: "Sikeres bejelentkezés!", type: "success" });
        window.location.reload(); // az oldal frissítése, hogy minden megfelelően működjön
      } else {
        toaster.create({ title: "Sikertelen bejelentkezés!", type: "error" });
      }
    })
    .catch(e => console.error("HIBA, Nem sikerült a bejelentkezés: ", e));
}
// Kijelentkezés függvény
export const onLogout = () => {
  Cookies.remove("token");
  Cookies.remove("userid");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userid");
  toaster.create({ title: "Sikeres kijelentkezés!", type: "success" });
  window.location.reload(); // az oldal frissítése, hogy minden megfelelően működjön
}
