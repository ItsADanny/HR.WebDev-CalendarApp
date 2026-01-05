export type Room = {
  id: number;
  isActive: boolean;
  createDateTime: string;
  createdByUserId: number;
  location: string;
  name: string;
};


export type BookedRoom = {
    id: string;
    bookedByUserId: string;
    createDateTime: string;
    roomId: number;
    timeSlotId: string;
    room?: Room;
    timeSlot?: TimeSlot;
}

export type TimeSlot = {
  id: number;
  createDateTime: string;
  createdByUserId: number;
  date: string;      // "2026-01-04"
  startTime: string; // "09:00"
  endTime: string;   // "10:00"
  name: string;
  roomId: number;
};
