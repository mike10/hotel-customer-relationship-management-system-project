'use client'
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/utils/store'
import CheckIn from '@/app/components/CheckIn';
import { IGetRooms } from '@/app/utils/constants';
import { Flex } from 'antd';

const Page = ({ params }: { params: { slug: number } }) => {
    const rooms: IGetRooms[] = useSelector((state: RootState) => state.app.rooms);
    const room: IGetRooms = rooms.find(item => item.room == params.slug)

    return (
      <Flex gap="middle" align="center" vertical>
        <p>Room {room?.room}</p>
        <p>Addition information: {room?.info} </p>
        <CheckIn room={room?.room} /> 
      </Flex>
    )
}

export default Page;