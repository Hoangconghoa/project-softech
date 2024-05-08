import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

import LayoutAdmin from "./components/LayoutAdmin";
import ProductsPage from "./page/ProductsPage";
import DashBoardPage from "./page/DashBoardPage";
import BrandsPage from "./page/BrandsPage";
import CategoriesPage from "./page/CategoriesPage";
import NoPage from "./page/NoPage";
import LoginPage from "./page/LoginPage";
import UpdateProduct from "./page/ProductsPage/UpdateProduct";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      {/* <LayoutAdmin /> */}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutAdmin />}>
              <Route index element={<DashBoardPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<UpdateProduct />} />

              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              {/* <Route path="/staffs" element={< />} /> */}
            </Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="*" element={<NoPage />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
