import { Request, Response } from "express";
import User from "../models/userModel"

// get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to retrieve users', error: error.message });
    }
};

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
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to retrieve user', error: error.message });
    }
};

// create user
export const createNewUser = async (req: Request, res: Response): Promise<void> => {
    const { first_name, last_name, email, password, role, created_by } = req.body;
    try {
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password,
            role,
            created_by,
        });
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({ message: 'Failed to create user', error: error.message });
    }
};

// update user
export const updateExistingUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { first_name, last_name, email, password, role, created_by } = req.body;

    try {
        const user = await User.findByPk(id);
        if (user) {
            user.first_name = first_name;
            user.last_name = last_name;
            user.email = email;
            user.password = password;
            user.role = role;
            user.created_by = created_by;
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
    } catch (error: any) {
        res.status(400).json({ message: 'Failed to delete user', error: error.message });
    }
};
