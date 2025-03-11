import { Provider } from "./components/ui/provider";
import Main from "./Main";
import { Box, Theme } from "@chakra-ui/react";
import { useState, useEffect } from "react";

function App() {
  const [themecolor, setThemecolor] = useState(localStorage.getItem("themecolor") || "teal");
  // Téma váltásakor elmenti azt a localstorageba
  useEffect(() => {
    localStorage.setItem("themecolor", themecolor);
  }, [themecolor]);
  
  document.documentElement.style.setProperty('--themecolor', themecolor);
  return (
    <Provider>
      <Theme colorPalette={themecolor}>
        <Box bg="Background">
          <Main 
            themecolor={themecolor} 
            setThemecolor={setThemecolor} 
          />
        </Box>
      </Theme>
    </Provider>
  );
}

export default App;
