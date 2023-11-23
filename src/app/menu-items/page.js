'use client';
import Link from "next/link";
import { useProfile } from "../../components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Right from "@/components/icons/Right";

export default function MenuItemsPage(){
    
  const {loading, data}=useProfile();

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
        <section className="mt-8 max-w-md mx-auto">
          <UserTabs isAdmin={true}/>
          <div className="mt-8">
            <Link href={'/menu-items/new'} className="button flex"><span>Create new menu item</span><Right/></Link>
          </div>
          
        </section>
    )
}