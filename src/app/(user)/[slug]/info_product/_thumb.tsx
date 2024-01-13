
"use client"
import "./thumbnail.css"
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import { FreeMode, Navigation, Thumbs, Keyboard, Zoom } from 'swiper/modules';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import withBaseMethod, { WithBaseMethodProps } from "@/hooks/withBaseMethod";
import { useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide, SwiperRef, useSwiper } from "swiper/react";

type SlideProductProps = {
    images: string[];
} & WithBaseMethodProps;
const ThumbsSwiper = ({ images, mount }: SlideProductProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="w-full flex flex-col">
            <div className="w-full">

                <Swiper
                    loop={true}
                    spaceBetween={10}
                    keyboard={{
                        enabled: true,
                    }}
                    centeredSlides={true}
                    zoom={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs, Keyboard, Zoom]}
                    className="m-3 h-[450px] max-h-[450px] flex justify-center items-center "
                    navigation={{
                        prevEl: '.prev-mySwiper3',
                        nextEl: '.next-mySwiper3',
                    }}

                >
                    <button className='prev-mySwiper3' > <MdOutlineKeyboardArrowLeft size={30} /></button>
                    {images?.map(item => (
                        <SwiperSlide key={item}>
                            <img src={item} className="m-auto w-full h-full object-scale-down" />
                        </SwiperSlide>
                    ))}
                    <button className='next-mySwiper3'><MdOutlineKeyboardArrowRight size={30} /></button>
                </Swiper>
            </div>
            {mount && <div className="w-[95%] mx-auto h-36">
                <Swiper
                    //@ts-ignore
                    onSwiper={setThumbsSwiper}
                    keyboard={{
                        enabled: true
                    }}
                    modules={[FreeMode, Navigation, Thumbs, Keyboard]}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    className="mySwiper4"
                >
                    {images?.map(item => (
                        <SwiperSlide key={item}>
                            <img src={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            }
        </div>
    );
}

export default withBaseMethod(ThumbsSwiper)