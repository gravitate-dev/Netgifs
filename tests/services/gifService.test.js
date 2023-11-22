// Search Unit tests

import { expect } from 'chai'
import { search } from '../../services/gifService.js'

describe('Search Function', () => {
  it('should return search results', async () => {
    const result = await search(['cat'])

    const data = result.data
    expect(data).to.be.an('array')
    expect(data).to.have.lengthOf(1) // One result

    const firstResult = data[0]
    expect(firstResult).to.have.property('search_term').equal('cat')
    expect(firstResult).to.have.property('gifs').that.is.an('array')
    expect(firstResult.gifs).to.have.lengthOf.at.least(1)  // Ensure there is at least one gif
  })
})