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


describe('test Login', () => {
    test('login berhasil', (done) => {
        let dummyData = { email: 'user1@gmail.com', password: '123' }
        request(app)
            .post('/data/login')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(data => {
                let { token, name } = data.body
                let decoded = verifyToken(token)

                expect(decoded.email).toBe(dummyData.email)
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
    test('login email tidak terdaftar', (done) => {
        let dummyData = { email: 'user10@gmail.com', password: '123' }
        request(app)
            .post('/data/login')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Password atau Email Salah')
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

    test('login password salah', (done) => {
        let dummyData = { email: 'user2@gmail.com', password: '1234' }
        request(app)
            .post('/data/login')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Password atau Email Salah')
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

    test('login Email Kosong', (done) => {
        let dummyData = { password: '1234' }
        request(app)
            .post('/data/login')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Password dan Email Harus Di Isi')
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

    test('login Password Kosong', (done) => {
        let dummyData = { email: 'user2@gmail.com' }
        request(app)
            .post('/data/login')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Password dan Email Harus Di Isi')
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

describe('Test Create User', () => {
    test('Test Create User Berhasil Admin Account', (done) => {
        let dummyData = {
            departmentId: "1",
            name: "user test3123123",
            password: "123",
            email: "usertest11200@gmail.com",
            position: "member",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg"
        }
        request(app)
            .post(`/data/user`)
            .send(dummyData)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(data => {
                createdUserId = data.body.id
                expect(data.body.name).toBe(dummyData.name)
                expect(data.body.imageUrl).toBe(dummyData.imageUrl)
                expect(data.body.email).toBe(dummyData.email)
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

    test('Test Create User Gagal Email Sama dengan Admin Account', (done) => {
        let dummyData = {
            departmentId: "1",
            name: "user test3",
            password: "123",
            email: "user1@gmail.com",
            position: "member",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg"
        }
        request(app)
            .post(`/data/user`)
            .send(dummyData)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Email Sudah Terdaftar')
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

    test('Test Create User Gagal DepartmentId Tidak Ada Admin Account', (done) => {
        let dummyData = {
            departmentId: "100",
            name: "user test3",
            password: "123",
            email: "usertes123t4@gmail.com",
            position: "member",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg"
        }
        request(app)
            .post(`/data/user`)
            .send(dummyData)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Nama User Sudah Terdaftar')
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

describe('Test Add User To Department', () => {
    test('Test Add User To Department Berhasil Admin', (done) => {
        let dummyData = { userId: createdUserId, departmentId: 2 }
        request(app)
            .post('/data/user/add')
            .set('token', tokenAdmin)
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(data => {
                expect(data.body).toBe(`Berhasil add user test3123123 ke Department Bisnis`)
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

    test('Test Add User To Department Gagal Admin', (done) => {
        let dummyData = { userId: createdUserId, departmentId: fakeUserId }
        request(app)
            .post('/data/user/add')
            .set('token', tokenAdmin)
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe(`User atau Department Tidak Terdaftar`)
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

    test('Test Add User To Department Gagal Sudah Terdaftar', (done) => {
        let dummyData = { userId: createdUserId, departmentId: 1 }
        request(app)
            .post('/data/user/add')
            .set('token', tokenAdmin)
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('User Sudah Terdaftar di Department Tersebut')
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

    test('Test Add User To Department Gagal Data Tidak Lengkap', (done) => {
        let dummyData;
        request(app)
            .post('/data/user/add')
            .set('token', tokenAdmin)
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('User ID dan Department ID harus di isi')
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

describe('Test Remove User From Department', () => {
    test('Test Remove User From Department Berhasil Admin', (done) => {
        let dummyData = { userId: createdUserId, departmentId: 1 }
        request(app)
            .delete('/data/remove')
            .set('token', tokenAdmin)
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(data => {
                expect(data.body).toBe('User user test3123123 berhasil di keluarkan dari department Teknologi Informasi')
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

    test('Test Remove User From Department Gagal User Sudah tidak terdaftar Admin', (done) => {
        let dummyData = { userId: createdUserId, departmentId: 1 }
        request(app)
            .delete('/data/remove')
            .set('token', tokenAdmin)
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('User Sudah Tidak Terdaftar Di Department Ini')
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

    test('Test Remove User From Department Gagal User ID tidak di isi Admin', (done) => {
        let dummyData = { departmentId: 1 }
        request(app)
            .delete('/data/remove')
            .set('token', tokenAdmin)
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('User ID harus di isi')
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


    test('Test Remove User From Department Gagal User ID tidak di isi Admin', (done) => {
        let dummyData = { userId: createdUserId }
        request(app)
            .delete('/data/remove')
            .set('token', tokenAdmin)
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Department ID harus di isi')
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

    test('Test Remove User From Department Gagal User ID tidak terdaftar Admin', (done) => {
        let dummyData = { userId: fakeUserId, departmentId: 1 }
        request(app)
            .delete('/data/remove')
            .set('token', tokenAdmin)
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('User Tidak Terdaftar')
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

    test('Test Remove User From Department Gagal User ID tidak terdaftar Admin', (done) => {
        let dummyData = { userId: createdUserId, departmentId: 10000000 }
        request(app)
            .delete('/data/remove')
            .set('token', tokenAdmin)
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('Department Tidak Terdaftar')
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


describe('Test Delete User', () => {
    test('Test Delete User Berhasil Admin Account', (done) => {
        request(app)
            .delete(`/data/user/${createdUserId}`)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(data => {
                expect(data.body).toBe('Berhasil Delete User')
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

    test('Test Delete User Gagal UserId Tidak Ditemukan Admin Account', (done) => {
        request(app)
            .delete(`/data/user/${fakeUserId}`)
            .set('token', tokenAdmin)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(data => {
                expect(data.body).toBe('User Tidak Ditemukan')
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

describe('Test Find One User Data', () => {
    test('Test Berhasil dapat User Data', (done) => {
        request(app)
            .get('/data/userData')
            .set('token', tokenMember)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(data => {
                expect(data.body.userData.id).toBe(2)
                expect(data.body.userData.name).toBe('user 2')
                expect(data.body.userData.email).toBe('user2@gmail.com')
                expect(data.body.userData.position).toBe('member')

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