const express = require("express");
const UsuarioModel = require ("../models/Usuario");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config()
const secret = process.env.SECRET

const generateToken = (usuario = {}) => {
    return jwt.sign({
        id: usuario.id,
        name: usuario.name
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
            usuario,
            token: generateToken(usuario),
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

router.post('/autenticate/changePassword', async(req, res) => {
    try{
        const { senhaAtual, novaSenha } = req.body;
        const token = req.headers.authorization.split(' ')[1];

        if(!token) {
            return res.status(400).json({ error: "Você não tem permissão para fazer isso"})
        
        }

    const decoded = jwt.verify(token, secret);
    const usuario = await UsuarioModel.findById(decoded.id).select("+password");

    if(!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado"})
    }

    const passwordCorreto = await bcrypt.compare(senhaAtual, usuario.password);

    if(!passwordCorreto) {
        return res.status(400).json({ error: "Senha Atual Incorreta"});
    }
    
    usuario.password = novaSenha;

    await usuario.save();

    return res.json({
        message: "Senha do Usuario alterada com sucesso"
    });
    
    } catch (error) {
    return res.status(500).json({ error: "Erro ao alterar a senha do usuario"});
}

});


module.exports = router;