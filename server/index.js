const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
require("./routes/api")(app);

const listener = app.listen(3001, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});