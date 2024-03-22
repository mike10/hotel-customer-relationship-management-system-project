'use client'
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/app/utils/store'
import { Table, Button, Flex } from 'antd';
import type { TableProps } from 'antd';
import Link from 'next/link'
import CheckIn from '@/app/components/CheckIn';


interface DataType {
  key: number;
  room: number;
  status: string;
  action: number;
}

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
      <CheckIn room={record.room}/> 
    ),
  },
];

const MainLayout = () => {
    const rooms = useSelector((state: RootState) => state.app.rooms);

    const data:DataType[] = rooms.map((item, i) =>({key:i, room:item.room, status: item.status ? 'check in':'check out', action:item.room}))
    console.log(data);
    
    
    return (
      <Flex justify='center' align='center' vertical={true}>
          <h1>MainLayout</h1>
          <Table columns={columns} dataSource={data} />
      </Flex>
    )
}

export default MainLayout;