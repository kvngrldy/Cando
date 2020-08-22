const { todo, category_todo, department_category, category, user } = require('../models')

class TodoController {

    static async findOne(req, res, next) {
        let { id } = req.params
        try {
            let todoFindOne = await todo.findOne({ where: { id } })
            if (!todoFindOne) {
                throw { msg: `To Do tidak di temukan`, status: 400 }
            }
            else {
                res.status(200).json(todoFindOne)
            }
        }
        catch (err) {
            next(err)
        }
    }

    static async createTodo(req, res, next) {
        let { title, deadline, priority, description, categoryId, userId } = req.body

        try {
            let addData = await todo.create({ title, deadline, priority, description, categoryId, userId })
            res.status(201).json(addData)


        }
        catch (err) {
            next(err)
        }
    }
    static async editTodo(req, res, next) {
        let { title, deadline, priority, description, categoryId, userId } = req.body
        let { id } = req.params
        try {
            if (!userId) throw { msg: `User ID harus di isi`, status: 400 }
            let findUser = await user.findOne({ where: { id: userId } })
            if (!findUser) throw { msg: `User tidak terdaftar`, status: 400 }
            let findCategory = await category.findOne({ where: { id: categoryId } })
            if (!findCategory) throw { msg: `Category tidak terdaftar`, status: 400 }
            let editedTodo = await todo.update({ title, deadline, priority, description, categoryId, userId }, { where: { id } })
            let newEditedData = await todo.findOne({ where: { id } })
            res.status(200).json(newEditedData)


        }
        catch (err) {
            next(err)
        }
    }

    static async deleteTodo(req, res, next) {
        let { id } = req.params
        try {
            let deletedId = await todo.destroy({ where: { id } })

            if (!deletedId) {
                throw { msg: `Todo tidak di temukan`, status: 400 }
            }
            else {
                res.status(200).json('Berhasil Delete')

            }
        }
        catch (err) {
            next(err)
        }
    }

}

module.exports = TodoController