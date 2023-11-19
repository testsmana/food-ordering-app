import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu(){
    return (
        <section className="">
        <div className="absolute left-0 right-0 w-full justify-start">
            <div className="h-48 w-48 absolute left-[130px] -z-10 -top-[260px] text-left">
             <Image src={'/banner-bg-3.png'} alt={'Unable to display'} width={382} height={300}/>
            </div>
            {/* 
            <div className="absolute left-0 -top-[170px] text-left -z-10 ">
             <Image src={'/sallad1.png'} alt={'Unable to display'} width={107} height={195}/>
            </div>
            */}
            {/* if you want the image of pizza to be above of borzilok write -z-10 in className below */}
            <div className="h-40 w-40 absolute -top-40  right-40">
             <Image src={'/banner-bg-5.png'} alt={'Unable to display'} width={239} height={167}/>
            </div>
        </div>
        <div className="text-center mb-4">
        <SectionHeaders 
        subHeader={'check out'}
        mainHeader={'Menu'} />
        </div>
        <div className="grid grid-cols-3 gap-4">
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>  
        </div>
        {/* add a chili pepper in the butom of the page */}
        {/* 
        <div className="absolute left-0 right-0 w-full justify-start">
            <div className="h-48 w-48 absolute left-24 -z-10 top-[160px] text-left">
             <Image src={'/chili-pepper-690x518-removebg-preview.png'} alt={'Unable to display'} width={382} height={300}/>
            </div>
            </div>
        */}
        </section>
    );
}