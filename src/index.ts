import express from "express";
import taskRoutes from "./routes/taskRoute";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = 5000;

// Middleware untuk membaca JSON
app.use(express.json());

// Route dasar (hanya untuk tes)
app.get("/", (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "Task Management API is running 🚀" 
  });
});

// DAFTARKAN ROUTE TASKS DI SINI
app.use("/tasks", taskRoutes);

// Handler untuk 404 (harus di paling bawah)
app.use(notFoundHandler);

// Handler untuk error (harus di paling bawah)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});