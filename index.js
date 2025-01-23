const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const memberHandlers = require("./scripts/request-handlers-member");
const eventHandlers = require("./scripts/request-handlers-event");
const eventTypeHandlers = require("./scripts/request-handlers-event-type");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static("www"));

// Rotas para Membros
app.post("/members", memberHandlers.createMember);
app.get("/members", memberHandlers.getAllMembers);
app.put("/members/:id", memberHandlers.updateMember);
app.delete("/members/:id", memberHandlers.deleteMember);

// Rotas para Eventos
app.post("/events", eventHandlers.createEvent);
app.get("/events", eventHandlers.getAllEvents);
app.put("/events/:id", eventHandlers.updateEvent);
app.delete("/events/:id", eventHandlers.deleteEvent);

// Rotas para Tipos de Eventos
app.post("/event-types", eventTypeHandlers.createEventType);
app.get("/event-types", eventTypeHandlers.getAllEventTypes);
app.put("/event-types/:id", eventTypeHandlers.updateEventType);
app.delete("/event-types/:id", eventTypeHandlers.deleteEventType);

app.listen(3000, function () {
    console.log("Server running at http://localhost:3000");
});
