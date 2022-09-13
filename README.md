# Voice Note

A system of web and mobile applications used to enhance the studying experience for people with hearing disabilities.

## Getting started

If you work on front-end:

`cd app`

If you work on back-end:

`cd server`

Run:

`npm install`

to install node modules

In `app` run:

`ng serve`

In `server` run:

`npm run start`

## View Database
You can view the data in a shared database by requesting to these endpoints:

`GET https://newtonian-voicenote.fly.dev/api/dev/users`

for table `user`

`GET https://newtonian-voicenote.fly.dev/api/dev/courses`

for table `courses`

`GET https://newtonian-voicenote.fly.dev/api/dev/recordings`

for table `recordings`

`GET https://newtonian-voicenote.fly.dev/api/dev/student-course`

for table `student_course`

## Connecting Database

First, Install mysql5.7 and MySQL Workbench and get the sql server running.

Then create database for voicenote and its tables by executing this query:

    CREATE DATABASE  IF NOT EXISTS `voicenote`;
    USE 'voicenote';
    DROP TABLE IF EXISTS `courses`;

    CREATE TABLE `courses` (
    `id` int NOT NULL AUTO_INCREMENT,
    `courseName` text NOT NULL,
    `code` text NOT NULL,
    `ownerId` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `ownerId` (`ownerId`),
    CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`)
    );

    DROP TABLE IF EXISTS `recordings`;

    CREATE TABLE `recordings` (
    `id` int NOT NULL AUTO_INCREMENT,
    `courseId` int NOT NULL,
    `data` varchar(45) DEFAULT NULL,
    `recordedAt` datetime NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id_UNIQUE` (`id`),
    KEY `courseId_idx` (`courseId`),
    CONSTRAINT `fk_recording_courseId` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
    );

    DROP TABLE IF EXISTS `student_course`;
    CREATE TABLE `student_course` (
    `id` int NOT NULL AUTO_INCREMENT,
    `studentId` int NOT NULL,
    `courseId` int NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `idstudent_course_UNIQUE` (`id`),
    KEY `fk_student_userId_idx` (`studentId`),
    KEY `fk_student_courseId_idx` (`courseId`),
    CONSTRAINT `fk_student_courseId` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_student_userId` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`)
    );

    DROP TABLE IF EXISTS `users`;

    CREATE TABLE `users` (
    `id` int NOT NULL AUTO_INCREMENT,
    `username` text NOT NULL,
    `dob` datetime NOT NULL,
    `password` text NOT NULL,
    `email` text NOT NULL,
    PRIMARY KEY (`id`)
    );

Then, create a `.env` file in `server` folder and add these following codes:

    DB_HOST="localhost"
    DB_PORT=
    DB_USER="root"
    DB_PASSWORD=
    DB_DATABASE="voicenote"

Then add the port your SQL server is running on and the password of your connection.

CHANGE: from 8/9/2022 onwards, pls execute the following query

    ALTER TABLE `voicenote`.`courses` 
    ADD COLUMN `isLive` TINYINT NOT NULL DEFAULT 0 AFTER `ownerId`;


