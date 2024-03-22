'use client'
import { Button, Flex } from 'antd';
import { checkIn } from '@/app/utils/appSlice'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../utils/store';

interface IGetRooms {
    room:number, 
    status:boolean, 
    info:string
}

const CheckIn = (props:{room:number}) => {

    const rooms = useSelector((state: RootState) => state.app.rooms);
    const room: IGetRooms | undefined = rooms.find(item=> item.room === props.room)
    
    const dispatch = useDispatch()

    return (
        <Button type="primary" onClick={()=>{dispatch(checkIn(props.room))}}>{room?.status ? "Check Out" : "Check In"}</Button>
    )
}

export default CheckIn;