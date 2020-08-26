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


describe('test Alfred Controller', () => {
    test('Alfred Create To Do lusa', (done) => {
        let dummyData = {
            title: 'create Todo', deadline: 'lusa', priority: 'low', description: 'TBA', userName: 'user 1', departmentName: 'Bisnis'
        }
        request(app)
            .post('/data/alfred')
            .send(dummyData)
            .expect('Content-Type', /json/)
            .expect(201)
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








})