"use client"
import React from 'react';
import { Avatar, Button, Checkbox, Divider, Form, Input, message } from 'antd';

import { Roboto } from 'next/font/google'
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation'

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})


type FieldType = {
    username?: string;
    password?: string;
};

const FormLogin: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const route = useRouter()
    const searchParams = useSearchParams();
    const path = searchParams.get('callbackUrl') || "/"
    const onFinish = async ({ username, password }: FieldType) => {
        const res = await signIn("credentials", { redirect: false, username, password });
        if (!res?.ok) {
            messageApi.open({
                type: 'error',
                content: res?.error
            });
        } else route.push(path)


    };

    return (
        <div className='bg-white p-4 shadow-md rounded-md '>
            {contextHolder}
            <div className={`${roboto.className} text-center p-4 font-medium text-2xl text-main`}>Đăng nhập vào Fake-Book</div>
            <Form
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                <span className='font-medium px-3 py-5'>Email: </span>
                <Form.Item
                    name="username"
                    rules={[{ required: true, type: "email", message: 'Vui lòng nhập email !' }]}
                >
                    <Input size='large' />
                </Form.Item>
                <span className='font-medium px-3 py-5'>Mật khẩu: </span>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
                >
                    <Input.Password size='large' />
                </Form.Item>
                <Divider />

                <button className='w-full flex justify-center items-center bg-main h-10 rounded-lg'>
                    <div className=' text-white flex justify-end items-center text-base'>Đăng nhập</div>
                </button>
            </Form>
            <Divider />
            <div className='w-full flex justify-between items-center'>
                <span>Quên mật khẩu</span>
                <span>Đăng kí</span>
            </div>
            <div className='flex justify-center gap-4 items-center'>
                <Avatar
                    src="./logo/gg.png"
                    size={64}
                    onClick={() => signIn('google', { callbackUrl: path })}
                />
                <Avatar
                    src="./logo/git.png"
                    size={44}
                    onClick={() => signIn('github', { callbackUrl: path })}
                />
            </div>

        </div>

    )
}

export default FormLogin;