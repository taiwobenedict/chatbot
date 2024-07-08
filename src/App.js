import MainScreen from "./components/MainScreen";
import MiniSideBar from "./components/MiniSideBar";
import SideBar from './components/Sidebar';
import MenuBar from './components/MenuBar';


function App() {
  return (
    <div className="App">
        <div className="d-flex">
            <MenuBar />
          <MiniSideBar />
            <SideBar />
            <MainScreen />
        </div>
    </div>
  );
}

export default App;
