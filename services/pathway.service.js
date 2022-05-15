const Pathway = require('../models/pathway.model')

class PathwayService {
    create = async (_body) => {
        console.log('Creating a course pathway for the curator')
        const body = _body
        try {
            await Pathway.create(body)
            return { message : 'Pathway added to DB'}
        } catch (err) {
            return { message : `Error occured while storing in DB ${err}`}
        }
    }

    get = async () => {
        console.log('Fetching data from Database')
        this.offset = 10
        this.queryLimit = 10

        const query = {}

        try {
            const pathway = Pathway.find(query)
            return { message : pathway}
        } catch (err) {
            return { message : `Error occured while fetching the data from the DB ${err}` }
        }
    }
}

module.exports = new PathwayService()