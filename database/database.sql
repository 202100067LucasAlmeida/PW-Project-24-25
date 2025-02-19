create database if not exists pw2025 /*!40100 collate 'utf8mb4_0900_ai_ci' */;

drop user if exists 'pw2025projeto'@'localhost';
create user if not exists 'pw2025projeto'@'localhost' identified by 'PW2025Projeto!GandaSenha';
grant all on pw2025.* to 'pw2025projeto';
flush privileges;

use pw2025;

SET FOREIGN_KEY_CHECKS = 0;

drop table if exists Member;
create table if not exists Member(
	memberId int auto_increment primary key,
    memberName varchar(255) not null unique unique
);

drop table if exists EventType;
create table if not exists EventType(
	eventTypeId int auto_increment primary key,
    eventTypeName varchar(255) not null unique
);

drop table if exists Event;
create table if not exists Event(
	eventId int auto_increment primary key,
    eventDate date not null,
    eventName varchar(255) not null,
    eventTypeId int not null,
    foreign key (eventTypeId) references EventType(eventTypeId)
);

drop table if exists MemberEventType;
create table if not exists MemberEventType(
	memberId int not null,
    eventTypeId int not null,
    primary key (memberId, eventTypeId),
    foreign key (memberId) references Member(memberId) on delete cascade,
    foreign key (eventTypeId) references EventType(eventTypeId) on delete cascade
);

drop table if exists MemberEvent;
create table if not exists MemberEvent(
	memberId int not null,
    eventId int not null,
    primary key (memberId, eventId),
    foreign key (memberId) references Member(memberId) on delete cascade,
    foreign key (eventId) references Event(eventId) on delete cascade
);

SET FOREIGN_KEY_CHECKS = 1;