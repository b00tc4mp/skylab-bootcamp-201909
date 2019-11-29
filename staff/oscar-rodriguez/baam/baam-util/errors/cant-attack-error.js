module.exports = class CantAttackError extends Error {
    constructor(message) {
        super(message)

        Error.captureStackTrace(this, NotFoundError)

        this.name = NotFoundError.name
    }
}