const { category, todo, department } = require('../models')
const e = require('express')

class CategoryController {
    static async create(req, res, next) {
        let { name, departmentId } = req.body

        try {
            if (!departmentId) throw { msg: 'Department ID Harus Di Isi', status: 400 }
            let findDepartment = await department.findOne({ where: { id: departmentId } })
            if (!findDepartment) throw { msg: 'Department Tidak Terdaftar', status: 400 }
            let newCategory = await category.create({ name, departmentId })
            res.status(201).json(newCategory)

        }
        catch (err) {
            next(err)
        }
    }

    static async findOne(req, res, next) {
        let { id } = req.params
        try {
            let findOneCategory = await category.findOne({ where: { id }, include: { model: todo, separate: true, order: [['deadline', 'desc']] } })
            if (!findOneCategory) {
                throw { msg: `Category tidak di temukan`, status: 400 }
            }
            else {
                res.status(200).json(findOneCategory)
            }
        }
        catch (err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        let { id } = req.params
        try {
            let deletedCategory = await category.destroy({ where: { id } })
            if (!deletedCategory) {
                throw { msg: `Category tidak di temukan`, status: 400 }
            }
            else {
                res.status(200).json('Berhasil Delete')
            }

        }
        catch (err) {
            next(err)
        }
    }
    static async edit(req, res, next) {
        let { id } = req.params
        let { name, departmentId } = req.body
        try {
            let findOneCategory = await category.findOne({ where: { id } })
            if (!findOneCategory) {
                throw { msg: `Category tidak di temukan`, status: 400 }
            }
            else {
                await category.update({ name, departmentId }, { where: { id } })
                let newCategoryData = await category.findOne({ where: { id } })
                res.status(200).json(newCategoryData)
            }



        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = CategoryController