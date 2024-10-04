import jwt from 'jsonwebtoken';

export const generateToken = (user: any) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");
    return jwt.sign({ id: user._id }, secret, { expiresIn: '15m' });
};

export const generateRefreshToken = (user: any) => {
    const refreshSecret = process.env.REFRESH_SECRET;
    if (!refreshSecret) throw new Error("REFRESH_SECRET is not defined");
    return jwt.sign({ id: user._id }, refreshSecret, { expiresIn: '7d' });
};