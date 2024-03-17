const JWT = require("jsonwebtoken");

//  Verify JWT token
module.exports = async (req, res, next) => {

    try {
        // Extract JWT token from Authorization header
        const token = req.headers["authorization"].split(" ")[1];

        // Verify token
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            // If verification fails, send authentication failure message
            if (err) {
                return res.status(200).send({
                message: "Auth Failed",
                success: false,
                });
            } else {
                // If verification succeeds, extract user ID from decoded token
                req.body.userId = decode.id;
                next();
            }
        });
    }catch (error) {
            console.log(error);
            res.status(401).send({
                message: "Auth Failed",
                success: false,
            });
        }

};
