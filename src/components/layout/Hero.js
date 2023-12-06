'use client';
import Image from "next/image";
import Right from "../icons/Right";
import Right2 from "../icons/Right2";
import React from 'react';
import  { ScrollRotate } from 'react-scroll-rotate';

export default function Hero(){
    return(
        <section className="hero mt-1">
        {/* here you can change the size of primary image ex. py-12 smaller image, now it is py-24 */}
        <div className="md:py-24 py-8"> 
           <h1 className="text-4xl font-semibold">
            Everything<br/> is better<br/> with a <span className="text-primary">Pizza</span>
           </h1>
            <p className="my-6 text-gray-500 text-sm">
                Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life
            </p>
            <div className="flex gap-4 text-sm">
                <button className="flex justify-center bg-primary uppercase  items-center flex gap-2 text-white px-4 py-2 rounded-full">Order Now
                <Right2/>
                </button>
                <button className="flex border-0 items-center gap-2 px-4 py-2 text-gray-600 font-semibold">Learn more
                    <Right/>
                </button>
            </div>
         
        </div>
        <ScrollRotate method={"perc"}>
        <div className="relative hidden md:block">
        <Image src={'/Macha-2048x2048.png'} width={600} height={600} alt={'unable to display'} />
        
        </div>
        </ScrollRotate>
        </section>
    );
}