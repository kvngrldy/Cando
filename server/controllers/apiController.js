const { request } = require("express");

const fs = require('fs')






class ApiController {

    static async yoMomma(req, res, next) {
        let jokes = fs.readFileSync('../jokes.txt').toString().split("\n");
        
    }


}

module.exports = ApiController