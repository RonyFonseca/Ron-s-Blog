import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import conn from "./Db/conn.js";
import UserRoutes from "./Routes/UserRoutes.js";
import PostRoutes from "./Routes/PostRoutes.js";
import token from "./helpers/Token.js";

dotenv.config();

const app = express();

// ✅ CORS correto com preflight
app.use(cors());

app.use(express.json());

app.use("/users", UserRoutes);
app.use("/posts", token.checkToken, PostRoutes);

app.listen(process.env.PORT, () => {
    console.log("🚀 - Servidor rodando na porta:", process.env.PORT);
});
