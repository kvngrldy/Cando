const request = require('supertest')
const app = require('../app')
// jest.mock('../helpers/rooms')

const createRoom = require('../helpers/rooms')

describe('test function rooms', () => {

    describe('test function', () => {
        test('function', (done) => {
            async function createRoom() {
                return await rooms
            }
            createRoom().then(_ => {
                expect(rooms.length).toBe(2)
            })
            done()
        })
    })

})




