export type EventAttendance = {
    id: number;
    userId: number;
    eventId: number;
    attending: boolean;
    createDateTime: string;
    updateDateTime: string;
}