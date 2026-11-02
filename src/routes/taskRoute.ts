import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from "../controllers/taskController";
import { validateCreateTask, validateUpdateTask } from "../middlewares/validateTask";

const router = Router();

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", validateCreateTask, createTask);
router.put("/:id", validateUpdateTask, updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/status", toggleTaskStatus); // fitur tambahan

export default router;