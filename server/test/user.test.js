const request = require('supertest')
const app = require('../app')
const { verifyToken } = require('../helpers/jwt')


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
        let dummyData = { email: 'user2@gmail.com'}
        request(app)
        .post('/data/login')
        .send(dummyData)
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(data=>{
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