const dataRoute = require("../routes/dataRoute");
const { department, user, todo, category } = require('../models')
const dialogflow = require('dialogflow');
const uuid = require('uuid');



class AlfredController {
    static async createTodo(req, res, next) {
        let { title, deadline, priority, description, userName, departmentName } = req.body;
        try {
            if (deadline.toString().toLowerCase() === "besok") {
                deadline = 1
            }
            else if (deadline.toString().toLowerCase() === "lusa") {
                deadline = 2
            }
            else if (deadline.toString().toLowerCase() === "minggu depan") {
                deadline = 7
            }
            else {
                deadline = deadline
            }
            if (!userName || !departmentName) throw { msg: 'User Name dan Department Name Harus di Isi', status: 400 }

            let userData = await user.findOne({ where: { name: userName } })
            if (!userData) throw { msg: `User Name Tidak Terregister`, status: 400 }
            let userId = userData.id

            let departmentData = await department.findOne({ where: { name: departmentName } })
            if (!departmentData) throw { msg: 'Department Name Tidak Terdaftar' }
            let departmentId = departmentData.id
            let categoryList = await department.findOne({ where: { id: departmentId }, include: { model: category, separate: true, order: [['id', 'asc']] } })
            categoryList = categoryList.categories

            categoryList = categoryList.map(a => a.id)
            let categoryId = categoryList[0]

            let today = new Date()


            today = Date.parse(today) + (1000 * 60 * 60 * 24 * deadline) + (60 * 60 * 1000 * 7)
            deadline = new Date(today)

            let newTodo = await todo.create({
                title,
                deadline,
                priority,
                description,
                categoryId,
                userId
            })
            if (newTodo) {
                res.status(200).json(newTodo)
            }
            else {
                throw { msg: `Tidak Bisa Create Todo`, status: 400 }
            }
        }
        catch (err) {
            next()
        }

    }

    static getMsg(req, res, next) {
        const sessionId = uuid.v4();
        const msg = req.body.msg
        
        const sessionClient = new dialogflow.SessionsClient({
            credentials: {
                private_key:process.env.private_key,
                client_email:process.env.client_email
              }
        });
       
        const sessionPath = sessionClient.sessionPath('hehe-uqux', sessionId);
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: msg,
                    languageCode: 'en-US',
                },
            },
        };

        sessionClient.detectIntent(request)
            .then(response => {
                const result = response[0].queryResult;
                res.status(200).json({ response: `${response[0].queryResult.fulfillmentText}` })
            })
            .catch(err => {
                console.log('masuk err', err)
            })
            .finally(() => {
                console.log('masuk finally')
            })
    }
}

module.exports = AlfredController