'use client'
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/redux/store'

const Page = ({ params }: { params: { slug: string } }) => {
    const rooms = useSelector((state: RootState) => state.users.rooms);
    const el: String[] | undefined = rooms.find(item=> item[0] === params.slug)
    
    return (
        <>
            <p>Room {params.slug}</p>
          {
            <p>Addition information: {el == undefined ? '-' : el[1]} </p>
          } 
        </>
           
    )
}

export default Page;