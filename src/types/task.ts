export type TaskStatus = "pending" | "completed";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  category?: string;
  deadline?: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDTO {
  title: string;
  description: string;
  status?: TaskStatus;
  category?: string;
  deadline?: string;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: TaskStatus;
  category?: string;
  deadline?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}