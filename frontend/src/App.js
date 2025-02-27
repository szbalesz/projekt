import { Provider } from "./components/ui/provider";
import Main from "./Main";
import { Box, Theme } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [themecolor, setThemecolor] = useState(localStorage.getItem("themecolor") || "teal");

  useEffect(() => {
    localStorage.setItem("themecolor", themecolor);
  }, [themecolor]);

  return (
    <Provider>
      <Theme colorPalette={themecolor}>
        <Box bg="Background">
          <Main 
            themecolor={themecolor} 
            setThemecolor={setThemecolor} 
          />
          <Toaster />
        </Box>
      </Theme>
    </Provider>
  );
}

export default App;
