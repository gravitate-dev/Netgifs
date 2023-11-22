export const appConfig = {
	PORT:8080,
	GIPHY_API_KEY: '',
	// Query config
	QUERY_ARG_LIMIT:3
}

if (appConfig.GIPHY_API_KEY.length==0){
	console.error("config.js: GIPHY_API_KEY value is missing. Service will not work properly.")
}
