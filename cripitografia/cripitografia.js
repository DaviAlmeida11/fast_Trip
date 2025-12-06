const bcrypt = require("bcrypt");

const criptografarSenha = (senha) => {
    return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(senha, salt))
}

const compararSenha = (senhaDigitada, senhaHash) => {
    return bcrypt.compare(senhaDigitada, senhaHash)
}

module.exports = {
    criptografarSenha,
    compararSenha
}