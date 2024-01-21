"use client"
import PaginationCustom from '@/components/pagination/v1';
import { useIsVisible } from '@/hooks/useIsVisible'
import withBaseMethod, { WithBaseMethodProps } from '@/hooks/withBaseMethod'
import { formatTimeAgo, tagProduct, url } from '@/utils/const'
import { Button, Divider, Form, Modal, Rate, Typography, notification, Input } from 'antd'
const { TextArea } = Input;
const { Title } = Typography;
PaginationCustom
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
type props = {
    product: IProduct
} & WithBaseMethodProps
type meta = {
    _page?: number;
    _limit?: number;
    total?: number;
}
const Comment = ({ product, sendRequest, session, customRevalidateTag }: props) => {
    const { data: dataSession } = session;
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [modal, setModal] = useState(false)
    const [listComment, setListComment] = useState<IComment[]>([])
    const refContainer = useRef(null);
    const [meta, setMeta] = useState<meta>({ total: 0, _page: 1, _limit: 6 });
    const visible = useIsVisible(refContainer);
    const fecthData = useCallback(async () => {
        const { data, meta: metaRes } = await sendRequest<IBackendRes<IComment[]>>({
            url: url + `comments?_page=${meta._page}&_limit=6&_product=${product.id}&idUser=${dataSession?.user.id}`,
            token: dataSession?.access_token
        });
        if (data && data.length > 0) {
            setListComment(data)
            metaRes && setMeta(metaRes);
        }
    }, [product.id, dataSession, meta._page])
    const repLike = useCallback(async (type: string, id: number) => {
        if (dataSession?.user) {
            const body = { like: type, comment: id, user: dataSession?.user.id }
            await sendRequest<IBackendRes<string>>({
                url: url + 'comments/like',
                method: "POST", body, token: dataSession?.access_token
            })
            fecthData()
        }
    }, [dataSession?.user])
    useEffect(() => {
        if (visible == true) fecthData()
    }, [visible, meta._page, product]);

    const handleModal = () => {
        if (dataSession && dataSession.user) setModal(true)
        else api.warning({ message: 'Vui lòng đăng nhập trước' });
    }
    const onSubmit = async (value: any) => {
        const { success, data, message } = await sendRequest<IBackendRes<string>>({
            url: url + 'comments', method: "POST", body: value, token: dataSession?.access_token
        });
        if (success) {
            api.success({ message: data })
            customRevalidateTag(tagProduct)
            setModal(false);
            form.resetFields();
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
            <div className='flex flex-col h-auto border-0.5 border-white border-solid shadow-md p-2 rounded-lg  my-4' ref={refContainer}>
                {listComment.length > 0 && listComment.map(item => {
                    return <div className='flex flex-col gap-4' key={item.id}>
                        <div className='font-medium flex justify-between'>
                            <span>{item.id === dataSession?.user.id ? item.user.username : "Tôi"}</span>
                            <span className='text-gray-500'>Thời gian : {formatTimeAgo(item.createdAt)}</span>
                        </div>
                        <Rate value={item.rate} disabled style={{ fontSize: '14px' }} />
                        <p className='mt-2 overflow-hidden break-words leading-6'>{item.content}</p>
                        <div className='flex gap-3 text-sm items-center'>
                            <span className={`flex items-center cursor-pointer ${item?.isLiked?.like === "like" ? "text-main" : "text-gray-500"} `} onClick={() => repLike("like", item.id)}> <AiOutlineLike /> <p>Hữu ích ({item.likeCount})</p></span>
                            <span className={`flex items-center cursor-pointer ${item?.isLiked?.like === "dislike" ? "text-main" : "text-gray-500"}`} onClick={() => repLike("dislike", item.id)}><AiOutlineDislike /> <p>Không hữu ích ({item.dislikeCount})</p></span>
                        </div>
                        <Divider />
                    </div>
                })}
                <div className='w-full flex justify-center items-center'>
                    <PaginationCustom setMeta={setMeta} total={meta.total} _page={meta._page} pageSize={meta._limit} />
                </div>

            </div>
            <Modal title={<div className='text-center'>Bình luận</div>} open={modal} onCancel={() => setModal(false)} footer={null}>
                <Form
                    form={form}
                    name="comment"
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onSubmit}
                    initialValues={{
                        user: dataSession?.user?.id,
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
                    <div className='w-full flex justify-end'>
                        <button className='px-5 py-2 bg-main text-white rounded-md font-medium'>Gửi</button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default withBaseMethod(memo(Comment)) 