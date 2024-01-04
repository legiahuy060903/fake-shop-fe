"use client"

import { useRouter } from 'next/navigation';
import { BiCategoryAlt, BiUser } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Input, Dropdown, Space, Drawer, Popover, Col, Avatar, Menu, message, Badge, MenuProps } from 'antd';
import { LayoutTwoTone, UserOutlined } from '@ant-design/icons';

import PopoverCustom from "./_sub/pop";
import { omit } from 'lodash';
import Link from 'next/link';
import useQueryConfig from '@/hooks/useSearchParam';
import { sendRequest } from '@/hooks/sendRequest';
import { url } from '@/utils/const';


const Header = () => {
    const router = useRouter()
    const [listCategory, setListCategory] = useState<ICategory[]>([]);
    const [search, setSearch] = useState('');
    const [widthImage, setWidthImage] = useState(150);
    const [open, setOpen] = useState(false);
    const queryConfig = useQueryConfig();



    // const getData = async () => {
    //     let data = (await callCategory()).map(item => ({
    //         key: item.id,
    //         label: (<Link className='item-cat' to={{
    //             pathname: '/shop', search: createSearchParams({
    //                 ...queryConfig,
    //                 category: item.id
    //             }).toString()
    //         }}>
    //             {item.name}
    //         </Link>)
    //     }));
    //     setItems(data);
    // };


    const fetchData = useCallback(async () => {
        const response = await sendRequest<IBackendRes<IModelPaginate<ICategory[]>>>({ url: `${url}categories` });
        console.log(response.data)
        // setListCategory(response.data)
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
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
                <label >
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
        <div className='header-area '>
            <div className='header-area__container cs'>
                <Link href={'/'} className='logo'> <img src={"logo.png"} width={widthImage} /></Link>

                <div className='nav_search'>
                    <Dropdown overlayClassName='container-category '
                    // menu={{
                    //     items
                    // }}
                    >
                        <div className='nav_category  me-4'>
                            <a onClick={(e) => handleBoxCat(e)}>
                                <Space>
                                    <BiCategoryAlt size={35} />
                                </Space>
                            </a>
                        </div>
                    </Dropdown>
                    <Input placeholder="Tìm kiếm sản phẩm" value={search} onPressEnter={(e) => onSubmitSearch(e)} onChange={(e) => setSearch(e.target.value)} />
                    <button className='box-search' onClick={() => onSubmitSearch('submit')}><AiOutlineSearch /></button>
                </div>
                <div className="nav-area-icon ps-2">
                    <div className="nav-icon  wish-list">
                        <Badge count={wish?.length ?? 0} size={'small'} overflowCount={10}>
                            <AiOutlineHeart size={25} onClick={() => router.push('/wish')} />
                        </Badge>

                        <span className='nav-cover-text'>Yêu thích</span>
                    </div>
                    <PopoverCustom cart={cart}>
                        <div className="nav-icon">


                            <Badge count={cart?.length ?? 0} size={'small'} overflowCount={10}>
                                <AiOutlineShoppingCart color='grey' size={25} onClick={() => router.push('/cart')} />
                            </Badge>

                            <span className='nav-cover-text'>Giỏ hàng</span>

                        </div>
                    </PopoverCustom>
                    <div className="nav-icon "  >
                        {/* {isAuthenticated && user?.name ? (
                            <Dropdown menu={{ items: itemsAccount }} trigger={['click']} placement="bottomRight" >
                                <div className='space-avatar'>
                                    <Avatar src={user.avatar} size={25} />
                                    <span className='nav-cover-text' >{user?.name}</span>
                                </div>
                            </Dropdown>
                        ) : (
                            
                        )} */}
                        <>
                            <BiUser size={25} onClick={() => router.push('/login')} />
                            <span className='nav-cover-text' onClick={() => router.push('/login')}>Tài Khoản</span>
                        </>
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
                {/* {listCategory?.map((item, i) => {
                    return (
                        <Col key={`image-${i}`}>
                            <div className='item-cat'>{item?.label}</div>
                        </Col>
                    );
                })} */}
            </Drawer>
        </div >

    )
}

export default Header
