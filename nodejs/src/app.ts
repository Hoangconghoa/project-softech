import express, { Express } from "express";
import cors from "cors";
import routerOrder from "./routes/v1/orders.route";
import routerUpload from "./routes/v1/uploads.route";
import routerCustomer from "./routes/v1/customers.route";
const app: Express = express();
app.use(cors({ origin: "*" }));

//order
app.use("/api/v1/orders", routerOrder);
app.use("/api/v1/uploads", routerUpload);
app.use("/api/v1/customers", routerCustomer);

export default app;
