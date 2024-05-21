const mongoose = require("../databases/index");
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
    name: {
      type: String,
        required: true,
    },
    email: {
      type: String,
        unique: true,
          lowercase: true,
    },
    password: {
      type: String,
        required: true,
          select: false,
    },
    createdAt: {
      type: Date,
        default: Date.now
    }
  });

  UsuarioSchema.pre("save", async function(next) {
    if(!this.isModified('password')) {
      return next();
    }
    try{
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      next();
    } catch (error) {
      next(error);
    }
 
  })
  
  const Usuario = mongoose.model("User", UsuarioSchema);
  module.exports = Usuario;