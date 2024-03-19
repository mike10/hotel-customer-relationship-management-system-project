'use client'
import React from 'react';
import { Button, Checkbox, Form, type FormProps, Input, Flex } from 'antd';

import { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { registration, enter } from '@/app/redux/userSlice'
import { useSelector, useDispatch } from 'react-redux';


type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};




/*
const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log('Success:', values);
  createUserWithEmailAndPassword(auth, values?.username, values?.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  
      
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
*/


const Auth: React.FC = () => {
  	
  const [form] = Form.useForm();
  const router = useRouter()
  const dispatch = useDispatch()
  
  return (
    <Form
    form={form}
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    //onFinish={onFinish}
    //onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Username"
      name="username"
      
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input/>
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<FieldType>
      name="remember"
      valuePropName="checked"
      wrapperCol={{ offset: 8, span: 16 }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>
    <Flex justify='center' align='center'>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit"  onClick={()=>{
            let values = form.getFieldsValue()
            dispatch(registration(values))
            router.push(`/mainlayout/`)
        }}>
          Reg
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="button" onClick={() => {
          let values = form.getFieldsValue()
          dispatch(enter(values))
          router.push(`/mainlayout/`) 
        }}>
          Enter
        </Button>
      </Form.Item>
    </Flex>
          <p>mike10@ukr.net</p>
          <p>123456</p>
  </Form>
  )
  
}

export default Auth