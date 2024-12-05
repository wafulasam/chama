// users controller
import { Request, Response } from "express";
import User from "../models/userModel";

// get all users
export const getAllUsers = async (req:Request, res:Response): Promise<void> => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error:any){
        res.status(500).json({ message: 'Failed to retrieve users', error: error.message });
    }
}

// get user by id
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error:any) {
    res.status(500).json({ message: 'Failed to retrieve user', error: error.message });
  }
};

// create user
export const createNewUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, date_of_birth, role, profile_picture } = req.body;
  try {
      const newUser = await User.create({ name, email, date_of_birth, role, profile_picture });
      res.status(201).json(newUser);
  } catch (error: any) {
      res.status(400).json({ message: 'Failed to create user', error: error.message });
  }
};

// update user
export const updateExistingUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email, date_of_birth, role, profile_picture } = req.body;
  try {
      const user = await User.findByPk(id);
      if (user) {
          user.name = name;
          user.email = email;
          user.date_of_birth = date_of_birth;
          user.role = role;
          user.profile_picture = profile_picture;
          await user.save();
          res.status(200).json(user);
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error: any) {
      res.status(400).json({ message: 'Failed to update user', error: error.message });
  }
};

// delete user
export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error:any) {
      res.status(400).json({ message: 'Failed to delete user', error: error.message });
    }
};