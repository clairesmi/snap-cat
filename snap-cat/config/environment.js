const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/snap-cat'
const port = process.env.PORT || 4000
const secret = process.env.SECRET || 'secret'

module.exports = { dbURI, port, secret }