import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutClient from "./components/LayoutClient";
import { Login } from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutClient />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
        <Routes></Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
