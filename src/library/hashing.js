const bcrypt = require('bcrypt');

const hash = async (password) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)
        return hash
    } catch (error) {
        throw error
    }
}

module.exports = hash