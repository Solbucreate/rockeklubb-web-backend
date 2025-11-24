import { Request, Response } from "express";
import Band from "../models/band";

export const getAllBands = async (req: Request, res: Response) => {
  try {
    const bands = await Band.findAll();
    res.json(bands);
  } catch {
    res.status(500).json({ error: "Failed to fetch bands" });
  }
};

export const getBandById = async (req: Request, res: Response) => {
  try {
    const band = await Band.findByPk(req.params.id);
    if (!band) return res.status(404).json({ error: "Band not found" });

    res.json(band);
  } catch {
    res.status(500).json({ error: "Failed to fetch band" });
  }
};

export const createBand = async (req: Request, res: Response) => {
  try {
    const band = await Band.create(req.body);
    res.json(band);
  } catch {
    res.status(500).json({ error: "Failed to create band" });
  }
};

export const updateBand = async (req: Request, res: Response) => {
  try {
    const band = await Band.findByPk(req.params.id);
    if (!band) return res.status(404).json({ error: "Band not found" });

    await band.update(req.body);
    res.json(band);
  } catch {
    res.status(500).json({ error: "Failed to update band" });
  }
};

export const deleteBand = async (req: Request, res: Response) => {
  try {
    const band = await Band.findByPk(req.params.id);
    if (!band) return res.status(404).json({ error: "Band not found" });

    await band.destroy();
    res.json({ message: "Band deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete band" });
  }
};
