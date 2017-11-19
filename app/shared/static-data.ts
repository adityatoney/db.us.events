import { ISessionDay } from "../shared/interfaces";

export let sessionDays: Array<ISessionDay> = [
    { title: "NOV 3", desc: "General Shibir", date: new Date(2017, 10, 3) },
    { title: "NOV 4", desc: "Gnanvidhi Day", date: new Date(2017, 10, 4) },
    { title: "NOV 5", desc: "Pran-Pratistha", date: new Date(2017, 10, 5) }
];

export let SessionTypes = ["GENERAL", "LMHT", "YMHT", "WMHT", "MMHT"];
