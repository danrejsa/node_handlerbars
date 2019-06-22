const http = require("http");
const app = require("./app");
const port = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(port, () => console.log(`listening on port ${port}`));
module.exports = app; //for testing