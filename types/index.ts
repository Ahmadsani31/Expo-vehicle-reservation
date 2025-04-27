export interface LoginData {
    username: string;
    password: string;
  }
  

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
