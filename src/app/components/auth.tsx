'use client'
import React, { useEffect } from 'react';
import { Button, Checkbox, Form, message, Input, Flex, FormProps } from 'antd';
import type { RootState } from '@/app/redux/store'
import { useRouter } from 'next/navigation'
import { registration, enter } from '@/app/redux/appSlice'
import { useSelector, useDispatch } from 'react-redux';


type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

let regButtonPass: boolean = true




const Auth: React.FC = () => {
  	
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter()
  const auth = useSelector((state: RootState) => state.app.auth);
  const mess = useSelector((state: RootState) => state.app.mess);
  const dispatch = useDispatch()
  
  useEffect(() => {
    
  }, []);

  if(auth) {
    router.push(`/mainlayout/`)
  }

  const info = (message:string) => {
    messageApi.error(message);
  };

  if (mess != '') {
    info(mess)
  }

  const onFinish: FormProps<FieldType>["onFinish"] = (values:FieldType) => {
    if (regButtonPass == true) {
      dispatch(registration(values));
    } else {
      dispatch(enter(values));
    }
    console.log('values.remember ', values.remember);
    
    if (values.remember) {
      sessionStorage.setItem('username', values.username);
      sessionStorage.setItem('password', values.password);
    }
  };
  
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    //let values2 = form.getFieldsValue();
    let username:string|null = sessionStorage.getItem('username')
    let password:string|null = sessionStorage.getItem('password');
    console.log('username password: ', username, password);
    
    if (username && password) {
      dispatch(enter({ username, password }));
    }
    
  }, []);

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          //valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Flex justify="center" align="center">
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                regButtonPass = true
              }}
            >
              Reg
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                regButtonPass = false
              }}
            >
              Enter
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </>
  );
  
}



export default Auth