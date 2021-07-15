import { Router } from "express";
import { getAll } from "../controllers/contacts";

const router = Router();
//router.post("/", createBookmark);
router.get("/", getAll);
//router.get("/id/:id", getBookmarkById);
//router.get("/tag/:tag", getBookmarkByTag);
//router.patch("/:id", updateBookmark);
//router.delete("/:id", removeBookmark);
export default router;
