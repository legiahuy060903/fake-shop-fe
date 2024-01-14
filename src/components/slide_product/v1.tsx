"use client"
import React, { memo, } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Keyboard } from 'swiper/modules';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import "@/styles/slide.css";
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import Product from "../product/v1";
import SkeletonCustom from "../skeleton/v1";
import withBaseMethod, { WithBaseMethodProps } from "@/hooks/withBaseMethod";

type SlideProductProps = {
    data: IProduct[];
} & WithBaseMethodProps;
const SlideProduct = ({ data, mount }: SlideProductProps) => {

    if (!mount) return <SkeletonCustom />
    return (
        <div className='h-400'>
            <Swiper
                className="mySwiper2"
                spaceBetween={10}
                loop={true}
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
                navigation={{
                    nextEl: ".review-swiper-button-next",
                    prevEl: ".review-swiper-button-prev",
                }}
            >
                <button className='review-swiper-button-prev' > <AiOutlineArrowLeft size={20} /></button>
                {
                    data.map((item: IProduct) => <SwiperSlide key={item.id}>
                        <Product item={item} />
                    </SwiperSlide>)
                }
                <button className='review-swiper-button-next'><AiOutlineArrowRight size={20} /></button>
            </Swiper>
        </div>
    )
}

export default withBaseMethod(memo(SlideProduct))


