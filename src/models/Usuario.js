const mongoose = require("../databases");

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
  
  const Usuario = mongoose.model("User", UsuarioSchema);
  module.exports = Usuario;