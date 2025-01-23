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

async function createMember(request, response) {
    let sqlCommand = "INSERT INTO Member (memberName) VALUES (?)";
    let memberName = request.body.name;
    let rows = await execute(response, sqlCommand, memberName);
    response.send(rows);
}

async function getAllMembers(request, response) {
    let sqlCommand = "SELECT * FROM Member";
    let rows = await execute(response, sqlCommand);
    response.send(rows);
}

async function updateMember(request, response) {
    let sqlCommand = "UPDATE Member SET memberName = ?, memberEmail = ? WHERE id = ?";
    let memberName = request.body.name;
    let memberEmail = request.body.email;
    let id = request.body.id;
    let rows = await execute(response, sqlCommand, [memberName, memberEmail, id]);
    response.send(rows);
}

async function deleteMember(request, response) {
    let sqlCommand = "DELETE FROM Member WHERE id = ?";
    let id = request.body.id;
    let rows = await execute(response, sqlCommand, id);
    response.send(rows);
}

module.exports.createMember = createMember;
module.exports.getAllMembers = getAllMembers;
module.exports.updateMember = updateMember;
module.exports.deleteMember = deleteMember;