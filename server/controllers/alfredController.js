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
                private_key: `-----BEGIN PRIVATE KEY-----\nM${process.env.PRIVATE_KEY11}k\n3${process.env.PRIVATE_KEY12}i/U${process.env.PRIVATE_KEY13}sx\nr${process.env.PRIVATE_KEY14}0r+HwegiKC16\nTFSsQO/t70+p${process.env.PRIVATE_KEY6}s\nxnezjosSQ0mMiKEExb0VP1T6ry+lc${process.env.PRIVATE_KEY15}ad\n1${process.env.PRIVATE_KEY16}z+qFCLduMyuHNX8DTP5ZO5DS\nI${process.env.PRIVATE_KEY5}c/rsDYk2SI8Q/${process.env.PRIVATE_KEY17}X+r\nfjCqWuMUcZUy+${process.env.PRIVATE_KEY8}+/Rl4XDyHE8gELmh14zjq\nLYat6xScYjng/N2PXMER6upw4y+M${process.env.PRIVATE_KEY9}8\noHv45lmdnzLT8+6${process.env.PRIVATE_KEY10}1r\nHI4I2P+be0VV4/${process.env.PRIVATE_KEY7}/7tdl\nqbj25u/HcA/OS4mAP${process.env.PRIVATE_KEY18}CW\neHLzVhBtd1CtL+Thb0C/qMn79qfP+knefvx1+RaqI3HZI9fgrk1s02IgN4GfJ2ol\n${process.env.PRIVATE_KEY3}K\n${process.env.PRIVATE_KEY4}+G2loAa1dw1XqYb3RP9+H\nM+3W${process.env.PRIVATE_KEY19}Kct+Pl\nLMLxny9Xfm/eWw2u7P0+kj6yobJL5IFW+S${process.env.PRIVATE_KEY20}F+ULJMdHEizWxTT\n${process.env.PRIVATE_KEY21}u+lXjQYjEn1By0b2X7LwhePGjnfluFY2ZVbGIEr14d\nm9${process.env.PRIVATE_KEY22}P\n8f${process.env.PRIVATE_KEY23}6o/4af${process.env.PRIVATE_KEY24}h\nac${process.env.PRIVATE_KEY25}+4PcVCMX6DNDmf6Z3WzHR7y+32Dc+k3n9y6KNfWTIyia\nm${process.env.PRIVATE_KEY26}yz/U${process.env.PRIVATE_KEY27}AR8+2\nfL6knso2+6jt${process.env.PRIVATE_KEY28}UF\nKZ${process.env.PRIVATE_KEY29}gy/${process.env.PRIVATE_KEY2}/U\nu59qdzHUx6kuU/AZVld+svif+0r79oMY0NaR6/yv3ZYQg/1${process.env.PRIVATE_KEY30}Y\nh+${process.env.PRIVATE_KEY1}=\n-----END PRIVATE KEY-----\n`,
                client_email: "finalproject@hehe-uqux.iam.gserviceaccount.com"
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
                console.log(response, `<<<<<<<<<<<<<<<,`)
                console.log(response[0].queryResult, `<<<<<<<<<<<<<<<<<<<<<`)
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