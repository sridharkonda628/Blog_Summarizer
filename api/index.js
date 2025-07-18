import app from "../server/index.js";
import { createServerlessExpressHandler } from "@vendia/serverless-express";

export default createServerlessExpressHandler(app);
