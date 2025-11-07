// Helper: verify token from cookies
const getUserFromToken = (req) => {
    try {
        const token = req.cookies.token;
        if (!token) return null;
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }
};

export default getUserFromToken;