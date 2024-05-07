const express = require("express");
const UsuarioModel = require ("../models/Usuario");
const router = express.Router();

router.post("/register", async(req, res) => {

    const {email} = req.body;

    if(await UsuarioModel.findOne({email})){
        return res.status(400).json({
            message: "Email de usuario ja cadastrado, Cadastre um usuario com outro email!"
        })
    }

    const Usuario = await UsuarioModel.create(req.body);
        Usuario.password = undefined;
            return res.json({
                message:"Registrado com sucesso",
                    data: Usuario
    });
})

module.exports = router;