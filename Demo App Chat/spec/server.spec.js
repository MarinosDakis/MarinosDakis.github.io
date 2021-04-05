// code taken from: https://files3.lynda.com/secure/courses/612195/exercises/Ex_Files_Learning_Node.zip?yZWhX232cejvDJofjuSXybsoXdk13hpXCPvAafTS151dD49Dni0j7Wq7EJqQThqkT22zhZ0mjQ_RXxvdLgKCd7Oe51lX_kMiG9H-cxgcW2HUnbGfVVSdbuoOuqWfmz5MtbjO2x_dUYsqaxfnih-4Zk_VIi7cqvVomQ
var request = require('request')

describe('calc', () => {
    it('should multiply 2 and 2', () => {
        expect(2 * 2).toBe(4)
    })
})

describe('get messages', () => {
    it('should return 200 Ok', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    it('should return a list, thats not empty', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done()
        })
    })
})

describe('get messages from user', () => {
    it('should return 200 Ok', (done) => {
        request.get('http://localhost:3000/messages/tim', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    it('name should be tim', (done) => {
        request.get('http://localhost:3000/messages/tim', (err, res) => {
            expect(JSON.parse(res.body)[0].name).toEqual('tim')
            done()
        })
    })
})

