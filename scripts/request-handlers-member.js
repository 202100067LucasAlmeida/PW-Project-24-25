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

async function createMember(request, response) {
    let sqlCommand = "INSERT INTO Member (memberName) VALUES (?)";
    let memberName = request.body.memberName;
    let rows = await execute(response, sqlCommand, [memberName]);
    response.send(rows);
}

async function getAllMembers(request, response) {
    let sqlCommand = "SELECT * FROM Member";
    let rows = await execute(response, sqlCommand);
    response.send(rows);
}

async function updateMember(request, response) {
    let sqlCommand = "UPDATE Member SET memberName = ? WHERE memberId = ?";
    let memberName = request.body.name;
    let id = request.params.id;
    let rows = await execute(response, sqlCommand, [memberName, id]);

    let eventTypeIds = request.body.eventTypeIds;
    await execute(response, "DELETE FROM MemberEventType WHERE memberId = ?", [id]);
    for (let eventTypeId of eventTypeIds) {
        await execute(response, "INSERT INTO MemberEventType (memberId, eventTypeId) VALUES (?, ?)", [id, eventTypeId]);
    }

    let eventIds = request.body.eventIds;
    await execute(response, "DELETE FROM MemberEvent WHERE memberId = ?", [id]);
    for (let eventId of eventIds) {
        await execute(response, "INSERT INTO MemberEvent (memberId, eventId) VALUES (?, ?)", [id, eventId]);
    }

    response.send(rows);
}

async function deleteMember(request, response) {
    let sqlCommand = "DELETE FROM Member WHERE memberId = ?";
    let id = request.params.id;
    let rows = await execute(response, sqlCommand, [id]);
    response.send(rows);
}

async function getSubscribedEvents(request, response) {
    let id = request.params.id;
    let sqlCommand = "SELECT * FROM Event WHERE eventId IN (SELECT eventId FROM MemberEvent WHERE memberId = ?)";
    let rows = await execute(response, sqlCommand, [id]);
    response.send(rows);
}

async function getFavoriteEventTypes(request, response) {
    let id = request.params.id;
    let sqlCommand = "SELECT * FROM EventType WHERE eventTypeId IN (SELECT eventTypeId FROM MemberEventType WHERE memberId = ?)";
    let rows = await execute(response, sqlCommand, [id]);
    response.send(rows);
}

module.exports.createMember = createMember;
module.exports.getAllMembers = getAllMembers;
module.exports.updateMember = updateMember;
module.exports.deleteMember = deleteMember;
module.exports.getSubscribedEvents = getSubscribedEvents;
module.exports.getFavoriteEventTypes = getFavoriteEventTypes;