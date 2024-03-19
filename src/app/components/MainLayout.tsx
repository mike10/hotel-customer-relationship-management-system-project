'use client'
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/app/redux/store'
import Link from 'next/link'

const MainLayout = () => {
    const rooms = useSelector((state: RootState) => state.app.rooms);
    return (
        <>
            <p>MainLayout</p>
          {
            rooms.map((item)=><p key={item[0]}><Link  href={'./room/'+item[0]}>Room N{item[0]}</Link></p>)
          } 
        </>
           
    )
}

export default MainLayout;