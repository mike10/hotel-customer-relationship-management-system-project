"use client";
import { Button, Modal, DatePicker, GetProps } from "antd";
import { getRoomSelector, getRoomsSelector } from "@/utils/appSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { IRoom } from '@/utils/constants'
import dayjs from 'dayjs'
import { useEffect } from 'react';
import { disableNetwork } from "firebase/firestore";

const CheckIn = (props: IRoom) => {
  
  const dispatch = useDispatch();  
  const [isModalOpen, setIsModalOpen] = useState(false);

  let dateCheckIn:string, dateCheckOut:string

  const { RangePicker } = DatePicker;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if(dateCheckIn && dateCheckOut){
      console.log(dateCheckIn, dateCheckOut);
      dispatch({type:'CHECK-IN', payload:{room: props.room,  checkIn:dateCheckIn, checkOut:dateCheckOut}});
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
  
  dayjs.extend(customParseFormat);

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };
  
  const disabledRangeTime: RangePickerProps['disabledTime'] = (_, type) => {
    if (type === 'start') {
      return {
        disabledHours: () => range(0, 0),
        disabledMinutes: () => range(1, 30).concat(range(31, 60))
      };
    }
    return {
      disabledHours: () => range(0, 0),
      disabledMinutes: () => range(1, 30).concat(range(31, 60))
    };
  };

  /* useEffect( ()=>{
      const dateNow:number = Date.now()
      const roomN:number = props.room
      if(props.room){
        const dCheckOut:string|undefined = props.checkOut
      
        if(dateNow > Date.parse(dCheckOut)) {
          dispatch({type:'CHECK-IN', payload:{room:roomN,  checkIn:'', checkOut:''}});
        }
      }
  }, []); */

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {props.checkIn ? "Edit" : "Check In"}
      </Button>
      <Modal
        title={'Check In & Check Out for Room '+ props.room}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <RangePicker  value = {props.checkIn ? [dayjs(props.checkIn, 'YYYY-MM-DD HH:mm'), dayjs(props.checkOut, 'YYYY-MM-DD HH:mm')] : ''}
          onChange={(d, d2)=>{ 
            console.log(d, d2);
            dateCheckIn= d2[0]
            dateCheckOut= d2[1]
          }} 
          disabledDate={disabledDate}
          disabledTime={disabledRangeTime}
          showTime={{
            hideDisabledOptions: true,
            defaultValue: [dayjs("00:00:00", "HH:mm"), dayjs("11:59", "HH:mm")],
          }}
          format="YYYY-MM-DD HH:mm"
        />
      </Modal>
    </>
  );
};

export default CheckIn;