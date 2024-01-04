"use client"

import { Drawer, Popover, Col, Avatar, Menu, message, Badge } from 'antd';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';
type PopoverCustomProps = {
    children: ReactNode;
    cart: any;
};
const PopoverCustom: React.FC<PopoverCustomProps> = ({ children, cart }) => {
    const { push } = useRouter()
    const headerPop = () => {
        return (
            <div className="pop-cart-header">
                <div className='pop-cart-header__text' >Sản phẩm đã thêm</div>
                <div className="btn-nav-cart cs" onClick={() => push('/cart')}>
                    Xem Giỏ hàng
                </div>
            </div>
        );
    };
    const contentCartPopopover = () => {
        return (
            <div className="pop-cart-body">
                <div className="pop-cart-content">
                    {/* {cart?.map((item, index) => {
                        return (
                            <div className="row-pop-cart cs" key={`${index}-bv`}>
                                <img
                                    src={item.detail.thumbnail}
                                />
                                <div className="content-text">{item.detail?.name.slice(0, 50)} ...</div>
                                <div>{formatGia(item.detail?.price)}</div>
                            </div>
                        );
                    })} */}
                </div>
            </div>
        );
    };
    return (
        <Popover
            style={{
                width: 500,
            }}
            overlayClassName='popover-cart-over'
            placement="bottomLeft"
            title={headerPop}
            className="popover-cart"
            content={contentCartPopopover}
        >
            {children}
        </Popover>
    )
}

export default PopoverCustom