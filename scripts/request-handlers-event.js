"use strict";

/**
 * @author Jean Oliveira 202300095 202300095@estudantes.ips.pt
 * @author Lucas Almeida 202100067 202100067@estudantes.ips.pt
 */

const mysql = require("mysql2/promise");
const connectionOptions = require("./conection-options.json");

async function execute(response, sqlCommand, values) {
    let connection;
    try {
        connection = await mysql.createConnection(connectionOptions);
        let [rows, fields] = await connection.execute(sqlCommand, values);
        return rows;
    } catch (error) {
        response.sendStatus(500);
    } finally {
        connection && connection.end();
    }
}

async function createEvent(request, response) {
    let sqlCommand = "INSERT INTO Event (eventDate, eventName, eventTypeId) VALUES (?, ?, ?)";
    let eventName = request.body.eventName;
    let eventDate = request.body.eventDate.split("T")[0];
    let eventTypeId = request.body.eventTypeId;
    let rows = await execute(response, sqlCommand, [eventDate, eventName, eventTypeId]);
    response.send(rows);
}

async function getAllEvents(request, response) {
    let sqlCommand = "SELECT * FROM Event";
    let rows = await execute(response, sqlCommand);
    response.send(rows);
}

async function updateEvent(request, response) {
    let sqlCommand = "UPDATE Event SET eventName = ?, eventDate = ?, eventTypeId = ? WHERE eventId = ?";
    let eventName = request.body.eventName;
    let eventDate = request.body.eventDate.split("T")[0];
    let eventTypeId = request.body.eventTypeId;
    let id = request.params.id;
    let rows = await execute(response, sqlCommand, [eventName, eventDate, eventTypeId, id]);
    response.send(rows);
}

async function deleteEvent(request, response) {
    let sqlCommand = "DELETE FROM Event WHERE eventId = ?";
    let id = request.params.id;
    let rows = await execute(response, sqlCommand, [id]);
    response.send(rows);
}

module.exports.createEvent = createEvent;
module.exports.getAllEvents = getAllEvents;
module.exports.updateEvent = updateEvent;
module.exports.deleteEvent = deleteEvent;