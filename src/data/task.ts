import { Task } from "../types/task";

export const tasks: Task[] = [
  {
    id: 1,
    title: "Belajar Express.js",
    description: "Mempelajari dasar-dasar Express.js dan middleware",
    status: "pending",
    category: "Belajar",
    deadline: "2025-12-31",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Membuat REST API",
    description: "Membangun REST API menggunakan Express + TypeScript",
    status: "completed",
    category: "Project",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Auto-increment ID generator
let nextId = tasks.length + 1;
export const getNextId = (): number => nextId++;