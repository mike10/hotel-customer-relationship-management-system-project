'use client'
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/app/redux/store'
import Link from 'next/link'

const MainLayout = () => {
    const rooms = useSelector((state: RootState) => state.users.rooms);
    return (
        <>
            <p>MainLayout</p>
          {
            rooms.map((item)=><p><Link key={item[0]} href={'./room/'+item[0]}>Room N{item[0]}</Link></p>)
          } 
        </>
           
    )
}

export default MainLayout;