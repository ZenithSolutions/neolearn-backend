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
            const pathway = await Pathway.find(query)
            return { message : pathway}
        } catch (err) {
            return { message : `Error occured while fetching the data from the DB ${err}` }
        }
    }

    addContent = async (id, body) => {
        const pathwayID = id
        try{
            await Pathway.findByIdAndUpdate(
                pathwayID,
                {$addToSet: {courses: body}},
                async (err, result) => {
                    if (err) return err
                    return { message: `${result} the course has been added` }
                } 
            )
        } catch(err) {
            return { message : `Error occured while updating the pathway ${err}` }
        }
    }

    getPathByID = async (id) => {
        const pathwayID = id
        try {
            const content = await Pathway.findById(id)
            return { message : `Pathway ${content}`}
        } catch(err) {
            return { message : `Error occured while fetching path ${err}` }
        }
    }
}

module.exports = new PathwayService()