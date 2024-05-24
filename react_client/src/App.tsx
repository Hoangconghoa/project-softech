import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutClient from "./components/LayoutClient";
import LoginPage from "./pages/LoginPage/LoginPage";
import Register from "./pages/RegisterPage/Register";
import NoPage from "./pages/NoPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutClient />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<NoPage />}></Route>
        </Routes>
        <Routes></Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
