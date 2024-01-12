"use client"
import "@/styles/header.css";
import { usePathname, useRouter } from 'next/navigation';
import { BiCategoryAlt, BiUser } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
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
import { AppContext } from "@/contexts/store";
import FilterShop from "../filter-product/v1";
interface IMenu {
    label: any,
    key: string | number
}

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { data, status } = useSession();
    const [listCategory, setListCategory] = useState<IMenu[] | undefined>();
    const [search, setSearch] = useState('');
    const [widthImage, setWidthImage] = useState(150);
    const queryConfig = useQueryConfig();
    const { setCategory, setOpenDrawFilter, openDrawFilter } = useContext(AppContext)

    const fetchData = useCallback(async () => {
        const response = await sendRequest<IBackendRes<ICategory[]>>({ url: `${url}categories` });
        if (response && response.data) {
            setCategory(response.data)
            let data: IMenu[] = response?.data?.map((item: ICategory) => ({
                key: item.id,
                label: <Link className='item-cat' href={{
                    pathname: '/shop', search: new URLSearchParams({
                        _category: `in_${item.id}`
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

    const handleBoxCat = () => {
        if (window.innerWidth < 768) setOpenDrawFilter(true)
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

        }
    }
    const cart: any = []
    const wish: any = []
    return (
        <div className='bg-white w-full xs:h-[64px] h-[84px] text-gray-500 sticky top-0 z-50 transition duration-300'>
            <div className=' w-full xs:px-5 px-16 flex flex-wrap items-center justify-between h-full m-auto cursor-pointer'>
                <Link href={'/'} className=' xs:w-0 w-3/12'> <img src={"logo.png"} width={widthImage} /></Link>
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
                    <Input placeholder="Tìm kiếm sản phẩm" value={search} onPressEnter={(e) => onSubmitSearch(e)} onChange={(e) => setSearch(e.target.value)} size='large' style={{ padding: 10 }} />
                    <button className='absolute right-3 bg-main text-[aliceblue] rounded-xl py-2 px-4 flex justify-center items-center' onClick={() => onSubmitSearch('submit')}><AiOutlineSearch /></button>
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

export default Header
