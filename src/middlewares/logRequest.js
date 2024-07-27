const logRequest = (req, res, next) => {
    console.log(req.method, req.path)
    next()
}

export default logRequest