import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

import LayoutAdmin from "./components/LayoutAdmin";
import ProductsPage from "./pages/ProductsPage";
import DashBoardPage from "./pages/DashBoardPage";
import BrandsPage from "./pages/BrandsPage";
import CategoriesPage from "./pages/CategoriesPage";
import NoPage from "./pages/NoPage";
import LoginPage from "./pages/LoginPage";
import ProductEditPage from "./pages/ProductsPage/ProductEditPage";
import ProductAddPage from "./pages/ProductsPage/ProductAddPage";

import ProductWithCategories from "./pages/CategoriesPage/ProductWithCategories";
import OrdersPage from "./pages/OrdersPage";
import OrderAddPage from "./pages/OrdersPage/OrderAddPage";
// import UpdateProduct from "./pages/ProductsPage/UpdateProduct";

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
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/add" element={<OrderAddPage />} />
              <Route path="/products/add" element={<ProductAddPage />} />
              <Route path="/products/:id" element={<ProductEditPage />} />

              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route
                path="/categories/:id"
                element={<ProductWithCategories />}
              />
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
