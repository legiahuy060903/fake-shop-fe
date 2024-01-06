"use client"
import "@/styles/header.css";
import { useRouter } from 'next/navigation';
import { BiCategoryAlt, BiUser } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Input, Dropdown, Space, Drawer, Popover, Col, Avatar, Menu, message, Badge } from 'antd';
import { LayoutTwoTone, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import PopoverCustom from "./_sub/pop";
import { omit } from 'lodash';
import Link from 'next/link';
import useQueryConfig from '@/hooks/useSearchParam';
import { sendRequest } from '@/hooks/sendRequest';
import { url } from '@/utils/const';
import { signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react"
interface IMenu {
    label: any,
    key: string | number
}

const Header = () => {
    const router = useRouter();
    const { data } = useSession()
    const [listCategory, setListCategory] = useState<IMenu[] | undefined>();
    const [search, setSearch] = useState('');
    const [widthImage, setWidthImage] = useState(150);
    const [open, setOpen] = useState(false);
    const queryConfig = useQueryConfig();


    const fetchData = useCallback(async () => {

        const response = await sendRequest<IBackendRes<ICategory[]>>({ url: `${url}categories` });
        if (response && response.data) {
            let data: IMenu[] = response?.data?.map((item: ICategory) => ({
                key: item.id,
                label: <Link className='item-cat' href={{
                    pathname: '/shop', search: new URLSearchParams({
                        category: item.id.toString()
                    }).toString()
                }}>
                    {item.name}
                </Link>
            }));
            setListCategory(data)
        }

    }, []);

    useEffect(() => {
        fetchData();
    }, []);
    const itemsAccount: MenuProps['items'] = [
        {
            label: (
                <label onClick={() => router.push('/user')}>
                    Quản lý tài khoản
                </label>
            ),
            key: 'account',
        },
        {
            label: (
                <label onClick={() => router.push('/user/history')}>
                    Lịch sử mua hàng
                </label>
            ),
            key: 'history',
        },
        {
            label: (
                <label onClick={() => router.push('/user/pass')}>
                    Đổi mật khẩu
                </label>
            ),
            key: 'pass',
        },
        {
            label: (
                <label onClick={() => signOut()}>
                    Đăng xuất
                </label>
            ),
            key: 'logout',
        },
    ];
    // if (user?.role === 1) {
    //     itemsAccount.unshift({
    //         label: (
    //             <label
    //                 onClick={() => {
    //                     router.push('/admin');
    //                 }}
    //             >
    //                 Trang Quản Trị
    //             </label>
    //         ),
    //         key: 'admin',
    //     });
    // }

    const handleBoxCat = (e: any) => {
        if (window.innerWidth < 768) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }
    // window.addEventListener("resize", function () {
    //     (window.innerWidth <= 1024) ? setWidthImage(120) : setWidthImage(150);
    // });
    // let last = 0;
    // window.addEventListener('scroll', () => {
    //     if (!window.location.pathname.startsWith('/admin')) {
    //         let headers = document.querySelector('.header-area');
    //         let scrollTop = window.scrollY || document.documentElement.scrollTop;
    //         (scrollTop > last) ? headers.style.top = '-120px' : headers.style.top = '0px';
    //         last = scrollTop;
    //     }
    // });

    const onSubmitSearch = (e: any) => {
        if (search.length > 0) {
            const config = queryConfig.sort
                ? omit(
                    {
                        ...queryConfig,
                        search: search
                    },
                    ['sort', 'filterMinPrice', 'filterMaxPrice']
                )
                : {
                    ...queryConfig,
                    search: search
                }
            setSearch('');
            // router.push({
            //     // pathname: '/shop',
            //     // search: createSearchParams(config).toString()
            // })
        }
    }
    const cart: any = []
    const wish: any = []
    return (
        <div className='bg-white w-full xs:h-[64px] md:h-[84px] text-gray-500 sticky top-0 z-50 transition duration-300'>
            <div className=' w-full xs:px-5 lg:px-16 flex flex-wrap items-center justify-between h-full m-auto cursor-pointer'>
                <Link href={'/'} className=' xs:w-0 md:w-3/12'> <img src={"logo.png"} width={widthImage} /></Link>
                <div>
                    <Dropdown
                        overlayStyle={{ top: 74, left: "25%" }}
                        menu={{
                            items: listCategory || []
                        }}
                    >
                        <div className='nav_category  me-3'>
                            <a onClick={(e) => handleBoxCat(e)}>
                                <Space>
                                    <BiCategoryAlt size={35} />
                                </Space>
                            </a>
                        </div>
                    </Dropdown>
                </div>
                <div className=' flex-1 h-[75%] relative flex items-center'>
                    <Input placeholder="Tìm kiếm sản phẩm" value={search} onPressEnter={(e) => onSubmitSearch(e)} onChange={(e) => setSearch(e.target.value)} size='large' style={{ padding: 10 }} />
                    <button className='absolute right-3 bg-main text-[aliceblue] rounded-xl py-2 px-4 flex justify-center items-center' onClick={() => onSubmitSearch('submit')}><AiOutlineSearch /></button>
                </div>
                <div className=" xs:w-1/12 sm:w-3/12 ms-2 flex justify-end items-center gap-x-5 ">
                    <div className="nav-icon ">
                        <Badge count={wish?.length ?? 0} size={'small'} overflowCount={10}>
                            <AiOutlineHeart size={25} onClick={() => router.push('/wish')} />
                        </Badge>
                        <span className='xs:hidden xl:block'>Yêu thích</span>
                    </div>
                    <PopoverCustom cart={cart}>
                        <div className="nav-icon ">
                            <Badge count={cart?.length ?? 0} size={'small'} overflowCount={10}>
                                <AiOutlineShoppingCart size={25} onClick={() => router.push('/cart')} />
                            </Badge>
                            <span className='xs:hidden xl:block'>Giỏ hàng</span>
                        </div>
                    </PopoverCustom>
                    <div className="nav-icon "  >
                        {data?.user ? (
                            <Dropdown menu={{ items: itemsAccount }} trigger={['click']} placement="bottomRight" >
                                <div className='flex flex-col gap-1.5 items-center'>
                                    {data.user.avatar ? <Avatar src={data.user.avatar} size={25} /> : <BiUser size={24} />}
                                    <span className='xs:hidden xl:block' >hyhyuh</span>
                                </div>
                            </Dropdown>
                        ) : (
                            <>
                                <BiUser size={25} onClick={() => router.push('/login')} />
                                <span className='xs:hidden xl:block' onClick={() => router.push('/login')}>Tài Khoản</span>
                            </>
                        )}

                    </div>

                </div>
            </div>
            <Drawer
                title={`Danh mục sản phẩm`}
                placement="left"
                size={'default'}
                onClose={() => setOpen(false)}
                open={open}
            >
                {listCategory?.map((item, i) => {
                    return (
                        <Col key={`image-${i}`}>
                            <div className='item-cat'>{item?.label}</div>
                        </Col>
                    );
                })}
            </Drawer>
        </div >

    )
}

export default Header
