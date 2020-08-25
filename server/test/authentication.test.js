const request = require('supertest')
const app = require('../app')
const { verifyToken, createToken } = require('../helpers/jwt')
let dummyAdmin = { id: 1, name: "user 1", email: 'user1@gmail.com', position: 'admin' }
let dummyMember = { id: 200000000, name: 'user 2', email: 'user2@gmail.com', position: 'member' }
let tokenMember = createToken(dummyMember)

describe('Test Authentication', () => {
    test('Test Authentication Token Unidentified', (done) => {
        request(app)
            .get('/data/userData')
            // .set('token', tokenMember)
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
    test('Test Authentication Token Unidentified', (done) => {
        request(app)
            .get('/data/userData')
            .set('token', tokenMember)
            .expect('Content-Type', /json/)
            .expect(404)
            .expect(data => {
                expect(data.body).toBe('User tidak terdaftar dalam sistem')
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