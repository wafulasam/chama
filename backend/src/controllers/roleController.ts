import { Request, Response } from "express";
import Role from "../models/roleModel";

// Get all roles
export const getAllRoles = async (req: Request, res: Response): Promise<void> => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to retrieve roles', error: error.message });
    }
};

// Get role by id
export const getRoleById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const role = await Role.findByPk(id);
        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to retrieve role', error: error.message });
    }
};

// Create a new role
export const createNewRole = async (req: Request, res: Response): Promise<void> => {
    const { name, actions, description } = req.body;

    try {
        const newRole = await Role.create({
            name,
            actions,
            description,
        });
        res.status(201).json(newRole);
    } catch (error: any) {
        res.status(400).json({ message: 'Failed to create role', error: error.message });
    }
};

// Update an existing role
export const updateExistingRole = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, actions, description } = req.body;

    try {
        const role = await Role.findByPk(id);
        if (role) {
            role.name = name;
            role.actions = actions;
            role.description = description;
            await role.save();
            res.status(200).json(role);
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: 'Failed to update role', error: error.message });
    }
};

// Delete a role
export const deleteRoleById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const role = await Role.findByPk(id);
        if (role) {
            await role.destroy();
            res.status(200).json({ message: 'Role deleted successfully' });
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: 'Failed to delete role', error: error.message });
    }
};
