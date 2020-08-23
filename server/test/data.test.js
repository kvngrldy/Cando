const request = require('supertest')
const app = require('../app')
const { verifyToken, createToken } = require('../helpers/jwt')
let dummyAdmin = { id: 1, name: "user 1", email: 'user1@gmail.com', position: 'admin' }
let dummyMember = { id: 2, name: 'user 2', email: 'user2@gmail.com', position: 'member' }
let dummyMember2 = { id: 5, name: 'user 5', email: 'user5@gmail.com', position: 'member' }
let tokenAdmin = createToken(dummyAdmin)
let tokenMember = createToken(dummyMember)
let tokenMember2 = createToken(dummyMember2)
let tokenSembarang = '123123jsdjasjadjsakd223123123'
let realCategoryId = 1
let fakeCategoryId = 10000
let createdCategoryId = ''


describe('Test Find All Department', () => {
    test('Find All Department berhasil without any Token', (done) => {
        request(app)
            .get('/data')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(data => {
                expect(data.body).toBeTruthy()
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

    test('Find One Department Berhasil with Registered Token in That Department', (done) => {
        request(app)
            .get('/data/1')
            .set('token', tokenMember)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(data => {
                expect(data.body).toBeTruthy()
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

    test('Find One Department Gagal with UnRegistered Token in That Department', (done) => {
        request(app)
            .get('/data/1')
            .set('token', tokenMember2)
            .expect('Content-Type', /json/)
            .expect(404)
            .expect(data => {
                expect(data.body).toBe('Not Authorized in this Department')
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

    test('Find One Department Gagal with Random Token Generated', (done) => {
        request(app)
            .get('/data/1')
            .set('token', tokenSembarang)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Token Tidak Dikenal')
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

    test('Find One Department Gagal because Unregistered Department', (done) => {
        request(app)
            .get('/data/11111')
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Department ini tidak terdaftar')
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
