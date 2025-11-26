import { Request, Response } from "express";
import Menu from "../models/menu";

export const menucontroller = {
  async getAll(req: Request, res: Response) {
    const items = await Menu.findAll({ order: [["order", "ASC"]] });
    res.json(items);
  },

  async getById(req: Request, res: Response) {
    const item = await Menu.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  },

  async create(req: Request, res: Response) {
    const newItem = await Menu.create(req.body);
    res.json(newItem);
  },

  async update(req: Request, res: Response) {
    const item = await Menu.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    await item.update(req.body);
    res.json(item);
  },

  async delete(req: Request, res: Response) {
    const item = await Menu.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    await item.destroy();
    res.json({ message: "Deleted" });
  }
};
