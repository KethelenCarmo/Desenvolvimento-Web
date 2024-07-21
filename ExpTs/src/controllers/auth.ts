// src/controllers/auth.ts
import { Request, Response } from 'express';
import { getMajors } from '../services/major';

const signup = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    res.render("auth/signup");
  } else {
    res.send("dados recebidos");
  }
};

const login = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    res.render("auth/login");
  } else {
    res.send("Login POST endpoint");
  }
};

const logout = async (req: Request, res: Response) => {
  res.send("Logout endpoint");
};

export default { signup, login, logout };
