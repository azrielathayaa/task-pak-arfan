import { Request, Response } from "express";
import { tasks, getNextId } from "../data/task";
import { Task, ApiResponse, CreateTaskDTO, UpdateTaskDTO } from "../types/task";

// GET /tasks
export const getAllTasks = (req: Request, res: Response): void => {
  const { status, category } = req.query;
  let filtered = [...tasks];

  if (status && (status === "pending" || status === "completed")) {
    filtered = filtered.filter((t) => t.status === status);
  }
  if (category && typeof category === "string") {
    filtered = filtered.filter(
      (t) => t.category?.toLowerCase() === category.toLowerCase()
    );
  }

  res.status(200).json({
    success: true,
    message: "Daftar tugas berhasil diambil",
    total: filtered.length,
    data: filtered,
  });
};

// GET /tasks/:id
export const getTaskById = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    res.status(404).json({
      success: false,
      message: `Tugas dengan ID ${id} tidak ditemukan`,
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Detail tugas berhasil diambil",
    data: task,
  });
};

// POST /tasks
export const createTask = (req: Request, res: Response): void => {
  const { title, description, status, category, deadline }: CreateTaskDTO =
    req.body;

  const now = new Date().toISOString();
  const newTask: Task = {
    id: getNextId(),
    title: title.trim(),
    description: description.trim(),
    status: status ?? "pending",
    category,
    deadline,
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(newTask);

  const response: ApiResponse<Task> = {
    success: true,
    message: "Tugas berhasil ditambahkan",
    data: newTask,
  };
  res.status(201).json(response);
};

// PUT /tasks/:id
export const updateTask = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    res.status(404).json({
      success: false,
      message: `Tugas dengan ID ${id} tidak ditemukan`,
    });
    return;
  }

  const { title, description, status, category, deadline }: UpdateTaskDTO =
    req.body;

  tasks[index] = {
    ...tasks[index],
    ...(title !== undefined && { title: title.trim() }),
    ...(description !== undefined && { description: description.trim() }),
    ...(status !== undefined && { status }),
    ...(category !== undefined && { category }),
    ...(deadline !== undefined && { deadline }),
    updatedAt: new Date().toISOString(),
  };

  res.status(200).json({
    success: true,
    message: "Tugas berhasil diperbarui",
    data: tasks[index],
  });
};

// DELETE /tasks/:id
export const deleteTask = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    res.status(404).json({
      success: false,
      message: `Tugas dengan ID ${id} tidak ditemukan`,
    });
    return;
  }

  const [deleted] = tasks.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Tugas berhasil dihapus",
    data: deleted,
  });
};

// PATCH /tasks/:id/status — fitur tambahan ubah status
export const toggleTaskStatus = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    res.status(404).json({
      success: false,
      message: `Tugas dengan ID ${id} tidak ditemukan`,
    });
    return;
  }

  task.status = task.status === "pending" ? "completed" : "pending";
  task.updatedAt = new Date().toISOString();

  res.status(200).json({
    success: true,
    message: `Status tugas diubah menjadi '${task.status}'`,
    data: task,
  });
};