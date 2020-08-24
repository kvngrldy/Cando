const request = require('supertest')
const app = require('../app')
// jest.mock('../helpers/rooms')

const createRoom = require('../helpers/rooms')

describe('test function rooms', () => {
    it('function async', async () => {
        expect.assertions(1)
        const rooms = await createRoom()

        expect(rooms.length).toBe(1)
    })
})




