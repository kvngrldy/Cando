const { user, department, department_user } = require('../models')
const { checkPassword, hashPassword } = require('../helpers/bcryptjs')
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
                        let token = createToken({ id: userData.id, name: userData.name, email: userData.email, position: userData.position, imageUrl: userData.imageUrl })

                        res.status(200).json({ token, name: userData.name, email: userData.email, position: userData.position, imageUrl: userData.imageUrl })
                    }
                }
            }


        }
        catch (err) {
            next(err)
        }

    }

    static async createUser(req, res, next) {
        let { name, password, email, position, imageUrl, departmentId } = req.body
        try {
            let allDepartment = await department.findAll()
            let departmentStatus = allDepartment.filter(a => a.id == departmentId)
            if (departmentStatus.length === 0) {
                throw { msg: `Department ID Tidak Terdaftar`, status: 400 }
            }
            else {
                let newUser = await user.create({ name, password, email, position, imageUrl })

                await department_user.create({ userId: newUser.id, departmentId })
                res.status(201).json(newUser)

            }


        }
        catch (err) {
            next(err)
        }
    }
    static async deleteUser(req, res, next) {
        let { id } = req.params
        try {
            let deletedUser = await user.destroy({ where: { id } })

            if (!deletedUser) {
                throw { msg: 'User Tidak Ditemukan', status: 400 }
            }
            else {
                await department_user.destroy({ where: { userId: id } })
                res.status(200).json('Berhasil Delete User')
            }

        }
        catch (err) {
            next(err)
        }
    }

    static async addUserToDepartment(req, res, next) {
        let { userId, departmentId } = req.body
        try {
            let userStatus = await user.findOne({ where: { id: userId } })
            let departmentStatus = await department.findOne({ where: { id: departmentId } })
            if (!userStatus || !departmentStatus) {
                throw { msg: `User atau Department Tidak Terdaftar`, status: 400 }

            }
            else {
                let doubleCheck = await department_user.findOne({ where: { userId, departmentId } })

                if (doubleCheck) {
                    throw { msg: 'User Sudah Terdaftar di Department Tersebut', status: 400 }
                }
                else {
                    await department_user.create({ userId, departmentId })
                    res.status(201).json(`Berhasil add ${userStatus.name} ke Department ${departmentStatus.name}`)
                }

            }

        }
        catch (err) {
            next(err)
        }

    }

    static async removeUserFromDepartment(req, res, next) {
        let { userId, departmentId } = req.body
        try {
            let findUserDepartment = await department_user.findOne({ where: { userId, departmentId } })

            let findUser = await user.findOne({ where: { id: userId } })
            let findDepartment = await department.findOne({ where: { id: departmentId } })
            if (!findUser) throw { msg: 'User Tidak Terdaftar', status: 400 }
            if (!findDepartment) throw { msg: 'Department Tidak Terdaftar', status: 400 }
            if (!findUserDepartment) {
                throw { msg: 'User Sudah Tidak Terdaftar Di Department Ini', status: 400 }
            }
            else {
                await department_user.destroy({ where: { userId, departmentId } })
                res.status(200).json(`User ${findUser.name} berhasil di keluarkan dari department ${findDepartment.name}`)
            }
        }
        catch (err) {
            next(err)
        }

    }

}

module.exports = UserController