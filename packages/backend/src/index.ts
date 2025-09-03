import dotenv from "dotenv";
dotenv.config();

export { prisma } from "./prisma/prismaClient.js";
import "./server.js";
console.log("WhoDoggy backend started successfully");
