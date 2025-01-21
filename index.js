const express = require("express");
const requestHandlers = require("./scripts/request-handlers");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded());
app.use(express.static("www"));
app.set("views", "./views");

app.get("/", requestHandlers.home);
app.post("/", requestHandlers.createMember);
app.post("/", requestHandlers.createEvent);
app.post("/", requestHandlers.createEventType);
app.get("/new-member", requestHandlers.newMember);
app.post("/delete-member/:member", requestHandlers.deleteMember);
app.post("/alter-member/:member", requestHandlers.alterMember);
app.get("/new-event", requestHandlers.newEvent);
app.post("/delete-event/:event", requestHandlers.deleteEvent);
app.post("/alter-event/:event", requestHandlers.alterEvent);
app.get("/new-eventype", requestHandlers.newEventype);
app.post("/delete-eventype/:eventype", requestHandlers.deleteEventype);
app.post("/alter-eventype/:eventype", requestHandlers.alterEventype);

app.listen(8081, function () {
    console.log("Server running at http://localhost:8081");
});
