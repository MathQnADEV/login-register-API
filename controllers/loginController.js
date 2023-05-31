const db = require('../config/conn')
const byCrypt = require('bcrypt')

exports.checkLogin = async (data) => {
    const dataUser = await db.query('select * from datUser where email  = ? OR userName = ?', [data.email, data.userName])

    if (!dataUser.code) {
        // let dataU = [];
        // return dataUser[0].password
        // if (dataUser.length === 0) {
        //     // return 'kemungkinan Email dan user anda tidak ada'
        //     response.error("Kemungkinan Email dan User tidak ada", req.originalUrl, 403, res)
        // }
        if (data.userName === dataUser[0].userName) {
            if (data.email === dataUser[0].email) {
                const passwordMatch = await byCrypt.compare(data.password, dataUser[0].password);
                if (passwordMatch) {
                    return `Berhasil Login dengan email: ${data.email}`;
                }
                throw new Error("Password tidak cocok")

            }
            throw new Error("Email tidak cocok")
        }

        throw new Error("username tidak cocok")
    }

}