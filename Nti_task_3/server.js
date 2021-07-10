const app = require('./src/app');
const PORT = process.env.PORT || 3000;
require('./db/db.connenction');
app.listen(PORT, () => console.log("Server is connected as " + PORT));