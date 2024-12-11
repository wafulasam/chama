import { Request, Response } from "express";
import Member from "../models/memberModel";

// Get all members
export const getAllMembers = async (req: Request, res: Response): Promise<void> => {
    try {
        const members = await Member.findAll();
        res.status(200).json(members);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to retrieve members', error: error.message });
    }
};

// Get a member by ID
export const getMemberById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const member = await Member.findByPk(id);
        if (member) {
            res.status(200).json(member);
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to retrieve member', error: error.message });
    }
};

// Create a new member
export const createNewMember = async (req: Request, res: Response): Promise<void> => {
    const { first_name, last_name, email, date_of_birth, role, profile_picture, password, created_by } = req.body;

    try {
        const newMember = await Member.create({
            first_name,
            last_name,
            email,
            date_of_birth,
            role,
            profile_picture,
            password,
            created_by,
        });
        res.status(201).json(newMember);
    } catch (error: any) {
        res.status(400).json({ message: 'Failed to create member', error: error.message });
    }
};

// Update an existing member
export const updateExistingMember = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { first_name, last_name, email, date_of_birth, role, profile_picture, password, created_by } = req.body;

    try {
        const member = await Member.findByPk(id);
        if (member) {
            member.first_name = first_name;
            member.last_name = last_name;
            member.email = email;
            member.date_of_birth = date_of_birth;
            member.role = role;
            member.profile_picture = profile_picture;
            member.password = password;
            member.created_by = created_by;
            await member.save();
            res.status(200).json(member);
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: 'Failed to update member', error: error.message });
    }
};

// Delete a member by ID
export const deleteMemberById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const member = await Member.findByPk(id);
        if (member) {
            await member.destroy();
            res.status(200).json({ message: 'Member deleted successfully' });
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: 'Failed to delete member', error: error.message });
    }
};
