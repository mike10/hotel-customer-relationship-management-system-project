'use client'
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/utils/store'
import CheckIn from '@/app/components/CheckIn';
import { IGetRooms } from '@/app/utils/constants';
import { useEffect } from 'react';

const Page = ({ params }: { params: { slug: number } }) => {
    const rooms: IGetRooms[] = useSelector((state: RootState) => state.app.rooms);
    let room: IGetRooms | undefined= rooms.find(item => item.room == params.slug)

    return (
        <>
            <p>Room {room?.room}</p>
          {

            <p>Addition information: {room?.info} </p>
          }
          <CheckIn room={room?.room} /> 
        </>
           
    )
}

export default Page;