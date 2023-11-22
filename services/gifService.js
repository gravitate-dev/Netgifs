import { appConfig } from '../config.js'

import _ from 'lodash'
import { GiphyFetch } from '@giphy/js-fetch-api'
const giphyFetch = new GiphyFetch(appConfig.GIPHY_API_KEY)

export async function search(searchTerms) {
	try {
		const promises = searchTerms.map(searchTerm => fetchData(searchTerm))
		const results = await Promise.all(promises)

		return {data:results}
	} catch (error) {
		console.error('Error fetching GIFs:', error)
		throw error
	}
}

async function fetchData(searchTerm) {
	try {
		// TODO: Note sort,limit,type are not defined from the intial requirements doc. 
		const {data:data} = await giphyFetch.search(searchTerm, { sort: 'relevant', limit: 10, type: 'stickers' })

		const gifs = _.map(data,d=>({
			gif_id:d.id,
			url:d.url
		}))
		return { search_term: searchTerm, gifs }
	} catch (error) {
		console.error(`Error fetching GIFs for ${searchTerm}:`, error)
		throw new Error(`Error fetching GIFs for ${searchTerm}`)
	}
}