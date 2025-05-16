import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SearchForm from '../components/SearchForm';

function Home() {
    return (
        <div className="container">
            <h1>Find Medical Centers</h1>
            <Swiper spaceBetween={30} slidesPerView={1} className="swiper">
                <SwiperSlide>
                    <div className="swiper-slide">
                        <p>Book your appointment today!</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-slide">
                        <p>Find the best medical centers near you!</p>
                    </div>
                </SwiperSlide>
            </Swiper>
            <SearchForm />
        </div>
    );
}

export default Home;