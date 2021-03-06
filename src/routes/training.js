const getSchema = {
  schema: {
    response: {
      200: {
        $ref: 'training-get-200.json'
      }
    }
  }
}

const postSchema = {
  schema: {
    body: {
      $ref: 'training-add-body.json'
    },
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: {
          type: 'number'
        }
      }
    }
  }
}

const routines = async function (fastify, options, next) {
  fastify.get('/', async function (req, rep) {
    const routines = await this.db.getTrainings(this.mongo.db)
    rep.code(200).send(routines)
  })

  fastify.post('/:id', postSchema, async function (req, rep) {
    const res = await this.db.addTraining(this.mongo.db, req.body)
    rep.code(200).send(res)
  })

  fastify.get('/delete', async function (req, rep) {
    const res = await this.db.dropTrainings(this.mongo.db)
    rep.code(200).send(res)
  })
  next()
}

module.exports = routines
