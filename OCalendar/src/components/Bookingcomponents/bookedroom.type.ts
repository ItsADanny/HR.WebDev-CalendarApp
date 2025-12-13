export type Room = {
    id: number;
    name: string;
}

export type BookedRoom = {
    id: string;
    room?: Room;
    createDateTime: string;
}