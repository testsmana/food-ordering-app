import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
     <Hero/>
     <HomeMenu/>
     <section className="text-center my-16">
      <SectionHeaders subHeader={'Our Story'} mainHeader={'About us'} />

      <div className="mx-auto max-w-xl text-gray-500 mt-4 flex flex-col gap-4">
      <p> 
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
      </p>

      <p>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
      </p>

      <p>
      t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
      </p>
      </div>
     </section>
     
     <section className="text-center my-8">
     <SectionHeaders subHeader={'Don\'t hesitate'} mainHeader={'Contact us'}/>
     <div className="mt-8">
      <a className="text-3xl underline text-gray-500" href="tel:+355691234123">
      +355 69 12 34 123
      </a>
     </div>
    </section>
    </>
  )
}
