import { Request, Response, NextFunction } from "express";
import { TaskStatus } from "../types/task";

const VALID_STATUSES: TaskStatus[] = ["pending", "completed"];

export const validateCreateTask = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, description, status } = req.body ?? {};
  const errors: string[] = [];

  if (!title || typeof title !== "string" || title.trim() === "") {
    errors.push("Field 'title' wajib diisi dan berupa string.");
  }
  if (!description || typeof description !== "string" || description.trim() === "") {
    errors.push("Field 'description' wajib diisi dan berupa string.");
  }
  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    errors.push("Field 'status' harus bernilai 'pending' atau 'completed'.");
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: "Validasi gagal",
      errors,
    });
    return;
  }
  next();
};

export const validateUpdateTask = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, description, status } = req.body ?? {};
  const errors: string[] = [];

  // Minimal harus ada satu field yang di-update
  if (title === undefined && description === undefined && status === undefined) {
    errors.push("Minimal satu field (title/description/status) harus dikirim.");
  }
  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    errors.push("Field 'title' tidak boleh kosong.");
  }
  if (
    description !== undefined &&
    (typeof description !== "string" || description.trim() === "")
  ) {
    errors.push("Field 'description' tidak boleh kosong.");
  }
  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    errors.push("Field 'status' harus bernilai 'pending' atau 'completed'.");
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: "Validasi gagal",
      errors,
    });
    return;
  }
  next();
};