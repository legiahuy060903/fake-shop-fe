"use client"
import React, { useEffect, useRef, useState, memo, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Keyboard } from 'swiper/modules';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import "@/styles/slide.css";
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import Product from "../product/v1";
import { useHasMounted } from "@/hooks/hasMount";
import SkeletonCustom from "../skeleton/v1";

const SlideProduct = ({ data }: { data: IProduct[] }) => {
    const mount = useHasMounted();
    if (!mount) {
        return <SkeletonCustom />
    }
    return (
        <div className='h-400'>
            <Swiper
                className="mySwiper2"
                spaceBetween={10}
                loop={true}
                slidesPerView={5}
                rewind={true}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    1440: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    }
                }}
                modules={[Pagination, Navigation, Keyboard]}
                keyboard={true}
            >
                <button className='review-swiper-button-prev' > <AiOutlineArrowLeft size={20} /></button>
                {
                    data.map((item, i) => <SwiperSlide key={item.id}>
                        <Product item={item} />
                    </SwiperSlide>)
                }
                <button className='review-swiper-button-next'><AiOutlineArrowRight size={20} /></button>
            </Swiper>
        </div>
    )
}

export default memo(SlideProduct)


