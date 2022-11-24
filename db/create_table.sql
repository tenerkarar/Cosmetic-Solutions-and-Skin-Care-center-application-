-- drop database barbershop;
-- create database barbershop;

CREATE TABLE `service`
(
    `service_id`  int auto_increment,
    `name`        varchar(20),
    `description` text,
    `price`       decimal(10, 2),
    `points`      int,
    PRIMARY KEY (`service_id`)
);

CREATE TABLE users
(
    user_id     int auto_increment,
    `firstname` varchar(30),
    `lastname`  varchar(30),
    `phone`     varchar(15),
    `email`     varchar(30),
    `address`   varchar(50),
    `city`      varchar(50),
    `zip`       int,
    `state`     varchar(20),
    `username`  varchar(50),
    `password`  text,
    `role`      varchar(20) default 'normal',
    PRIMARY KEY (`user_id`)
);

CREATE TABLE `point`
(
    `point_id`     int auto_increment,
    `point_accumulated` int,
    `user_id`   int,
    PRIMARY KEY (`point_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
        on DELETE cascade
        on UPDATE cascade
);

CREATE TABLE `appointment`
(
    `appointment_id` int auto_increment,
    `time`           time,
    `date`           date,
    `note`          text,
    `user_id`    int,
    `complete`   boolean default false,
    PRIMARY KEY (`appointment_id`),
    FOREIGN KEY (`user_id`) REFERENCES users (`user_id`)
        on DELETE cascade
        on UPDATE cascade
);

CREATE TABLE `appoints_service`
(
    `appointment_id` int,
    `service_id`     int,
    PRIMARY KEY (`appointment_id`, `service_id`),
    FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`appointment_id`)
        on DELETE cascade
        on UPDATE cascade,
    FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`)
        on DELETE cascade
        on UPDATE cascade
);

create table token_records
(
    token_record_id bigint auto_increment primary key,
    user_id         int  not null,
    refresh_token   text not null,
    foreign key (user_id) references users (user_id)
        on update cascade
        on delete cascade
);

create index token_user_id
    on token_records (user_id, refresh_token);

-- indexes are down below
CREATE INDEX findUser ON users (username);
CREATE INDEX serviceIndex ON service (name);
