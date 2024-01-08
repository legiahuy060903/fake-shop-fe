
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next";
import { Autoplay, Pagination, Navigation, EffectFade, Parallax } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { Col, Row } from "antd";
import Banner from "@/components/banner";


const Home = async () => {
    const session = await getServerSession(authOptions);
    return (
        <div className=' xs:w-full lg:w-11/12 w-10/12 mx-auto min-h-full mt-3'>
            <Banner />
            <p>{JSON.stringify(session)}</p>
        </div>

    )
}

export default Home