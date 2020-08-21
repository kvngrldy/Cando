const { department, category, todo, user, department_user } = require('../models')

class DataController {
    
    static async findAllDepartment(req, res, next) {

        let allDepartment = await department.findAll()
        let allUser = await user.findAll()
        res.status(200).json({ allDepartment, allUser })

    }

    static async findAllData(req, res, next) {
        let { id } = req.params
        let allData = await department.findOne({ where: { id }, include: { model: category, separate: true, order: [['id', 'asc']], include: { model: todo, separate: true, order: [["deadline", "asc"]], include: { model: user } } } })
        let allUserInDepartment = await department_user.findAll({ where: { departmentId: id }, include: { model: user } })
        let allUser = allUserInDepartment.map(data => {
            return data.user
        })
        let departmentName = allData.name
        let categories = allData.categories

        res.status(200).json({ departmentName, allUser, categories })
    }

}


module.exports = DataController