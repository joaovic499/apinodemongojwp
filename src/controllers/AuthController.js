const express = require("express");
const UsuarioModel = require ("../models/Usuario");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config()
const secret = process.env.SECRET

const generateToken = (Usuario = {}) => {
    return jwt.sign({
        id: Usuario.id,
        name: Usuario.name
    }, secret , {
        expiresIn: 86400
    });

}


router.post("/register", async(req, res) => {
    
    const {name, email, password, confirmpassword} = req.body;

    if(await UsuarioModel.findOne({email})){
        return res.status(400).json({
            message: "Email de usuario ja cadastrado, Cadastre um usuario com outro email!"
        })
    }

    if (password != confirmpassword){
        return res.status(400).json({
            message: "Senhas não correspondem"
        })
    }

    const usuario = await UsuarioModel.create(req.body);
        usuario.password = undefined;

        return res.json({
            Usuario,
            token: generateToken(Usuario),
            message:"Registrado com sucesso",
    });
})

router.post("/autenticate", async(req, res) => {
    
    const {email, password} = req.body;
    const usuario = await UsuarioModel.findOne({email}).select("+password");
 
    if(!usuario) {
        return res.status(400).json({
            message: "Usuario não encontrado"
        })
    }

    if(!await bcrypt.compare(password, usuario.password)){
        return res.status(400).json({
            message: "Senha incorreta!!!"
        })

    }

    usuario.password = undefined;
    
    return res.json({
        name: usuario.name,
        token: generateToken(usuario)
    });
    

})


module.exports = router;