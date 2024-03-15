
'use client'
import React from 'react';
import { Button, Checkbox, Form, type FormProps, Input, Flex } from 'antd';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword } from "firebase/auth";



type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const firebaseConfig = {
  apiKey: "AIzaSyDUiAodSQPNH8r0s6F3BfaMS-b1zX1LKUI",
  authDomain: "finance-blog-f38f2.firebaseapp.com",
  databaseURL: "https://finance-blog-f38f2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "finance-blog-f38f2",
  storageBucket: "finance-blog-f38f2.appspot.com",
  messagingSenderId: "140148358827",
  appId: "1:140148358827:web:99183db5674ede654981ee"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

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



const Auth: React.FC = () => {
  	
  const [form] = Form.useForm();
  
  return (
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
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
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
        <Button type="primary" htmlType="submit" >
          Reg
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="button" onClick={() => {
          
          let values = form.getFieldsValue()
          console.log('values', values);
          
           signInWithEmailAndPassword(auth, values.username, values.password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('Signed in', user);
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
        }}>
          Enter
        </Button>
      </Form.Item>
    </Flex>
    
  </Form>
  )
  
}

export default Auth