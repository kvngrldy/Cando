


function errHandler(err, req, res, next) {

    switch (err.name) {
        case "JsonWebTokenError":
            let data = {
                msg: 'Token Tidak Dikenal'
            }
            res.status(500).json(data)
    }


    res.status(500).json(err)
}


module.exports = errHandler