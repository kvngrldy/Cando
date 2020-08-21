const request = require('supertest')
const app = require('../app')
const { verifyToken, createToken } = require('../helpers/jwt')
let dummyAdmin = { id: 1, name: "user 1", email: 'user1@gmail.com', position: 'admin' }
let dummyMember = { id: 2, name: 'user 2', email: 'user2@gmail.com', position: 'member' }
let tokenAdmin = createToken(dummyAdmin)
let tokenMember = createToken(dummyMember)
let realTodoId = 1
let fakeTodoId = 10000
let createdTodoId = ''


describe('Test To Do Create', () => {
    test('To Do Create berhasil with Admin Account', (done) => {
        let dummyTodo = {
            title: "todo 14",
            deadline: "2020-05-17T01:03:10.000Z",
            priority: "low",
            description: "Di sini ada siapa ya",
            categoryId: 1,
            userId: 5
        }
        request(app)
            .post('/data/todo')
            .send(dummyTodo)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(data => {
                // createdTodoId = data.body.id
                expect(data.body.priority).toBe(dummyTodo.priority)
                expect(data.body.categoryId).toBe(dummyTodo.categoryId)
                expect(data.body.title).toBe(dummyTodo.title)
                expect(data.body.deadline).toBe(dummyTodo.deadline)
                expect(data.body.userId).toBe(dummyTodo.userId)
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


    test('To Do Create berhasil with Member Account', (done) => {
        let dummyTodo = {
            title: "todo 14",
            deadline: "2020-05-17T01:03:10.000Z",
            priority: "low",
            description: "Di sini ada siapa ya",
            categoryId: 1,
            userId: 5
        }
        request(app)
            .post('/data/todo')
            .send(dummyTodo)
            .set('token', tokenMember)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(data => {
                createdTodoId = data.body.id
                expect(data.body.title).toBe(dummyTodo.title)
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

    test('To Do Create Gagal with Admin Account Title is Empty String', (done) => {
        let dummyTodo = {
            title: '',
            deadline: "2020-05-17T01:03:10.000Z",
            priority: "low",
            description: "Di sini ada siapa ya",
            categoryId: 1,
            userId: 5
        }
        request(app)
            .post('/data/todo')
            .send(dummyTodo)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                // createdTodoId = data.body.id
                expect(data.body).toBe('Title To Do Harus di Isi')
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

    test('To Do Create Gagal with Admin Account Deadline is Empty String', (done) => {
        let dummyTodo = {
            title: 'Test Todo',
            deadline: "",
            priority: "low",
            description: "Di sini ada siapa ya",
            categoryId: 1,
            userId: 5
        }
        request(app)
            .post('/data/todo')
            .send(dummyTodo)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                // createdTodoId = data.body.id
                expect(data.body).toBe('Deadline To Do Harus di Isi')
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

    test('To Do Create Gagal with Admin Account Priority is Empty String', (done) => {
        let dummyTodo = {
            title: 'Test Todo',
            deadline: "2020-03-10",
            priority: "",
            description: "Di sini ada siapa ya",
            categoryId: 1,
            userId: 5
        }
        request(app)
            .post('/data/todo')
            .send(dummyTodo)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                // createdTodoId = data.body.id
                expect(data.body).toBe('Priority To Do Harus di Isi')
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

    test('To Do Create Gagal with Admin Account Description is Empty String', (done) => {
        let dummyTodo = {
            title: 'Test Todo',
            deadline: "2020-03-10",
            priority: "low",
            description: "",
            categoryId: 1,
            userId: 5
        }
        request(app)
            .post('/data/todo')
            .send(dummyTodo)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                // createdTodoId = data.body.id
                expect(data.body).toBe('Deskripsi To Do Harus di Isi')
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

    test('To Do Create Gagal with Admin Account Category ID is Empty String', (done) => {
        let dummyTodo = {
            title: 'Test Todo',
            deadline: "2020-03-10",
            priority: "low",
            description: "Di sini ada siapa",
            categoryId: '',
            userId: 5
        }
        request(app)
            .post('/data/todo')
            .send(dummyTodo)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                // createdTodoId = data.body.id
                expect(data.body).toBe('Category ID To Do Harus di Isi')
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

    test('To Do Create Gagal with Admin Account User ID is Empty String', (done) => {
        let dummyTodo = {
            title: 'Test Todo',
            deadline: "2020-03-10",
            priority: "low",
            description: "Di sini ada siapa",
            categoryId: 1,
            userId: ''
        }
        request(app)
            .post('/data/todo')
            .send(dummyTodo)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                // createdTodoId = data.body.id
                expect(data.body).toBe('User ID To Do Harus di Isi')
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

    test('To Do Create Gagal with Admin Account All Data is Empty String', (done) => {
        let dummyTodo = {
            title: '',
            deadline: "",
            priority: "",
            description: "",
            categoryId: "",
            userId: ''
        }
        request(app)
            .post('/data/todo')
            .send(dummyTodo)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                // createdTodoId = data.body.id
                expect(data.body).toBe("Title To Do Harus di Isi,Deadline To Do Harus di Isi,Priority To Do Harus di Isi,Deskripsi To Do Harus di Isi,Category ID To Do Harus di Isi,User ID To Do Harus di Isi")
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

describe('Test To Do Find One', () => {
    test('Test To Do Find One Sukses', (done) => {
        request(app)
            .get(`/data/todo/${createdTodoId}`)
            .set("token", tokenMember)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(data => {
                expect(data.body.id).toBe(createdTodoId)
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
    test('Test To Do Find One Gagal To Do Not Found', (done) => {
        request(app)
            .get(`/data/todo/${fakeTodoId}`)
            .set("token", tokenMember)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('To Do tidak di temukan')
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

describe('Test To Do Edit To Do', () => {
    test('Test To Do Berhasil Edit', (done) => {
        let dummyData = { title: 'babababa' }
        request(app)
            .put(`/data/todo/${createdTodoId}`)
            .set('token', tokenAdmin)
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(data => {
                expect(data.body.title).toBe(dummyData.title)
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
    test('Test To Do Gagal Edit Token Member', (done) => {
        let dummyData = { title: 'babababa' }
        request(app)
            .put(`/data/todo/${createdTodoId}`)
            .set('token', tokenMember)
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(404)
            .expect(data => {
                expect(data.body).toBe('Kamu tidak terotorisasi, hubungi Admin')
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

    test('Test To Do Gagal Edit To Do Tidak Ditemukan', (done) => {
        let dummyData = { title: 'babababa' }
        request(app)
            .put(`/data/todo/${fakeTodoId}`)
            .set('token', tokenAdmin)
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('To Do tidak di temukan')
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

describe('Test To Do Delete To Do', () => {
    test('Test Delete To Do Berhasil Admin Account', (done) => {
        request(app)
            .delete(`/data/todo/${createdTodoId}`)
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

    test('Test Delete To Do Gagal Admin Account To Do Tidak Ditemukan', (done) => {
        request(app)
            .delete(`/data/todo/${fakeTodoId}`)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Todo tidak di temukan')
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