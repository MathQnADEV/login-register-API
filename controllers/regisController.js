const db = require('../config/conn')
const byCrypt = require('bcrypt')

exports.regisData = async (data) => {
        const checkData = await db.query("SELECT * FROM datUser where email = ?", [data.email])
        if (!checkData.code) {            
            // return checkData
            if (checkData.length === 0) {
                const hashedPassword = await byCrypt.hash(data.password, await byCrypt.genSalt(10))
                const dataU = {
                    email: data.email,
                    userName: data.userName,
                    password: hashedPassword    
                }
                const query = await db.query("INSERT INTO datUser set ? ", [dataU])
                if (query) {
                    return `Berhasil registrasi dengan email: ${data.email}`
                }
            }else{
                throw new Error("Email atau Username Sudah Terpakai")
            }
        }
}