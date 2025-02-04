const express = require('express');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ msg: "Invalid token format" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Ensure decoded payload contains the expected `userId`
        if (!decoded || !decoded.userId) {
            return res.status(403).json({ msg: "Invalid token payload" });
        }

        req.userId = decoded.userId;
        next();
    } catch (e) {
        console.error("JWT Error:", e);
        return res.status(403).json({ msg: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
