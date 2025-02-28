import api from "./Api";
import Cookies from "js-cookie";
import { toaster } from "../components/ui/toaster";
import { sendEmail } from "./EmailService";

export const onRegister = (username, email, password, navigate, onLogin) => {
  let newUser = {
    username,
    email,
    password,
    birthDate: "2025-02-04T13:22:44.891Z",
    phoneNumber: "06301234567"
  };

  api.post("/auth/register", newUser)
    .then(response => {
      if(response.data.message !== "Sikeres regisztráció."){
        toaster.create({ title: response.data.message, type: "error" });
      }
      else{
        toaster.create({ title: "Sikeres regisztráció.", type: "success" });
        sendEmail(email, username, "register");
        navigate("/login");
        onLogin(username, password,navigate);
      }
    })
    .catch(e => {
      console.error("HIBA, Nem sikerült a regisztráció: ", e);
      toaster.create({ title: "Sikertelen regisztráció!", type: "error" });
    });
}

export const onLogin = (username, password) => {
  let user = { username, password };
  api.post("/auth/login", user)
    .then(response => {
      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 1, secure: true });
        Cookies.set("userid", response.data.id, { expires: 1, secure: true });
        toaster.create({ title: "Sikeres bejelentkezés!", type: "success" });
        window.location.reload(); // az oldal frissítése, hogy minden megfelelően működjön
      } else {
        toaster.create({ title: "Sikertelen bejelentkezés!", type: "error" });
      }
    })
    .catch(e => console.error("HIBA, Nem sikerült a bejelentkezés: ", e));
}

export const onLogout = () => {
  Cookies.remove("token");
  Cookies.remove("userid");
  toaster.create({ title: "Sikeres kijelentkezés!", type: "success" });
  window.location.reload(); // az oldal frissítése, hogy minden megfelelően működjön
}
