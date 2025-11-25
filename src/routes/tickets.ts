import { Router } from "express";
import { generateTickets } from "../controllers/ticketscontroller";

const router = Router();

// POST /api/tickets/generate
router.post("/generate", generateTickets);

export default router;
