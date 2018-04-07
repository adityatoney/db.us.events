import { ISessionDay, IEvent, IMainEventSessions } from "../shared/interfaces";

export let sessionDays: Array<ISessionDay> = [
    { isSelected: true, title: "NOV 3", desc: "General Shibir", date: new Date(2017, 10, 3) },
    { isSelected: false, title: "NOV 4", desc: "Gnanvidhi Day", date: new Date(2017, 10, 4) },
    { isSelected: false, title: "NOV 5", desc: "Pran-Pratistha", date: new Date(2017, 10, 5) }
];

export let SessionTypes = ["GENERAL", "LMHT", "YMHT", "WMHT", "MMHT"];

export let SessionFloor = ["Floor One", "Floor Two", "Floor Three", "Floor Four", "Floor Five"]; 

export let MainSessionTitles = ["Welcome Ceremony", "Satsang Shibir Start", "Gnanvidhi Day", "Pran Pratishta", "Garba"];
export let MainSessionDate = ["July 22 2018", "July 23 2018", "July 24 2018", "July 25 2018", "July 26 2018"];

export let EventList: Array<IEvent> = [
    {
    eventId: "0",
    eventName: "South East Gurupurnima 2018",
    eventImageUrl: "path-to/fake-image.jpeg",
    eventStreetAddress: "123 Baker Street",
    eventCity: "Jacksonville",
    eventState: "Florida",
    eventCountry: "USA",
    eventZipCode: "123456",
    eventStartDate: "July 22 2018",
    eventEndDate: "July 28 2018",
    description: "",
    schedule: [{ // this should be an Array<IMainEventSessions> array
        title: "Welcome Ceremony",
        date: "July 22 2018"
    }], 
    accomodation: "",
    transportation: "",
    contactInformation: "",
    }
];
