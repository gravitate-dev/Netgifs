# Instructions

## Build and Run

1. Install dependencies:
```bash
npm install
```
2. Define the config.js/appConfig.GIPHY_API_KEY  value
3. npm start

## Testing
1. Run tests
```bash
npm test
```

## Functions
### Run a single searche
1. http://localhost:8080/query?searchTerm=bear

### Run multiple searches
1. http://localhost:8080/query?searchTerm=bear&searchTerm=cat


# Requirement 3: Production Improvements

To make the service production ready, use the following improvements:

1. Clarify with the team on /query for default limit and type:sticker

2. Testing: Add Invalid API KEY tests, expired API Key tests. Current, integration tests would already fail but should also have negative test cases for end-to-end.

3. Logging: Add log rotation and write to file to make monitoring/debugging easier in production.

4. Error Handling: Enhance error handling to provide meaningful responses and log errors appropriately.

5. Environment Variables: Use environment variables for secret values such as the Giphy API key instead of hardcoding them.

6. Rate Limiting: Implement rate limiting to prevent abuse and ensure fair usage.

7. Caching: Reduce usage on the Giphy API which can also improve response time. Might be costlier to maintain cache so it is important to do cost analysis vs api usage.

8. Documentation: Provide a formal API documentation that has request/response payloads, error codes, url params, headers.

9. Scaling: Since this only runs on one instance, we can introduce a loadbalancer to have multiple instances of this application to scale horizontally once we exceeded our bandwidth on network traffic.

10. Monitoring: Set up monitoring tools specifically for network usage. Also add alerts and perhaps integrate auto-scaling to handle peak hours and scale down during off-hours.

11. Knowledge Transfer: Make sure that more than one engineer knows how the system works. Create a slide deck for a highlevel architecture.