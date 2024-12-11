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
        // Check if the user exists
        const user = await User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ message: `User with ID ${user_id} does not exist` });
        }
        console.log(`User with ID ${user_id} exists`);

        // Check if the member exists
        const member = await Member.findByPk(member_id);
        if (!member) {
            res.status(404).json({ message: `Member with ID ${member_id} does not exist` });
        }
        console.log(`Member with ID ${member_id} exists`);

        // Create the activity log in the database
        const newActivityLog = await Activity.create({
            user_id,
            member_id,
            action_type,
            description,
            created_at: new Date().toISOString(),  // Ensure created_at is set
        });
        
        // Send response
        res.status(201).json(newActivityLog);
    } catch (error: any) {
        console.error("Error occurred while creating activity log:", error);
        res.status(400).json({ message: 'Failed to create activity log', error: error.message });
    }
};

// Update an activity log
export const updateActivityLog = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { action_type, description } = req.body;
    try {
        const activityLog = await Activity.findByPk(id);
        if (activityLog) {
            // Update only the fields that are provided
            activityLog.action_type = action_type || activityLog.action_type;
            activityLog.description = description || activityLog.description;
            await activityLog.save();
            res.status(200).json(activityLog);
        } else {
            res.status(404).json({ message: 'Activity log not found' });
        }
    } catch (error: any) {
        console.error(error);
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
        console.error(error);
        res.status(400).json({ message: 'Failed to delete activity log', error: error.message });
    }
};