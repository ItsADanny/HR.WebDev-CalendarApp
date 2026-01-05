import type { BookedRoom } from './bookedroom.type.ts'
import "./css/BookedRoomItem.css";

type Props = {
  bookedroom: BookedRoom;
  onClick?: () => void;
}

export default function BookedRoomItem({ bookedroom, onClick }: Props) {
  const roomName = bookedroom.room?.name || 'Unknown Room';
  const date = new Date(bookedroom.createDateTime).toLocaleDateString();

  return (
    <>
      <button className='bookedrooms-list' onClick={onClick}>
        {roomName} - {date}
      </button>
    </>
  );
}