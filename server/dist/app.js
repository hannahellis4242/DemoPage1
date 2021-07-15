"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const contacts_1 = __importDefault(require("./routes/contacts"));
const app = express_1.default();
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../app.html"));
});
app.get("/scripts/app.js", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../scripts/app.js"));
});
app.get("/style/app.css", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../style/app.css"));
});
app.use("/addresses", contacts_1.default);
app.get("*", (req, res) => {
    console.log("request : " + req.url);
    res.sendStatus(200);
});
app.listen(3000);
