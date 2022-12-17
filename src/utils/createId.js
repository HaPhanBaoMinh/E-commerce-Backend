const createId = (frontId) => {
    return frontId.toString() + Math.random().toString(16).slice(9)
}

module.exports = (createId)
