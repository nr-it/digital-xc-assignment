const express = require('express');
const santaRoutes = require('./routes/santa.route');
const logger = require('./utils/logger.utils');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', santaRoutes);

app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ error: err.message });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      logger.error('Invalid JSON input');
      return res.status(400).json({ error: 'Invalid JSON input' });
  }
  next();
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => logger.info(`Server running on http://localhost:${PORT}`));
