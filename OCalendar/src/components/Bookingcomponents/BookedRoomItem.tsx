import { useState } from 'react';
import type { BookedRoom } from './bookedroom.type.ts'
import "./css/BookedRoomItem.css";

export default function BookedRoomItem(props: {bookedroom: BookedRoom}) {

  return (
    <>
      <button className='bookedrooms-list'>{props.bookedroom.id}</button>
    </>
  );
}