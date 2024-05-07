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
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  })
  
  const Usuario = mongoose.model("User", UsuarioSchema);
  module.exports = Usuario;