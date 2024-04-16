export interface IRoom {
    room: number,
    info: string,
    checkIn: string,
    checkOut: string
}

export type FieldType = {
    username: string;
    password: string;
    remember?: boolean;
};

export interface IAuth {
    username: string,
    password: string
};