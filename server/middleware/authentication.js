const { user } = require('../models')
const { verifyToken } = require('../helpers/jwt')


async function authentication(req, res, next) {
    let { token } = req.headers

    try {
        if (!token) {
            throw { msg: `Token tidak di temukan`, status: 400 }
        }
        else {

            let decoded = verifyToken(token)
            let statusUser = await user.findOne({ where: { id: decoded.id } })
            if (!statusUser) {
                throw { msg: `User tidak terdaftar dalam sistem`, status: 404 }
            }
            else {
                req.userData = decoded
                next()
            }

        }

    }
    catch (err) {
        next(err)
    }





}

module.exports = authentication