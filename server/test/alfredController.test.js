const request = require('supertest')
const app = require('../app')
const { verifyToken, createToken } = require('../helpers/jwt')
const e = require('express')
let dummyAdmin = { id: 4, name: "user 4", email: 'user4@gmail.com', position: 'admin' }
let dummyMember = { id: 2, name: 'user 2', email: 'user2@gmail.com', position: 'member' }
let tokenAdmin = createToken(dummyAdmin)
let tokenMember = createToken(dummyMember)
let realUserId = 1
let fakeUserId = 10000
let createdUserId;
let createdTodoData;


describe('test Alfred Controller', () => {
    test('Alfred Create To Do lusa', (done) => {
        let dummyData = {
            title: "Buatan Alfred",
            deadline: "lusa",
            priority: "low",
            description: "Di sini ada siapa ya",
            departmentName: "Teknologi Informasi",
            userName: "user 1"
        }
        request(app)
            .post('/data/alfred')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(data => {
                createdTodoData = {
                    id: data.body[0].id,
                    title: data.body[0].title
                }
                expect(data.body[0].title).toBe(dummyData.title)
                expect(data.body[0].priority).toBe(dummyData.priority)
                expect(data.body[0].description).toBe(dummyData.description)

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

    test('Alfred Create To Do besok', (done) => {
        let dummyData = {
            title: 'create Todo', deadline: 'besok', priority: 'low', description: 'TBA', userName: 'user 1', departmentName: 'Bisnis'
        }
        request(app)
            .post('/data/alfred')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(data => {
                expect(data.body[0].title).toBe(dummyData.title)
                expect(data.body[0].priority).toBe(dummyData.priority)
                expect(data.body[0].description).toBe(dummyData.description)
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


    test('Alfred Create To Do minggu depan', (done) => {
        let dummyData = {
            title: 'create Todo', deadline: 'minggu depan', priority: 'low', description: 'TBA', userName: 'user 1', departmentName: 'Bisnis'
        }
        request(app)
            .post('/data/alfred')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(data => {
                expect(data.body[0].title).toBe(dummyData.title)
                expect(data.body[0].priority).toBe(dummyData.priority)
                expect(data.body[0].description).toBe(dummyData.description)
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

    test('Alfred Create To Do hari', (done) => {
        let dummyData = {
            title: 'create Todo', deadline: 5, priority: 'low', description: 'TBA', userName: 'user 1', departmentName: 'Bisnis'
        }
        request(app)
            .post('/data/alfred')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(data => {
                expect(data.body[0].title).toBe(dummyData.title)
                expect(data.body[0].priority).toBe(dummyData.priority)
                expect(data.body[0].description).toBe(dummyData.description)
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


    test('Alfred Gagal Create Todo', (done) => {
        let dummyData = {
            title: 'create Todo', deadline: 5, priority: 'low', description: 'TBD', userName: '', departmentName: 'Bisnis'
        }
        request(app)
            .post('/data/alfred')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe(`User Name dan Department Name Harus di Isi`)
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


    test('Alfred Send Msg', (done) => {
        let dummyData = {
            msg: '@alfred assign user 1 untuk perbaiki dari alfred deadline besok prioritas low'
        }
        request(app)
            .post('/data/alfredatyourservice')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(data => {
                expect(data.body).toBeInstanceOf(Object)
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

    test('Alfred Minta List Task', (done) => {
        let dummyData = {
            departmentName: 'Bisnis'
        }
        request(app)
            .post('/data/alfredfetchtodo')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(data => {
                expect(data.body).toBeInstanceOf(Array)
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

    test('Alfred Delete To Do', (done) => {
        let dummyData = {
            departmentName: 'Bisnis',
            todoId: createdTodoData.id
        }
        request(app)
            .delete('/data/alfreddeletetodo')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(data => {
                expect(data.body[0].msg).toBe(`${createdTodoData.title}`)
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

    test('Alfred Edit To Do', (done) => {
        let dummyData = {
            departmentName: 'Bisnis',
            todoId: createdTodoData.id,
            categoryName: 'Launch'
        }
        request(app)
            .put('/data/alfrededittodocategory')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(data => {
                expect(data.req.method).toBe('PUT')
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

    test('Alfred Edit To Do Gagal', (done) => {
        let dummyData = {
            departmentName: 'Bisnis',
            todoId: createdTodoData.id,
            categoryName: 'Launchasdasdwqeqwe'
        }
        request(app)
            .put('/data/alfrededittodocategory')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe(`Category tidak di temukan`)
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

    test('Alfred Edit To Do Priority', (done) => {
        let dummyData = {
            departmentName: 'Bisnis',
            todoId: 1,
            priority: 'low'
        }
        request(app)
            .put('/data/alfrededittodopriority')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(data => {
                expect(data.req.method).toBe(`PUT`)
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

    test('Alfred Edit To Do Priority Gagal', (done) => {
        let dummyData = {
            departmentName: 'Bisnis',
            todoId: 10000000000000000,
            priority: 'low'
        }
        request(app)
            .put('/data/alfrededittodopriority')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe(`Todo tidak ditemukan`)
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

    test('Alfred Edit To Do Priority Gagal', (done) => {
        let dummyData = {
            departmentName: 'Bisnis',
            todoId: createdTodoData.id,
            priority: 'laasdad'
        }
        request(app)
            .put('/data/alfrededittodopriority')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe(`Priority Tidak Terdaftar`)
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




    test('Alfred Delete To Do', (done) => {
        let dummyData = {
            departmentName: 'Bisnis',
            todoId: 1000000000
        }
        request(app)
            .delete('/data/alfreddeletetodo')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe(`Todo Tidak Ditemukan`)
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