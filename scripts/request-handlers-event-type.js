"use strict";
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

async function createEventType(request, response) {
    let sqlCommand = "INSERT INTO EventType (eventTypeName) VALUES (?)";
    let eventTypeName = request.body.eventTypeName;
    let rows = await execute(response, sqlCommand, [eventTypeName]);
    response.send(rows);
}

async function getAllEventTypes(request, response) {
    let sqlCommand = "SELECT * FROM EventType";
    let rows = await execute(response, sqlCommand);
    response.send(rows);
}

async function updateEventType(request, response) {
    let sqlCommand = "UPDATE EventType SET eventTypeName = ? WHERE id = ?";
    let eventTypeName = request.body.eventTypeName;
    let id = request.body.id;
    let rows = await execute(response, sqlCommand, [eventTypeName, id]);
    response.send(rows);
}

async function deleteEventType(request, response) {
    let sqlCommand = "DELETE FROM EventType WHERE id = ?";
    let id = request.body.id;
    let rows = await execute(response, sqlCommand, id);
    response.send(rows);
}

module.exports.createEventType = createEventType;
module.exports.getAllEventTypes = getAllEventTypes;
module.exports.updateEventType = updateEventType;
module.exports.deleteEventType = deleteEventType;