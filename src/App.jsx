import MainScreen from "./components/MainScreen";
import MiniSideBar from "./components/MiniSideBar";
import SideBar from './components/Sidebar';
import MenuBar from './components/MenuBar';
import ProtectRoute from "./components/ProtectRoute";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="App">
      <Routes>

        <Route element={<ProtectRoute />}>
          <Route path="/" element={

            <>
              <div className="d-flex w-100">
                <MenuBar />
                <MiniSideBar />
                <SideBar />
                <MainScreen />
              </div>
                <Footer />
            </>
          } />
        </Route>
        <Route path="/auth" element={<Auth />} />


      </Routes>


    </div>
  );
}

export default App;
