import { Provider } from "./components/ui/provider"
import './App.css';
import Main from "./Main"

function App() {
  return (
    <Provider>
      <div className="App">
        <Main/>
      </div>
    </Provider>
  );
}

export default App;
