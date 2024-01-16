"use client"
import { useIsVisible } from '@/hooks/useIsVisible'
import withBaseMethod, { WithBaseMethodProps } from '@/hooks/withBaseMethod'
import { formatTimeAgo, url } from '@/utils/const'
import { Button, Divider, Form, Modal, Rate, Typography, notification, Input } from 'antd'
import { divide } from 'lodash'
const { TextArea } = Input;
const { Title } = Typography;
import { useSession } from 'next-auth/react'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
type props = {
    product: IProduct
} & WithBaseMethodProps
type meta = {
    _page?: number;
    total?: number;
}
const Comment = ({ product, sendRequest, session }: props) => {
    const [api, contextHolder] = notification.useNotification();

    const [modal, setModal] = useState(false)
    const [listComment, setListComment] = useState<IComment[]>([])
    const refContainer = useRef(null);

    const [meta, setMeta] = useState<meta>({ total: 0, _page: 1 });
    const visible = useIsVisible(refContainer);
    const fecthData = useCallback(async () => {
        const { data, meta: metaRes } = await sendRequest<IBackendRes<IComment[]>>({
            url: url + `comments?_page=${meta._page}&_limit=6&_product=in_${product.id}&_sort=createdAt`,
            headers: { Authorization: `Bearer ${session.data?.access_token}` }
        });
        if (data && data.length > 0) {
            setListComment(data)
            metaRes && setMeta(metaRes);
        }
    }, [product.id, session, meta])
    useEffect(() => {
        if (visible) fecthData()
    }, [visible, meta._page]);

    const handleModal = () => {
        if (session.data && session.data.user) setModal(true)
        else api.warning({ message: 'Vui lòng đăng nhập trước' });
    }
    const onSubmit = async (value: any) => {
        const { success, data, message } = await sendRequest<IBackendRes<string>>({
            url: url + 'comments', method: "POST", body: value,
            headers: { Authorization: `Bearer ${session.data?.access_token}` }
        });
        if (success) {
            api.success({ message: data })
            await fecthData();
            setModal(false)
        } else api.warning({ message })
    }
    return (
        <div className='bg-white px-5 '>
            {contextHolder}
            <Divider />
            <Title level={4}>Đánh giá {product.name}</Title>
            <div className='flex justify-between items-center mt-2'>
                <div className='flex flex-col items-center gap-4 w-2/3'>
                    <div className='text-yellow-400 font-medium text-3xl flex items-end'> <div className='text-5xl pr-1'>{product.rating} </div> / 5</div>
                    <Rate value={product.rating} disabled style={{ fontSize: 20 }} />
                    <span className='text-blue-600'>{meta.total} đánh giá</span>
                </div>
                <div className='w-1/3'>
                    <button className=' bg-main text-white p-4 rounded-md' onClick={handleModal}>Đánh giá</button>
                </div>
            </div>
            <Divider />
            <div className='flex flex-col h-auto border-0.5 border-white border-solid shadow-md p-2 rounded-lg  mt-4' ref={refContainer}>
                {listComment.length > 0 && listComment.map(item => {
                    return <div className='flex flex-col gap-4' key={item.id}>
                        <div className='font-medium flex justify-between'>
                            <span>{item.user.username}</span>
                            <span className='text-gray-500'>Thời gian : {formatTimeAgo(item.createdAt)}</span>
                        </div>
                        <Rate value={item.rate} disabled style={{ fontSize: '14px' }} />
                        <p className='mt2'>{item.content}</p>
                        <div className='flex gap-3 text-sm items-center'>
                            <span className='flex items-center'> <AiOutlineLike /> <p>Hữu ích</p></span>
                            <span className='flex items-center'> <AiOutlineDislike /> <p>Không hữu ích</p></span>
                        </div>
                        <Divider />
                    </div>
                })}
            </div>
            <Modal title={<div className='text-center'>Bình luận</div>} open={modal} onCancel={() => setModal(false)} footer={null}>
                <Form
                    name="comment"
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onSubmit}
                    initialValues={{
                        user: session.data?.user?.id,
                        product: product.id
                    }}
                >
                    <Form.Item
                        label="Đánh giá"
                        name="rate"
                        rules={[{ required: true, message: 'Vui lòng đánh giá sao !' }]}
                    >
                        <Rate />
                    </Form.Item>
                    <Form.Item
                        label="Nội dung"
                        name="content"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung !' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="user"
                        hidden
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="product"
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    {session.data?.user?.id}
                    <div className='w-full flex justify-end'>
                        <button className='px-5 py-2 bg-main text-white rounded-md font-medium'>Gửi</button>
                    </div>

                </Form>
            </Modal>
        </div>
    )
}

export default withBaseMethod(Comment) 