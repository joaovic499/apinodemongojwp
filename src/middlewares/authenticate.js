const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: true,
            message: "Token não fornecido"
        });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
        return res.status(401).json({
            error: true,
            message: "Tipo de Token Inválido"
        });
    }

    const [scheme, token] = parts;
    
    if (scheme !== "Bearer") {
        return res.status(401).json({
            error: true,
            message: "Tipo de Token Inválido"
        });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Token inválido/expirado"
            });
        }

        req.usuarioLogado = decoded;

        return next();
    });
};
