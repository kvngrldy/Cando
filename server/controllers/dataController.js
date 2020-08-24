const { department, category, todo, user, department_user } = require('../models')
const e = require('express')

class DataController {

    static async findAllDepartment(req, res, next) {

        let allDepartment = await department.findAll()
        let allUser = await user.findAll()
        res.status(200).json({ allDepartment, allUser })

    }

    static async findAllData(req, res, next) {
        let { id } = req.params
        try {

            let allData = await department.findOne({ where: { id }, include: { model: category, separate: true, order: [['id', 'asc']], include: { model: todo, separate: true, order: [["deadline", "asc"]], include: { model: user, attributes: ['name', 'email', 'position', 'imageUrl', 'id'] } } } })

            if (!allData) {
                throw { msg: `Department ini tidak terdaftar`, status: 400 }
            }
            else {

                let allUserInDepartment = await department_user.findAll({ where: { departmentId: id }, include: [{ model: user, attributes: ['name', 'email', 'position', 'imageUrl', 'id'] }] })
                let allUser = allUserInDepartment.map(data => {
                    return data.user
                })
                let allUserInCompany = await user.findAll({ attributes: ['id', 'name', 'email', 'imageUrl', 'position'], order: [['id', 'asc']] })
                let userNonDepartment = allUserInCompany.map(user => {
                    return allUser.map(u => {
                        return u.id === user.id ? true : false
                    })

                })

                userNonDepartment = userNonDepartment.map(a => {
                    return a.includes(true)
                })
                let allUserNonDepartment = []
                for (let i = 0; i < userNonDepartment.length; i++) {
                    if (userNonDepartment[i] === false) {
                        allUserNonDepartment.push(allUserInCompany[i])
                    }
                }



                let departmentName = allData.name
                let categories = allData.categories
                let allCategoryTodos = categories.map(category => {
                    return category.todos
                })
                let allTodos = []
                for (let i = 0; i < allCategoryTodos.length; i++) {
                    for (let j = 0; j < allCategoryTodos[i].length; j++) {
                        allTodos.push(allCategoryTodos[i][j])
                    }
                }

                let low = allTodos.filter(todo => todo.priority === 'low')
                let medium = allTodos.filter(todo => todo.priority === 'medium')
                let high = allTodos.filter(todo => todo.priority === 'high')
                let urgent = allTodos.filter(todo => todo.priority === 'urgent')
                allTodos = {
                    low: low.length,
                    medium: medium.length,
                    high: high.length,
                    urgent: urgent.length
                }

                // res.status(200).json(allUserNonDepartment)
                res.status(200).json({ departmentName, allUser, categories, allTodos, allUserNonDepartment })
            }



        }
        catch (err) {
            next(err)
        }

    }

}


module.exports = DataController