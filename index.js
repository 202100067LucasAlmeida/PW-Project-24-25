"use strict";

/**
 * @author Jean Oliveira 202300095 202300095@estudantes.ips.pt
 * @author Lucas Almeida 202100067 202100067@estudantes.ips.pt
 */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const memberHandlers = require("./scripts/request-handlers-member");
const eventHandlers = require("./scripts/request-handlers-event");
const eventTypeHandlers = require("./scripts/request-handlers-event-type");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static("www"));

// Manipuladores para Membros
app.post("/members", memberHandlers.createMember);
app.get("/members", memberHandlers.getAllMembers);
app.put("/members/:id", memberHandlers.updateMember);
app.delete("/members/:id", memberHandlers.deleteMember);

// Manipuladores para Eventos
app.post("/events", eventHandlers.createEvent);
app.get("/events", eventHandlers.getAllEvents);
app.put("/events/:id", eventHandlers.updateEvent);
app.delete("/events/:id", eventHandlers.deleteEvent);

// Manipuladores para Tipos de Eventos
app.post("/event-types", eventTypeHandlers.createEventType);
app.get("/event-types", eventTypeHandlers.getAllEventTypes);
app.put("/event-types/:id", eventTypeHandlers.updateEventType);
app.delete("/event-types/:id", eventTypeHandlers.deleteEventType);

// Manipuladores para eventos inscritos por membros
app.get("/members/:id/subscribedEvents", memberHandlers.getSubscribedEvents);

// Manipuladores para tipos de eventos favoritos dos membros
app.get("/members/:id/favoriteEventTypes", memberHandlers.getFavoriteEventTypes);

app.listen(3000, function () {
    console.log("Server running at http://localhost:3000");
});
