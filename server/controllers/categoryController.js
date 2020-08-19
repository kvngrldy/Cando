const { category } = require('../models')
const e = require('express')

class CategoryController {
    static async create(req, res, next) {
        let { name, departmentId } = req.body
        let newCategory = await category.create({ name, departmentId })
        try {
            if (!newCategory) {
                throw { msg: `Tidak dapat create Category`, status: 400 }
            }
            else {
                res.status(201).json(newCategory)
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
                throw { msg: `Tidak berhasil delete`, status: 400 }
            }
            else {
                res.status(200).json('berhasil delete')
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
            let editedCategory = await category.update({ name, departmentId }, { where: { id } })
            if (!editedCategory) {
                throw { msg: `Category tidak di temukan`, status: 400 }
            }
            else {
                let editedDataCategory = await category.findOne({ where: { id } })
                res.status(200).json(editedDataCategory)
            }
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = CategoryController