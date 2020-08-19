const { todo, category_todo, department_category, category } = require('../models')

class TodoController {

    static async findOne(req, res, next) {
        let { id } = req.params
        try {
            let todoFindOne = await todo.findOne({ where: { id } })
            if (!todoFindOne) {
                throw { msg: `To Do tidak di temukan`, status: 400 }
            }
            else {
                res.status(400).json(todoFindOne)
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
            if (!addData) {
                throw { msg: `Tidak berhasil add To Do`, status: 400 }
            }
            else {
                res.status(201).json(addData)
            }

        }
        catch (err) {
            next(err)
        }
    }
    static async editTodo(req, res, next) {
        let { title, deadline, priority, description, categoryId, userId } = req.body
        let { id } = req.params

        try {
            let editedTodo = await todo.update({ title, deadline, priority, description, categoryId, userId }, { where: { id } })
            if (!editedTodo) {
                throw { msg: `Tidak berhasil edit`, status: 400 }
            }
            else {
                let newEditedData = await todo.findOne({ where: { id } })
                res.status(200).json(newEditedData)
            }
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
                res.status(200).json('berhasil delete')
                // res.send('123')
            }
        }
        catch (err) {
            next(err)
        }
    }

}

module.exports = TodoController