'use client';
import Image from "next/image";
import Right from "../icons/Right";
import Right2 from "../icons/Right2";
import React from 'react';
import  { ScrollRotate } from 'react-scroll-rotate';
import Link from "next/link";

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
            <div className="md:flex gap-4 text-sm">
                <Link href={'/menu'} className="flex justify-center bg-primary uppercase w-min items-center flex gap-2 text-white px-4 py-2 my-4 font-semibold rounded-full">Look&nbsp;at&nbsp;our&nbsp;menu
                <Right2/>
                </Link>
                <Link href={'/#about'} className="flex border-0 items-center gap-2 px-4 py-2 text-gray-600 font-semibold">Our&nbsp;Story
                    <Right/>
                </Link>
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