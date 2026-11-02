import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Endpoint '${req.method} ${req.originalUrl}' tidak ditemukan`,
  });
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("[ERROR]", err.message);
  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
    error: err.message,
  });
};