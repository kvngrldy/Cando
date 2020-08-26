const request = require('supertest')
const app = require('../app')



describe('Api Controller', () => {
    test('Yo momma Api', (done) => {
        request(app)
            .get('/data/yomomma')
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