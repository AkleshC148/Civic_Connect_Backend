// middleware/authorizeRoles.js

module.exports = function authorizeRoles(...allowedRoles) {
  return (req, res, next)=>{
    try {
      
      if (!req.user || !req.user.role) {
        return res.status(403).json({
          success: false,
          message: "User role not found or not authenticated.",
        });
      }

      const userRole = req.user.role;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required roles: [${allowedRoles.join(", ")}]`,
        });
      }

      // Role is authorized
      next();
    } catch (error) {
      console.error("Error in authorizeRoles middleware:", error);
      return res.status(500).json({
        success: false,
        message: "Server error in role authorization.",
      });
    }
  };
};
