const { department, category, todo, user } = require('../models')

class DataController {
    static async findAllDepartment(req, res, next) {
        try {
            let allDepartment = await department.findAll()
            if (!allDepartment) {
                throw { msg: `Tidak ada department yang terdaftar`, status: 400 }
            }
            else {
                res.status(200).json(allDepartment)
            }
        }
        catch (err) {
            next(err)
        }

    }
    static async findAllData(req, res, next) {
        let { id } = req.params
        try {
            let allData = await department.findOne({ where: { id }, include: { model: category, separate: true, order: [['id', 'asc']], include: { model: todo, separate: true, order: [["deadline", "asc"]], include: { model: user } } } })
            let departmentName = allData.name
            let categories = allData.categories


            res.status(200).json({ departmentName, categories })
        }
        catch (err) {
            next(err)
        }
    }



}


module.exports = DataController