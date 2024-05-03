import express, { Express } from "express";
import cors from "cors";
import routerOrder from "./routes/v1/orders.route";
const app: Express = express();
app.use(cors({ origin: "*" }));

//order
app.use("/api/v1/orders", routerOrder);

export default app;
