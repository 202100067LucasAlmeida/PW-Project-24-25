create database pw2025 /*!40100 COLLATE 'utf8mb4_0900_ai_ci' */;

create user if not exists pw2025projeto identified by 'PW2025Projeto!GandaSenha';
grant all on pw2025.* to pw2025projeto;

use pw2025;

drop table if exists Member;
create table Member(
	memberId int auto_increment primary key,
    memberName varchar(255) not null
);

drop table if exists Event;
create table Event(
	eventId int auto_increment primary key,
    eventDate date not null,
    eventName varchar(255) not null
);

drop table if exists EventType;
create table EventType(
	eventTypeId int auto_increment primary key,
    eventTypeName varchar(255) not null
);

create table MemberEventType(
	memberId int,
    eventTypeId int,
    primary key (memberId, eventTypeId),
    foreign key (memberId) references Member(memberId),
    foreign key (eventTypeId) references EventType(eventTypeId)
);

create table MemberEvent(
	memberId int,
    eventId int,
    primary key (memberId, eventId),
    foreign key (memberId) references Member(memberId),
    foreign key (eventId) references Event(eventId)
);