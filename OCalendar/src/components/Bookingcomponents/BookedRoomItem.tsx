import { useState } from 'react';
import type { BookedRoom } from './bookedroom.type.ts'

export default function BookedRoomItem(props: {bookedroom: BookedRoom}) {

  return (
    <li>
        {props.bookedroom.title}
    </li>
  );
}