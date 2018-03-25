
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
    id: string;
    title: string;
    start: string;
    end: string;
    room: string;
    roomInfo: IRoomInfo;
    speakers: Array<ISpeaker>;
    description: string;
    descriptionShort: string;
    type: string;
    isBreak: boolean;
    floor: string;
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
    id: string;
    name: string;
    imageURL: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    startDate: string;
    endDate: string;
    description: string;
    schedule: Array<IMainEventSessions>;
    accomodation: string;
    transportation: string;
    contantInfo: string; 
}

export interface IMainEventSessions {
    title: string;
    date: string;
}