"use client"

import React from 'react'
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import './slideshow.css';

interface Props{
    images: string[];
    title: string;
    className?: string;
}

export const ProductMobileSlidesShow = ({ images, title, className }: Props) => {


    return (
        <div className={className}>
            <Swiper
                style={{
                    width: '100%',
                    height: '500px'
                }}
                pagination
                autoplay={{ 
                    delay: 2500
                }}
                modules={[FreeMode, Thumbs, Autoplay, Pagination]}
                className="mySwiper2"
            >
                {
                    images.map(image => (
                        <SwiperSlide key={image}>
                            <Image 
                                width={700}
                                height={600}
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
    