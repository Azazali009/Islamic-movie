import Header from "./components/Header";
import Cards from "./components/Cards";
import Addmovie from "./components/Addmovie";
import Detail from "./components/Detail";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { createContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = createContext();
function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  return (
    <AppState.Provider value={{ login, setLogin, userName, setUserName }}>
      <div className="App relative">
        <Header />
        <h1>{process.env.REACT_APP_AZAZ}</h1>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/addMovie" element={<Addmovie />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </AppState.Provider>
  );
}

export default App;
export { AppState };
