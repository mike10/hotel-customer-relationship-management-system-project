'use client'
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/redux/store'
import CheckIn from '@/app/components/CheckIn';

interface IGetRooms {
  room:number, 
  status:boolean, 
  info:string
}

const Page = ({ params }: { params: { slug: number } }) => {
    const rooms = useSelector((state: RootState) => state.app.rooms);
    const room: IGetRooms | undefined = rooms.find(item => item.room === params.slug)
    
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