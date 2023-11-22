import express from 'express'
import _ from 'lodash'
import { appConfig } from '../config.js'

import { search } from '../services/gifService.js'

const router = express.Router()

router.get('/', async (req, res) => {
  if (_.isNil(req.query.searchTerm)) {
    return res.status(400).json({ error: 'Missing required path argument `searchTerm`' })
  }
  if (_.isEmpty(req.query.searchTerm)) {
    return res.status(400).json({ error: 'Empty values not allowed for path argument `searchTerm`' })
  }

  const searchTerms = _.castArray(req.query.searchTerm)

  if (searchTerms.length > appConfig.QUERY_ARG_LIMIT) {
    return res.status(400).json({
      error: `Argument limit of ${appConfig.QUERY_ARG_LIMIT} exceeded, got ${searchTerms.length} for path argument \`searchTerm\``
    })
  }

  // Check for duplicates
  if (searchTerms.length !== _.uniq(searchTerms).length) {
    return res.status(400).json({ error: `Duplicate values found for path argument \`searchTerm\`` })
  }

  try {
    const searchResults = await search(searchTerms) // Assuming the search function is defined somewhere
    res.json({ data: searchResults })
  } catch (error) {
    console.error('Error in search:', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router