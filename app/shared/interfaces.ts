
export interface ISessionDay {
    date: Date;
    title: string;
    desc: string;
    isSelected: boolean;
}

export interface ISpeaker {
    id: string;
    name: string;
    title: string;
    picture: string;
}

export interface IRoomInfo {
    roomId: string;
    name: string;
    url: string;
    theme: string;
}

export interface ISession {
    sessionId: string;
    sessionTitle: string;
    sessionStartTime: string;
    sessionEndTime: string;
    isBreak: boolean;
    roomId: number;
    roomName: string;
    floorId: number;
    floorName: string;
    floorPlanImageUrl: string;
    speakerId: number;    
    speakerName: string;
    eventSessionTypeId: number;
    eventSessionTypeName: string;
    sessionPhotoUrl: string;
    sessionContent: string;
}

export interface IFavouriteSession {
    sessionId: string;
}

export interface ISessionTimeSlot {
    title: string;
    isBreak: boolean;
    start: Date;
    end: Date;
}

export interface IEvent {
    eventId: string;
    eventName: string;
    eventImageUrl: string;
    eventStreetAddress: string;
    eventCity: string;
    eventState: string;
    eventCountry: string;
    eventZipCode: string;
    eventStartDate: string;
    eventEndDate: string;
    description: string;
    schedule: Array<IMainEventSessions>;
    accomodation: string;
    transportation: string;
    contactInformation: string; 
}

export interface IMainEventSessions {
    title: string;
    date: string;
}