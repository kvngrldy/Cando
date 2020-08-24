const dialogflow = require('dialogflow');
const uuid = require('uuid');
const express = require('express')
const app = express()
const cors = require('cors');


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.post('/', (req, res) => {
    console.log('MASUKKKKKKK')
    const sessionId = uuid.v4();
    
     const msg = req.body.msg
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: "D:/Hacktiv8/PHASE-3/FINALLLLLL/hehe-uqux-6ba521fa281b.json"
    });

    const sessionPath = sessionClient.sessionPath('hehe-uqux', sessionId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
               // text: 'assign kevin untuk deploy heroku deadline 1 hari',
               text: msg,
                // The language used by the client (en-US)
                languageCode: 'en-US',
            },
        },
    };
    
    sessionClient.detectIntent(request)
        .then(response => {
            console.log(response, 'masuk detecintent <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
            const result = response[0].queryResult;
            //console.log(response.queryResult.fulfillmentText, `<<<<`)

            res.status(200).json({response: `${response[0].queryResult.fulfillmentText}`})
        })
        .catch(err => {
            console.log('masuk err', err)
        })
        .finally(() => {
            console.log('masuk finally')
        })
})

app.get('/', (req, res) => {
    res.status(200).json({msg: 'hi'})
})

app.listen(3003, () => console.log(`app listen at port 3003`))


