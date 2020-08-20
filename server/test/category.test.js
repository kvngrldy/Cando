const request = require('supertest')
const app = require('../app')
const { verifyToken, createToken } = require('../helpers/jwt')
let dummyAdmin = { id: 1, name: "user 1", email: 'user1@gmail.com', position: 'admin' }
let dummyMember = { id: 2, name: 'user 2', email: 'user2@gmail.com', position: 'member' }
let tokenAdmin = createToken(dummyAdmin)
let tokenMember = createToken(dummyMember)
let realCategoryId = 1
let fakeCategoryId = 10000
let createdCategoryId = ''


describe('Test Category Create', () => {
    test('Category Create berhasil with Admin Account', (done) => {
        let dummyCategory = { name: 'Test Category', departmentId: 1 }
        request(app)
            .post('/data/category')
            .send(dummyCategory)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(data => {
                createdCategoryId = data.body.id
                expect(data.body.name).toBe(dummyCategory.name)
                expect(data.body.departmentId).toBe(dummyCategory.departmentId)
            })
            .end(err => {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }

            })
    })

    test('Category Create gagal with Member Account', (done) => {
        let dummyCategory = { name: 'Test Category', departmentId: 1 }
        request(app)
            .post('/data/category')
            .send(dummyCategory)
            .set('token', tokenMember)
            .expect('Content-Type', /json/)
            .expect(404)
            .expect(data => {
                expect(data.body).toBe("Kamu tidak terotorisasi untuk ini, hubungi Admin")
            })
            .end(err => {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }

            })
    })

    test('Category Create with Admin Account Name tidak di isi', (done) => {
        let dummyCategory = { departmentId: 1 }
        request(app)
            .post('/data/category')
            .send(dummyCategory)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Nama Category Harus Di Isi')
            })
            .end(err => {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }

            })
    })

    test('Category Create with Admin Account DepartmentId tidak di isi', (done) => {
        let dummyCategory = { name: 'Test Category' }
        request(app)
            .post('/data/category')
            .send(dummyCategory)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Department ID Harus Di Isi')
            })
            .end(err => {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }

            })
    })

    test('Category Create with Admin Account DepartmentId dan Name tidak di isi', (done) => {
        request(app)
            .post('/data/category')
            // .send(dummyCategory)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Nama Category Harus Di Isi,Department ID Harus Di Isi')
            })
            .end(err => {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }

            })
    })


})

describe('Test Category FindOne', () => {
    test('Test Find One dengan Admin', (done) => {
        request(app)
            .get(`/data/category/${realCategoryId}`)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(data => {
                expect(data.body.id).toBe(realCategoryId)
            })
            .end(err => {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }

            })
    })
    test('Test Find One dengan Member', (done) => {
        request(app)
            .get(`/data/category/${realCategoryId}`)
            .set('token', tokenMember)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(data => {
                expect(data.body.id).toBe(realCategoryId)
            })
            .end(err => {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }

            })
    })

    test('Test Find One tanpa token', (done) => {
        request(app)
            .get(`/data/category/${realCategoryId}`)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Token tidak di temukan')
            })
            .end(err => {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }

            })
    })

    test('Test Find One But Category does not exist', (done) => {
        request(app)
            .get(`/data/category/${fakeCategoryId}`)
            .set('token', tokenMember)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Category tidak di temukan')
            })
            .end(err => {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }

            })
    })
})

describe('Test Category Delete', () => {
    test('Test Category Delete Berhasil dengan Admin Account', (done) => {
        request(app)
            .delete(`/data/category/${createdCategoryId}`)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(data => {
                expect(data.body).toBe('Berhasil Delete')
            })
            .end(err => {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }

            })

    })

    test('Test Category Delete Gagal dengan Member Account', (done) => {
        request(app)
            .delete(`/data/category/1`)
            .set('token', tokenMember)
            .expect('Content-Type', /json/)
            .expect(404)
            .expect(data => {
                expect(data.body).toBe('Kamu tidak terotorisasi untuk ini, hubungi Admin')
            })
            .end(err => {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }

            })

    })
    test('Test Category Delete Gagal dengan Admin Account Category Not Found', (done) => {
        request(app)
            .delete(`/data/category/${createdCategoryId}`)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Tidak Berhasil Delete')
            })
            .end(err => {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }

            })

    })

})

describe('Test Category Edit', () => {
    test('Test Category Edit Berhasil dengan Admin Account', (done) => {
        let dummyData = { name: 'this is how i lived now', departmentId: 1 }
        request(app)
            .put(`/data/category/1`)
            .send(dummyData)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(data => {
                expect(data.body.name).toBe(dummyData.name)
                expect(data.body.departmentId).toBe(dummyData.departmentId)
            })
            .end(err => {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }
            })
    })

    test('Test Category Edit Gagal dengan Member Account', (done) => {
        let dummyData = { name: 'this is how i lived now', departmentId: 1 }
        request(app)
            .put(`/data/category/1`)
            .send(dummyData)
            .set('token', tokenMember)
            .expect('Content-Type', /json/)
            .expect(404)
            .expect(data => {
                expect(data.body).toBe('Kamu tidak terotorisasi untuk ini, hubungi Admin')
            })
            .end(err => {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }
            })
    })

    test('Test Category Edit Gagal dengan Admin Account Category not Found', (done) => {
        let dummyData = { name: 'this is how i lived now', departmentId: 1 }
        request(app)
            .put(`/data/category/${fakeCategoryId}`)
            .send(dummyData)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Category tidak di temukan')
            })
            .end(err => {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }
            })
    })

    test('Test Category Edit Gagal dengan Admin Account Name Empty String', (done) => {
        let dummyData = { name: '', departmentId: 1 }
        request(app)
            .put(`/data/category/1`)
            .send(dummyData)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Nama Category Harus Di Isi')
            })
            .end(err => {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }
            })
    })
    test('Test Category Edit Gagal dengan Admin Account DepartmentID Empty String', (done) => {
        let dummyData = { name: 'this is my life now', departmentId:'' }
        request(app)
            .put(`/data/category/1`)
            .send(dummyData)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Department ID Harus Di Isi')
            })
            .end(err => {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }
            })
    })

    test('Test Category Edit Gagal dengan Admin Account Name dan  DepartmentID Empty String', (done) => {
        let dummyData = { name: '', departmentId:'' }
        request(app)
            .put(`/data/category/1`)
            .send(dummyData)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Nama Category Harus Di Isi,Department ID Harus Di Isi')
            })
            .end(err => {
                if (err) {
                    done(err)
                }
                else {
                    done()
                }
            })
    })
    

})