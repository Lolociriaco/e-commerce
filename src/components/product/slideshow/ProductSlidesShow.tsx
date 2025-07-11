"use client"

import React from 'react'
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperObject } from 'swiper';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './slideshow.css';

interface Props{
    images: string[];
    title: string;
    className?: string;
}

export const ProductSlidesShow = ({ images, title, className }: Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

    return (
        <div className={className}>
            <Swiper
                style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
                '--swiper-navigation-size': '30px',
                } as React.CSSProperties
                }
                spaceBetween={10}
                navigation={true}
                autoplay={{ 
                    delay: 2500
                }}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                className="mySwiper2"
            >
                {
                    images.map(image => (
                        <SwiperSlide key={image}>
                            <Image 
                                width={1024}
                                height={700}
                                src={ `/products/${ image }` }
                                alt={ title }
                                className="md:rounded-lg object-fill"
                                />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {
                    images.map(image => (
                        <SwiperSlide key={image}>
                            <Image 
                                width={300}
                                height={300}
                                src={ `/products/${ image }` }
                                alt={ title }
                                className="md:rounded-lg object-cover"
                                //style={{objectFit: 'fill'}}
                                />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
      );
    }
    