'use client' 
import React, { useEffect } from 'react';
import { Button, Checkbox, Form, message, Input, Flex, FormProps, CheckboxProps } from 'antd';
import type { RootState } from '@/app/utils/store'
import { useRouter } from 'next/navigation'
import { registration, enter } from '@/app/utils/appSlice'
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
    
    if (values.remember && values.username && values.password) {
      localStorage.setItem('username', values.username);
      localStorage.setItem('password', values.password);
    }
  };
  
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    let username:string|null = localStorage.getItem('username')
    let password:string|null = localStorage.getItem('password');
    
    if (username && password) {
      dispatch(enter({ username, password }));
    } 
  }, []);

  const onChange: CheckboxProps["onChange"] = (e) => {
    form.setFieldValue('remember', e.target.checked)
  };
  
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
          label="Email"
          rules={[{  required: true, type: 'email', message: "This is not a valid email!" }]}
          name="username"
          
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
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
          onChange={onChange}
        >
          <Checkbox >Remember me</Checkbox>
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