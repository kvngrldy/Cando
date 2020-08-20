


function errHandler(err, req, res, next) {

    switch (err.name) {
        case "JsonWebTokenError":
            
            let msg ='Token Tidak Dikenal'
            
            res.status(400).json(msg)

        case "SequelizeValidationError":
            let errors = err.errors.map(err=>{
                return err.message
            })
            let tampilan = errors.join(',')
            res.status(400).json(tampilan)

        default:
            if(err.status === undefined){
                err.status = 500
            }
            if(err.msg === undefined){
                err.msg = 'Internal Server Error'
            }
            res.status(err.status).json(err.msg)
    }



}


module.exports = errHandler