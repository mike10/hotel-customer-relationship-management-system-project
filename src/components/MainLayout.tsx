'use client'
import { useDispatch, useSelector } from 'react-redux';
import { Table,Flex } from 'antd';
import type { TableProps } from 'antd';
import Link from 'next/link'
import CheckIn from '@/components/CheckIn';
import { useEffect } from 'react';
import { IRoom } from '@/utils/constants' 
import { getAuthSelector, getRoomsSelector } from "@/utils/appSlice";
import { useRouter } from 'next/navigation'
import { getAuthFirestore } from '@/utils/firestore';

interface DataType {
  key: number;
  room: number;
  status: string;
  action: number;
}

const MainLayout = () => {
    const rooms:IRoom[]|undefined = useSelector(getRoomsSelector);
    const auth = useSelector(getAuthSelector);
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(()=>{
      if(!auth) {
        const authIsTrue = getAuthFirestore()
        if(authIsTrue) dispatch({type: 'AUTH'})
          else router.push('/')
      }
    }, [auth])

    const columns: TableProps<DataType>['columns'] = [
      {
        title: 'Room',
        dataIndex: 'room',
        key: 'room',
        render: (_, record) => <Link  href={'./room/'+record.room}>{record.room}</Link>,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
        	<CheckIn {...rooms[record.key]}/>
        ),
      },
    ];
    const data:DataType[] = rooms.map((item, i) =>({key:i, room:item.room, status: item.checkIn ? 'check in':'check out', action:item.room}))
    
    if(!rooms) return <div>Loading...</div>
    
    return (
      <Flex justify='center' align='center' vertical={true}>
          <h1>MainLayout</h1>
          <Table columns={columns} dataSource={data} />
      </Flex>
    )
}

export default MainLayout;