'use client';
import { useProfile } from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage(){
    const {loading, data}=useProfile();
    const [user, setUser]=useState(null);
    const {id}=useParams();
    useEffect(()=>{
      fetch('/api/profile?_id='+id).then(res=>{
        res.json().then(user=>{
          setUser(user);
        });
      })
    },[]);

    async function handleSaveButtonClick(ev, data){
      ev.preventDefault();
      const promise=new Promise(async(resolve,reject)=>{
        const res= await fetch('/api/profile', {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({...data, _id:id}),
      });
      if(res.ok)
        resolve();
      else
        reject();
      });
      
      await toast.promise(promise, {
        loading: 'Saving user...',
        success: 'User saved',
        error: 'Error',
      });
    }

    if(loading){
        return(<h1 className="text-center text-primary text-4xl mb-4 mt-4">Loading...</h1>);
    }

    if(!data.admin){
        return(<h1 className="text-center text-primary text-4xl mb-4 mt-4">Not an admin!</h1>);
    }

    return(
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
            <div className="max-w-lg mx-auto mt-8">
              <UserForm user={user} onSave={handleSaveButtonClick} />
            </div>
        </section>
    );
}