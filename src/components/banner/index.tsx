'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Banner = () => {

    const slides = ["https://res.cloudinary.com/dbru1hnfl/image/upload/v1688113276/banner/Stem_mainbanner_T6_Slide_840x320_igoi9v.jpg",
        "https://res.cloudinary.com/dbru1hnfl/image/upload/v1688113267/banner/Backtoschool_trangtong_mainbanner_Slide_840x320_u1q2t5.jpg",
        "https://res.cloudinary.com/dbru1hnfl/image/upload/v1688113262/banner/Fahasasalethu3_mainbanner_Bo1_Slider_840x320_xfmrvp.jpg",
        "https://res.cloudinary.com/dbru1hnfl/image/upload/v1688113225/banner/HoaCuQuy_Banner_840x320_T623_c5w5ip.jpg"
    ]

    return (
        <>
            <div className='overflow-hidden mx-auto flex gap-x-3 bg-white rounded-md '>
                <div className='xs:w-full sm:w-[70%] relative bg-white rounded-md '>
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination]}
                        loop={false}
                        slidesPerView={1}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 2500
                        }}
                        className="mySwiper"
                    >
                        {slides?.map((slideContent, index) => (
                            <SwiperSlide key={index}>
                                <img src={slideContent} />
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>

                <div className='xs:hidden sm:flex sm:w-[30%] flex-col gap-y-2'>
                    <div className='flex-1'>
                        <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2023/VnPayT6_392%20x%20156.png" alt="" className='w-full h-full rounded-md' />
                    </div>
                    <div className='flex-1'>
                        <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2023/PNJT6_392x156.png" alt="" className='w-full h-full rounded-md' />
                    </div>
                </div>
            </div >
            <div className="bg-white rounded-md grid xs:grid-cols-2 place-content-center md:grid-cols-4 place-items-center gap-5 my-3 p-2">
                <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2023/SubBannerT6_Coupon_310x210-06.png" />
                <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2023/TrangBalo_Resize_310x210.png" />
                <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2023/Tamlinh_mainbanner_T6_Smallbanner_310x210.png" />
                <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2023/TuSachThieuNhi_T623_Banner_SmallBanner_310x210.png" />
            </div>
            <div className='my-3 px-1 py-3 bg-white rounded-md grid md:grid-cols-8  place-content-center xs:grid-cols-4 gap-2 place-items-center' >

                <div className='flex flex-col items-center gap-y-2 overflow-hidden'>
                    <img src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_FlashSale_Thuong_120x120.png" width={50} />
                    <span className='break-text'>Flash sale</span>
                </div>
                <div className='flex flex-col items-center gap-y-2 overflow-hidden'>
                    <img src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_MaGiamGia_8px_1.png" width={50} />
                    <span className='break-text'>Giảm Giá </span>
                </div>
                <div className='flex flex-col items-center gap-y-2 overflow-hidden'>
                    <img src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_SanPhamMoi_8px_1.png" width={50} />
                    <span className='break-text'>New book</span>
                </div>
                <div className='flex flex-col items-center gap-y-2 overflow-hidden'>
                    <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2023/F3_HomepageT6.png" width={50} />
                    <span className='break-text'>Sale thứ 3</span>
                </div>
                <div className='flex flex-col items-center gap-y-2 overflow-hidden'>
                    <img src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_VanPhongPham_Th%C6%B0%C6%A1ng_120x120.png" width={50} />
                    <span className='break-text'> Văn phòng</span>
                </div>
                <div className='flex flex-col items-center gap-y-2 overflow-hidden'>
                    <img src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_PhienChoCu_8px_1.png" width={50} />
                    <span className='break-text'>Sách cũ</span>
                </div>
                <div className='flex flex-col items-center gap-y-2 overflow-hidden'>
                    <img src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_VanHoc_8px_1.png" width={50} />
                    <span className='break-text'> Văn học</span>
                </div>
                <div className='flex flex-col items-center gap-y-2 overflow-hidden'>
                    <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2023/Icon_KinhTe_Thuong.png" width={50} />
                    <span className='break-text'> Kinh tế</span>
                </div>
            </div>
        </>
    )
}

export default Banner;
