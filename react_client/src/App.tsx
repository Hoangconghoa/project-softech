import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutClient from "./components/LayoutClient";
import LoginPage from "./pages/LoginPage/LoginPage";
import Register from "./pages/RegisterPage/Register";
import NoPage from "./pages/NoPage";
import HomePage from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/CheckoutPage";
import ProductDetail from "./pages/ProductsPage/ProductDetail";
import Successfully from "./pages/Successfully";
import OrderPage from "./pages/OrderPage";
import Category from "./pages/ProductsPage/Categories";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutClient />}>
              <Route index element={<HomePage />} />
              <Route path="/category/:id" element={<Category />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              {/* <Route path="products/:slug" element={<ProductDetailsPage />} /> */}
            </Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<NoPage />}></Route>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/succes" element={<Successfully />} />
            <Route path="/order" element={<OrderPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;
