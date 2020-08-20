const { user } = require('../models')
const { checkPassword } = require('../helpers/bcryptjs')
const { createToken } = require('../helpers/jwt')



class UserController {
    static async login(req, res, next) {
        let { email, password } = req.body
        try {
            if (!email || !password) {
                throw { msg: 'Password dan Email Harus Di Isi', status: 400 }
            }
            else {


                let userData = await user.findOne({ where: { email } })
                if (!userData) {
                    throw { msg: `Password atau Email Salah`, status: 400 }
                }
                else {

                    if (!checkPassword(password, userData.password)) {
                        throw { msg: `Password atau Email Salah`, status: 400 }
                    }
                    else {
                        let token = createToken({ id: userData.id, name: userData.name, email: userData.email, position: userData.position })

                        res.status(200).json({ token, name: userData.name })
                    }
                }
            }


        }
        catch (err) {
            next(err)
        }

    }
}

module.exports = UserController