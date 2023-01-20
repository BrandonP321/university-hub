import express from "express";
import { createServer } from "http";
import { configureApp } from "@/Middleware";
import { EnvUtils } from "@/Utils";
import { useRoutes } from "@/Routes";

EnvUtils.verifyAllVarsExist();

const app = express();
const httpServer = createServer(app);

/* Apply basic middleware */
configureApp(app);

useRoutes(app);

httpServer.listen(EnvUtils.Vars.PORT, () => {
    console.log(`Server listening on port ${EnvUtils.Vars.PORT}`)
})



// const isProd = false;

// app.get("/", (req, res) => {
//     res.cookie("Authorization", "some cookie body", {
//         httpOnly: true,
//         secure: isProd,
//         sameSite: isProd ? "none" : "lax",
//         maxAge: 200 * 1000,
//         // domain: "5c29-2601-601-1b00-2f50-b9b3-b9c3-6c53-36cf.ngrok.io"
//     })

//     res.json({}).end();
// })

// app.get("/test", (req, res) => {
//     console.log(req.cookies.Authorization)
// })