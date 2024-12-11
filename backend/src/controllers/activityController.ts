import { Request, Response } from "express";
import Activity from "../models/activityModel";
import User from "../models/userModel";
import Member from "../models/memberModel";

// Get all activity logs
export const getAllActivityLogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const activityLogs = await Activity.findAll({
            include: [
                { model: User, as: 'user', attributes: ['user_id', 'first_name', 'last_name'] },
                { model: Member, as: 'member', attributes: ['member_id', 'first_name', 'last_name'] }
            ]
        });
        res.status(200).json(activityLogs);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to retrieve activity logs', error: error.message });
    }
};

// Get a specific activity log by ID
export const getActivityLogById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const activityLog = await Activity.findByPk(id, {
            include: [
                { model: User, as: 'user', attributes: ['user_id', 'first_name', 'last_name'] },
                { model: Member, as: 'member', attributes: ['member_id', 'first_name', 'last_name'] }
            ]
        });
        if (activityLog) {
            res.status(200).json(activityLog);
        } else {
            res.status(404).json({ message: 'Activity log not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to retrieve activity log', error: error.message });
    }
};

// Create a new activity log
export const createActivityLog = async (req: Request, res: Response): Promise<void> => {
    const { user_id, member_id, action_type, description } = req.body;
    try {
        // Create the activity log in the database
        const newActivityLog = await Activity.create({
            user_id,
            member_id,
            action_type,
            description,
        });
        res.status(201).json(newActivityLog);
    } catch (error: any) {
        res.status(400).json({ message: 'Failed to create activity log', error: error.message });
    }
};

// Update an activity log (optional, based on your use case)
export const updateActivityLog = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { action_type, description } = req.body;
    try {
        const activityLog = await Activity.findByPk(id);
        if (activityLog) {
            activityLog.action_type = action_type || activityLog.action_type;
            activityLog.description = description || activityLog.description;
            await activityLog.save();
            res.status(200).json(activityLog);
        } else {
            res.status(404).json({ message: 'Activity log not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: 'Failed to update activity log', error: error.message });
    }
};

// Delete an activity log by ID
export const deleteActivityLog = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const activityLog = await Activity.findByPk(id);
        if (activityLog) {
            await activityLog.destroy();
            res.status(200).json({ message: 'Activity log deleted successfully' });
        } else {
            res.status(404).json({ message: 'Activity log not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: 'Failed to delete activity log', error: error.message });
    }
};
