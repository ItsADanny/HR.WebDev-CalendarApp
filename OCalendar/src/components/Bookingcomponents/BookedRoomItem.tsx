import { useState } from 'react';
import type { BookedRoom } from './bookedroom.type.ts'
import "./css/BookedRoomItem.css";

export default function BookedRoomItem(props: {bookedroom: BookedRoom; onClick?: () => void}) {
  const roomName = props.bookedroom.room?.name || 'Unknown Room';
  const date = new Date(props.bookedroom.createDateTime).toLocaleDateString();

  return (
    <>
      <button className='bookedrooms-list' onClick={props.onClick}>
        {roomName} - {date}
      </button>
    </>
  );
}