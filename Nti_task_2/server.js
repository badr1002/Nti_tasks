const { url } = require('inspector');
const app = require('./src/app');
const PORT = 3000;
app.listen(PORT, () => console.log('Connected at ' + PORT));