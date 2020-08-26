const { request } = require("express");

const fs = require('fs')






class ApiController {

    static async yoMomma(req, res, next) {
        

        let jokes = fs.readFileSync('jokes.txt').toString().split("\n");
        res.status(200).json({ joke: jokes[Math.floor(Math.random() * jokes.length)] });

    }


}

module.exports = ApiController