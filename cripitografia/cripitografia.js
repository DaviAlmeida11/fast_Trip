const bcrypt = require("bcrypt");

const criptografarSenha = (senha) => {
    return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(senha, salt))
}

const compararSenha = async (senhaDigitada, senhaHash) => {
 const Coisas =  await bcrypt.compare(senhaDigitada, senhaHash) 
 console.log(Coisas)
 return Coisas
}

module.exports = {
    criptografarSenha,
    compararSenha
}