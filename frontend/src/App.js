import { Provider } from "./components/ui/provider"
import './App.css';
import Main from "./Main";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function App() {
  const [account,SetAccount] = useState({});
  //http://localhost:5202/felhasznalo
  const onLogin =()=>{
    fetch("http://localhost:5202/felhasznalo")
    .then(response => {
      return response.json();
    })
    .then(data => {
        SetAccount(data[0]);
        console.log(data[0])
    })
  }
  useEffect(() => {
    onLogin();
  }, [])
  return (
    <Provider>
        <Box bg="Background">
          <Main account={account}/>
        </Box>
    </Provider>
  );
}

export default App;
