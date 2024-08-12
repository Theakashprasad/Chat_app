import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";   
import authRoute from "./routes/auth.js";
import messageRoute from "./routes/message.js";
import usersRoute from "./routes/users.js";
import mongoDB from "./DB/mongoDB.js";
import { app, server } from "./socket/socket.js";
const port = process.env.PORT || 3001;

dotenv.config();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", usersRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(port,()=>{
	mongoDB();
	console.log(`server is running in port ${port}`)
});
  