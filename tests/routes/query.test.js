// Integration Test for routes/query.js

import supertest from 'supertest'
import { expect } from 'chai'
import app from '../../app.js'
import {appConfig} from '../../config.js'

const request = supertest(app)

describe('Query Route', () => {
  it('GET /query should return search results', async () => {
    const response = await request.get('/query?searchTerm=cat')
    
    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('data')
    // Add more assertions based on the expected behavior of your endpoint
  })

  it('GET /query with empty searchTerm should return a 400 error', async () => {
    const response = await request.get('/query?searchTerm=')

    expect(response.status).to.equal(400)
    expect(response.body).to.have.property('error').that.includes('Empty values not allowed')
  })

  it('GET /query with duplicate searchTerm should return a 400 error', async () => {
    const response = await request.get('/query?searchTerm=a&searchTerm=a')

    expect(response.status).to.equal(400)
    expect(response.body).to.have.property('error').that.includes('Duplicate values found')
  })

  it('GET /query with more than 3 searchTerms should return a 400 error', async () => {
  	let queryArg = ""
  	for (let i =0; i <= appConfig.QUERY_ARG_LIMIT;i++){
  		queryArg += (i==0 ? '?' : '&') + 'searchTerm='+i
  	}
    const response = await request.get(`/query${queryArg}`)

    expect(response.status).to.equal(400)
    expect(response.body).to.have.property('error').that.includes('Argument limit')
  })

  it('GET /query missing searchTerms field should return a 400 error', async () => {  	
    const response = await request.get(`/query`)

    expect(response.status).to.equal(400)
    expect(response.body).to.have.property('error').that.includes('Missing required path argument `searchTerm`')
  })
})