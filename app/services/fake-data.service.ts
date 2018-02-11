import * as fileSystemModule from "file-system";
import { IRoomInfo, ISession, ISessionDay, ISessionTimeSlot, ISpeaker } from "../shared/interfaces";
import { sessionDays, SessionTypes, SessionFloor, EventList, MainSessionTitles, MainSessionDate } from "../shared/static-data";
import { IMainEventSessions, IEvent } from './../shared/interfaces';

import faker = require("faker");
import { IScheduler } from 'rxjs/Scheduler';

let NUM_SPEAKERS = 40;
let NUM_ROOM_INFOS = 10;
let SESSION_LENGTH = 60;
let NUM_MAIN_SESSIONS = 5;

export function generateSpeakers(): Array<ISpeaker> {
    let speakerList: Array<ISpeaker> = [];
    let avatarsMen = getSpeakerAvatars("images/speakers/base64/men.txt");
    let avatarsWomen = getSpeakerAvatars("images/speakers/base64/women.txt");
    for (let i = 0; i <= NUM_SPEAKERS; i++) {
        let genderBool = faker.random.boolean();
        let genderInt = parseInt(genderBool + "");
        let firstName = faker.name.firstName(genderInt);
        let lastName = faker.name.lastName(genderInt);
        let picture = genderBool ? avatarsMen[faker.random.number(avatarsMen.length - 1)] : avatarsWomen[faker.random.number(avatarsWomen.length - 1)];

        let s: ISpeaker = {
            id: faker.random.uuid(),
            name: firstName + " " + lastName,
            title: faker.name.jobTitle(),
            picture: picture
        };

        speakerList.push(s);
    }
    return speakerList;
}
export function generateSchedule(): Array<IMainEventSessions> {
	let mainSessions: Array<IMainEventSessions> = [];
	//Hardcoded for now, Change these to API data later
	for(let i = 0; i < NUM_MAIN_SESSIONS; i++){
		let s: IMainEventSessions = {
			title: MainSessionTitles[i],
			date: MainSessionDate[i]
		}
		mainSessions.push(s);
	}
	return mainSessions;
}

export function generateRoomInfos(): Array<IRoomInfo> {
    let roomInfoList: Array<IRoomInfo> = [];
    for (let i = 0; i <= NUM_ROOM_INFOS; i++) {
        let r: IRoomInfo = {
            roomId: faker.random.uuid(),
            name: faker.address.streetName() + " " + faker.random.number(10),
            url: faker.internet.domainName(),
            theme: faker.lorem.words(1)
        };
        roomInfoList.push(r);
    }

    return roomInfoList;
}

export function generateEvents (schedule: Array<IMainEventSessions>): Array<IEvent> {
    //Todo
    let eventList: Array<IEvent> = [];
    let idSeed = 2000;
		console.log("GENERATING", idSeed);
    for (let i = 0; i<EventList.length; i++){
        let s: IEvent = {
            id: (idSeed++).toString(),
            name: EventList[i].name,
            imageURL: EventList[i].imageURL,
            address: EventList[i].address,
            city: EventList[i].city,
            state: EventList[i].state,
            country: EventList[i].state,
            zipcode: EventList[i].zipcode,
            startDate: EventList[i].startDate,
            endDate: EventList[i].endDate,
            description : EventList[i].description,
            schedule: EventList[i].schedule, // Todo, this should hold every main session for that event
            accomodation: EventList[i].accomodation,
            transportation: EventList[i].transportation,
            contantInfo: EventList[i].contantInfo
        }
        eventList.push(s);
    }
    return eventList;
}

export function generateSessions(speakers: Array<ISpeaker>, roomInfos: Array<IRoomInfo>): Array<ISession> {
    let sessionList: Array<ISession> = [];
    let idSeed = 1000;
    for (let confDay of sessionDays) {
        let timeSlots = generateTimeSlots(confDay);
        for (let confTimeSlot of timeSlots) {
            if (confTimeSlot.isBreak) {
                let s: ISession = {
                    id: (idSeed++).toString(),
                    title: toTitleCase(confTimeSlot.title),
                    isBreak: true,
                    start: confTimeSlot.start.toString(),
                    end: confTimeSlot.end.toString(),
                    room: "",
                    roomInfo: null,
                    speakers: [],
                    description: "",
                    descriptionShort: "",
                    type: "",
                    floor: "",
                };
                sessionList.push(s);
            }
            else {
                let subSpeakers = getRandomArrayElements(speakers, faker.random.number({ min: 1, max: 3 }));
                let roomInfo = roomInfos[faker.random.number(roomInfos.length - 1)];
                var randomTypeIndex = Math.floor(Math.random() * SessionTypes.length); 
                var randomFloorIndex = Math.floor(Math.random() * SessionFloor.length);
                let s: ISession = {
                    id: (idSeed++).toString(),
                    title: toTitleCase(faker.company.bs()),
                    isBreak: false,
                    start: confTimeSlot.start.toString(),
                    end: confTimeSlot.end.toString(),
                    room: roomInfo.name,
                    roomInfo: roomInfo,
                    speakers: subSpeakers,
                    description: faker.lorem.paragraph(8),
                    descriptionShort: faker.lorem.sentence(),
                    type: SessionTypes[randomTypeIndex],
                    floor: SessionFloor[randomFloorIndex],
                };
                sessionList.push(s);
            }
        }
    }
    return sessionList;
}

function getSpeakerAvatars(path) {
    let avatarList: Array<string> = [];
    let currentAppFolder = fileSystemModule.knownFolders.currentApp();
    let menAvatarsFile = currentAppFolder.getFile(path);
    let fileText = menAvatarsFile.readTextSync();

    let lines = fileText.split("\n");
    for (const i of lines) {
        avatarList.push("data:image/png;base64," + lines[i]);
    }
    return avatarList;
}

function generateTimeSlots(confDay: ISessionDay): Array<ISessionTimeSlot> {
    let timeSlotList: Array<ISessionTimeSlot> = [];
    let startTimeList = getTimeRange(addMinutes(confDay.date, 240), addMinutes(confDay.date, 780), SESSION_LENGTH);
    for (let startTime of startTimeList) {
        let isBreak = false;
        let sessionTitle = "";
        if (startTime.getHours() === 4) {
            isBreak = true;
            sessionTitle = "Welcome Message";
        }
        else if (startTime.getHours() === 8) {
            isBreak = true;
            sessionTitle = "Lunch Break";
        }
        let cTimeSlot: ISessionTimeSlot = { title: sessionTitle, isBreak, start: startTime, end: addMinutes(startTime, SESSION_LENGTH) };
        timeSlotList.push(cTimeSlot);
    }
    return timeSlotList;
}

function getTimeRange(startTime: Date, endTime: Date, minutesBetween: number): Array<Date> {
    let startTimeList: Array<Date> = [];
    let diffInMinutes = Math.round((endTime.getTime() - startTime.getTime()) / 60000);
    let periods: number = diffInMinutes / minutesBetween;
    for (let i = 0; i <= periods; i++) {
        let periodStart = addMinutes(startTime, (minutesBetween * i));
        startTimeList.push(periodStart);
    }

    return startTimeList;
}

function addMinutes(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
}

function getRandomArrayElements(arr, count) {
    let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}
