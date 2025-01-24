create database pw2025 /*!40100 COLLATE 'utf8mb4_0900_ai_ci' */;

drop user if exists 'pw2025projeto'@'localhost';
create user if not exists 'pw2025projeto'@'localhost' identified by 'PW2025Projeto!GandaSenha';
grant all on pw2025.* to 'pw2025projeto';
FLUSH PRIVILEGES;

use pw2025;

drop table if exists Member;
create table Member(
	memberId int auto_increment primary key,
    memberName varchar(255) not null
);

drop table if exists EventType;
create table EventType(
	eventTypeId int auto_increment primary key,
    eventTypeName varchar(255) not null
);

drop table if exists Event;
create table Event(
	eventId int auto_increment primary key,
    eventDate date not null,
    eventName varchar(255) not null,
    eventTypeId int not null,
    foreign key (eventTypeId) references EventType(eventTypeId)
);


create table MemberEventType(
	memberId int not null,
    eventTypeId int not null,
    primary key (memberId, eventTypeId),
    foreign key (memberId) references Member(memberId),
    foreign key (eventTypeId) references EventType(eventTypeId)
);

create table MemberEvent(
	memberId int not null,
    eventId int not null,
    primary key (memberId, eventId),
    foreign key (memberId) references Member(memberId),
    foreign key (eventId) references Event(eventId)
);