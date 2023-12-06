import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";

export default function Home() {
  return (
    <>
     <Hero/>
     <HomeMenu/>
     <section className="text-center my-16" id="about">
      <SectionHeaders subHeader={'Our Story'} mainHeader={'About us'} />

      <div className="mx-auto max-w-xl text-gray-500 mt-4 flex flex-col gap-4">
      <p> 
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
      </p>

      <p>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
      </p>

      <p>
      t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
      </p>
      </div>
     </section>
     
     <section className="text-center my-8" id="contact">
     <SectionHeaders subHeader={'Don\'t hesitate'} mainHeader={'Contact us'}/>
     <div className="mt-8 flex justify-center ">
      <a className=" w-[290px] flex justify-center items-center text-2xl text-gray-500 border border-gray-300 rounded-xl px-6 py-2" href="tel:+355691234123">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[30px] h-[30px]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>&nbsp;Call us now
      </a>
    </div>

    <div className="mt-8 flex justify-center ">
      <a className=" w-[290px] flex justify-center items-center text-2xl text-white  bg-green-500 border border-gray-300 rounded-xl px-6 py-2" aria-label="Chat on WhatsApp" href="https://wa.me/355691234123">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[35px] h-[35px]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
</svg>
&nbsp;Chat on WhatsApp
      </a>
    </div>
    {/*  
    <div className="mt-8 flex justify-center">
      <a aria-label="Chat on WhatsApp" href="https://wa.me/355691234123"> <Image width={280} height={280} alt="Chat on WhatsApp" src="/WhatsAppButtonGreenMedium.png" />
      </a>
    </div>*/}
     
    </section>
    </>
  )
}
