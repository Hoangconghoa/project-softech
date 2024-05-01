import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const LayoutClient = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto my-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default LayoutClient;
