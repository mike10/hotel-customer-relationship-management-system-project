"use client";
import React, { useEffect } from "react";
import {
    Button,
    Checkbox,
    Form,
    message,
    Input,
    Flex,
    FormProps,
    CheckboxProps,
} from "antd";
import { useRouter } from "next/navigation";
import { getAuthSelector, getMessSelector } from "@/utils/appSlice";
import { useSelector, useDispatch } from "react-redux";
import { FieldType } from "@/utils/constants";

const Auth: React.FC = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();
    const auth = useSelector(getAuthSelector);
    const mess = useSelector(getMessSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (mess) messageApi.error(mess);
    }, [mess]);

    useEffect(()=>{
        if(auth)
          router.push('/mainlayout')
      }, [auth])

    const onFinish: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
        if (values.username && values.password) {

            dispatch({ type: "REGISTRATION", payload: { ...values } });
            if (values.remember) localStorage.setItem("username", values.username);
        }
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
        errorInfo
    ) => {
        messageApi.error("Failed:" + errorInfo);
    };

    const onChange: CheckboxProps["onChange"] = (e) => {
        form.setFieldValue("remember", e.target.checked);
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
                    rules={[
                        {
                            required: true,
                            type: "email",
                            message: "This is not a valid email!",
                        },
                    ]}
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
                >
                    <Checkbox onChange={onChange}>Remember me</Checkbox>
                </Form.Item>

                <Flex justify="center" align="center">
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Registration
                        </Button>
                    </Form.Item>
                </Flex>
            </Form>
        </>
    );
};

export default Auth;
