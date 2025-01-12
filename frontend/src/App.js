import { Provider } from "./components/ui/provider"
import './App.css';
import Main from "./Main";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Provider>
        <Box bg="Background">
          <Main/>
        </Box>
    </Provider>
  );
}

export default App;
