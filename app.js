import { appConfig } from './config.js';
import express from 'express'
import morgan from 'morgan'

import queryRouter from './routes/query.js'

const app = express()
app.use(morgan('tiny'))

app.use('/query', queryRouter)

app.listen(appConfig.PORT, () => {
  console.log(`Server is running on port ${appConfig.PORT}`)
})

// Global 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

export default app