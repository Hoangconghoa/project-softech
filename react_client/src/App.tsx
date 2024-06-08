import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutClient from "./components/LayoutClient";
import LoginPage from "./pages/LoginPage/LoginPage";
import Register from "./pages/RegisterPage/Register";
import NoPage from "./pages/NoPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/CheckoutPage";

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
              <Route path="/products/:slug" element={<ProductPage />} />
              {/* <Route path="products/:slug" element={<ProductDetailsPage />} /> */}
            </Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<NoPage />}></Route>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Routes></Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;
