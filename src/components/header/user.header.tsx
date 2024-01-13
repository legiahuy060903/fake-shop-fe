"use client"
import "@/styles/header.css";
import { BiCategoryAlt, BiUser } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { useCallback, useEffect, useState } from 'react';
import { Input, Dropdown, Space, Drawer, Popover, Col, Avatar, Menu, message, Badge } from 'antd';
import { LayoutTwoTone, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Link from 'next/link';
import { url } from '@/utils/const';
import { signOut } from "next-auth/react";
import FilterShop from "../filter-product/v1";
import PopoverCustom from "./_sub/pop";

import withBaseMethod, { WithBaseMethodProps } from "@/hooks/withBaseMethod";
import useDebounce from "@/hooks/useDebounce ";
interface IMenu {
    label: any,
    key: string | number
}

const Header = ({ session, router, pathname, contexts, queryString, sendRequest, queryConfig }: WithBaseMethodProps) => {
    const { data, status } = session;
    const [listCategory, setListCategory] = useState<IMenu[] | undefined>();

    const [search, setSearch] = useState<string>(queryConfig.search || '');
    const debouncedValue = useDebounce(search, 500);
    const { setCategory, setOpenDrawFilter, openDrawFilter } = contexts;
    const fetchData = useCallback(async () => {
        const response = await sendRequest<IBackendRes<ICategory[]>>({ url: `${url}categories` });
        if (response && response.data) {
            setCategory(response.data)
            let data: IMenu[] = response?.data?.map((item: ICategory) => ({
                key: item.id,
                label: <Link className='item-cat' href={{
                    pathname: '/shop', search: queryString.stringify({ ...queryConfig, _category: `in_${item.id}` })
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
    useEffect(() => {
        onSubmitSearch()
    }, [debouncedValue]);
    const handleBoxCat = () => {
        if (window.innerWidth < 768) setOpenDrawFilter(true)
    }

    const onSubmitSearch = () => {
        search.length > 0 && router.push("/shop?" + queryString.stringify({ ...queryConfig, search: search.length > 0 ? search : undefined }));
    }

    const cart: any = []
    const wish: any = []
    return (
        <div className='bg-white w-full xs:h-[64px] h-[84px] text-gray-500 sticky top-0 z-50 transition duration-300'>
            <div className=' w-full xs:px-5 px-16 flex flex-wrap items-center justify-between h-full m-auto cursor-pointer'>
                <Link href={'/'} className=' xs:w-0 w-3/12'> <img src={"logo.png"} width={130} /></Link>
                <div className="md:hidden inline-block">
                    <Dropdown
                        overlayStyle={{ top: 74, left: "25%", position: "fixed", zIndex: 10 }}
                        menu={{
                            items: listCategory || []
                        }}
                    >
                        <div className='nav_category  me-3'>
                            <BiCategoryAlt size={35} />
                        </div>
                    </Dropdown>
                </div>
                <div className='md:block hidden nav_category  me-3'>
                    <a onClick={handleBoxCat}>
                        <BiCategoryAlt size={35} />
                    </a>
                </div>
                <div className=' flex-1 h-[75%] relative flex items-center'>
                    <Input placeholder="Tìm kiếm sản phẩm" value={search} onChange={(e) => setSearch(e.target.value)} size='large' style={{ padding: 10 }} />
                    <button className='absolute right-3 bg-main text-[aliceblue] rounded-xl py-2 px-4 flex justify-center items-center' onClick={onSubmitSearch}><AiOutlineSearch /></button>
                </div>
                <div className=" xs:w-1/12 w-3/12 xs:ms-2 flex justify-end items-center gap-x-5 ">
                    <div className="nav-icon ">
                        <Badge count={wish?.length ?? 0} size={'small'} overflowCount={10}>
                            <AiOutlineHeart size={25} onClick={() => router.push('/wish')} />
                        </Badge>
                    </div>
                    <PopoverCustom cart={cart}>
                        <div className="nav-icon ">
                            <Badge count={cart?.length ?? 0} size={'small'} overflowCount={10}>
                                <AiOutlineShoppingCart size={25} onClick={() => router.push('/cart')} />
                            </Badge>
                        </div>
                    </PopoverCustom>
                    <div className="nav-icon "  >
                        {data?.user ? (
                            <Dropdown menu={{ items: itemsAccount }} trigger={['click']} placement="bottomRight" >
                                <div className='flex flex-col gap-1.5 items-center'>
                                    {data.user.avatar ? <Avatar src={data.user.avatar} size={25} /> : <BiUser size={24} />}
                                </div>
                            </Dropdown>
                        ) : (
                            <>
                                <BiUser size={25} onClick={() => router.push('/login?callbackUrl=' + pathname)} />
                            </>
                        )}

                    </div>

                </div>
            </div>
            <Drawer
                title={`Danh mục sản phẩm`}
                placement="left"
                size={'default'}
                onClose={() => setOpenDrawFilter(false)}
                open={openDrawFilter}
            >
                <FilterShop />
            </Drawer>
        </div >

    )
}

export default withBaseMethod(Header) 
