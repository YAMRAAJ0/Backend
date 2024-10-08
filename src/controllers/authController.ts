import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';
import { logger } from '../utils/logger';

export const register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    try {
        const newUser = await registerUser(name, email, password, role);
        logger.info(`User registered: ${newUser.email}`); // Log registration info
        res.status(201).json({ user: newUser });
    } catch (error) {
        logger.error('Registration error: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await loginUser(email, password);
        if (!result) {
            logger.warn(`Invalid login attempt for email: ${email}`); // Log invalid login attempt
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        logger.info(`User logged in: ${result.user.email}`); // Log login info
        res.status(200).json({
            token: result.token,
            user: result.user, // Including the role in the user object
            role: result.user.role, // Role is returned from the backend
        });
    } catch (error) {
        logger.error('Login error: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};
