'use client';
import Link from "next/link";
import { useProfile } from "../../components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Right from "@/components/icons/Right";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MenuItemsPage(){
  const [menuItems,setMenuItems]=useState([]);  
  const {loading, data}=useProfile();
  useEffect(()=>{
    fetch('/api/menu-items').then(res=>{
      res.json().then(menuItems=>{
        setMenuItems(menuItems);
      })
    })
  }, []);

    if(loading){
      return (
            <h1 className="text-center text-primary text-4xl mb-4 mt-4">Loading...</h1>
             );
    }

    if(!data.admin){
      return (
            <h1 className="text-center text-primary text-4xl mb-4 mt-4">Not an admin!</h1>
            );
    }

    return(
        <section className="mt-8">
          <UserTabs isAdmin={true}/>
          <div className="mt-8  max-w-lg mx-auto">
            <Link href={'/menu-items/new'} className="button flex"><span>Create new menu item</span><Right/></Link>
          </div>
          <div className="mt-8  max-w-lg mx-auto">
          {menuItems?.length > 0 &&  (<h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>)}
            <div className="grid grid-cols-3 gap-2">
              {menuItems?.length > 0 && menuItems.map(item =>
             <Link key={item._id} href={'/menu-items/edit/'+item._id} className="bg-gray-200 rounded-lg p-4 ">
               <div className="relative">
                <Image src={item.image} alt={'Unable to display'} width={200} height={200} className="rounded-md text-center" />
               </div>
               <div className="text-center">
                {item.name}
               </div>
               
             </Link>
            )}
            </div>
            </div>
          
        </section>
    );
}