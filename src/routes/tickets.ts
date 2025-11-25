import { Router } from "express";
import { createTicket } from "../controllers/ticketscontroller";

const router = Router();

router.post("/", createTicket);

export default router;
