import express, { Express } from "express";

import routerOrder from "./routes/v1/orders.route";
import routerUpload from "./routes/v1/uploads.route";
import routerCustomer from "./routes/v1/customers.route";
import routerUser from "./routes/v1/user.route";
import routerAuth from "./routes/v1/auth.route";
import routerProduct from "./routes/v1/products.route";
import routerCategory from "./routes/v1/categories.route";
import routerBrand from "./routes/v1/brands.route";
import routerCount from "./routes/v1/count.route";
import cors from "cors";
const app: Express = express();
app.use(cors({ origin: "*" }));

//order
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/orders", routerOrder);
app.use("/api/v1/upload", routerUpload);
app.use("/api/v1/customers", routerCustomer);
app.use("/api/v1/user", routerUser);
app.use("/api/v1/auth", routerAuth);
app.use("/api/v1/products", routerProduct);
app.use("/api/v1/categories", routerCategory);
app.use("/api/v1/brands", routerBrand);
app.use("/api/v1/count", routerCount);
export default app;
