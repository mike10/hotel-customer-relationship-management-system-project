'use client'
import { useDispatch, useSelector } from 'react-redux';
import CheckIn from '@/components/CheckIn';
import { IRoom } from '@/utils/constants';
import { Flex } from 'antd';
import { getRoomSelector} from '@/utils/appSlice';
import { useEffect } from 'react';

const Page = ({ params }: { params: { slug: number } }) => {
    // const rooms: IRoom[] = useSelector(getRoomsSelector);
    // const room: IRoom|undefined = rooms.find(item => item.room == params.slug)
    const room:IRoom|undefined = useSelector(getRoomSelector); 
    const dispatch = useDispatch();
    
    useEffect(()=>{
      dispatch({type: 'GET_ROOM', payload:params.slug})
    }, [])

    if(!room) return <p>Loading...</p>;

    return (
      <Flex gap="middle" align="center" vertical>
        <p>Room {room.room}</p>
        <p>Addition information: {room.info} </p>
        <CheckIn {...room} /> 
      </Flex>
    )
}

export default Page;