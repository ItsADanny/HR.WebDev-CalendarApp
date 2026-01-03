export type Room = {
    id: number;
    name: string;
    location: string;
}

export type BookedRoom = {
    id?: string;
    room?: Room;
    createDateTime?: string;
}