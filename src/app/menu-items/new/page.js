'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function NewMenuItemPage(){
    
    const [redirectToItems, setRedirectToItems]=useState(false);
    const {loading, data}=useProfile();
    async function handleFormSubmit(ev, data){
      ev.preventDefault();
      const savingPromise=new Promise(async (resolve, reject) => {
        const response= await fetch('/api/menu-items', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type':'application/json'},
      });
      if (response.ok)
        resolve();
      else
        reject();
      });

      await toast.promise(savingPromise, {
        loading: 'Saving this tasty item',
        success: 'Saved',
        error: 'Error',
      });
      
      setRedirectToItems(true);
      
    }

    if(redirectToItems){
      return redirect('/menu-items');
    }

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
        <div className="max-w-lg mx-auto mt-8">
            <Link href={'/menu-items'} className="button">
                <Left/>
                <span>Show all menu items</span>
                
            </Link>
        </div>
        <MenuItemForm menuItem={null} onSubmit={handleFormSubmit}/> 
        
        
      </section>
    );
}