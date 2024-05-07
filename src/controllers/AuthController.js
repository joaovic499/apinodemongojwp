const express = require("express");

const UsuarioModel = require ("../models/Usuario");

const router = express.Router();

router.post("/register", (req, res) => {
    console.log(req.body);
    return res.json({
        message:"Registrado com sucesso"
    });
})

module.exports = router;