async function promiseHandler(func) {
    try {
        const data = await func
        return [data, null]
    } catch (error) {
        console.log(error)
        return [null, error]
    }
}

module.exports.promiseHandler = promiseHandler;