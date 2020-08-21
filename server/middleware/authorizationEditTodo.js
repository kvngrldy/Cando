const { todo } = require('../models')

async function authorizationEditTodo(req, res, next) {
    let todoId = req.params.id
    let { id, name, position, email } = req.userData

    try {

        let findTodo = await todo.findOne({ where: { id: todoId } })

        if (!findTodo) {
            throw { msg: `To Do tidak di temukan`, status: 400 }
        }
        else {
            if (findTodo.userId === id || position === "admin") {
                next()
            }
            else {
                throw { msg: `Kamu tidak terotorisasi, hubungi Admin`, status: 404 }
            }
        }
    }
    catch (err) {
        next(err)
    }


}


module.exports = authorizationEditTodo