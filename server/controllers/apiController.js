const { request } = require("express");

const fs = require('fs')



let jokes = fs.readFileSync('../jokes.txt').toString().split("\n");


