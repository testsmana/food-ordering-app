'use client';
import {useSession} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import UserTabs from "../../components/layout/UserTabs";
import EditableImage from "../../components/layout/EditableImage";

export default function ProfilePage(){
    const session= useSession();
    const [userName, setUserName]=useState('');
    const [image,setImage]=useState('');
    const [phone,setPhone]=useState('');
    const [streetAddress, setStreetAddress]=useState('');
    const [postalCode, setPostalCode]=useState('');
    const [city, setCity]=useState('');
    const [country, setCountry]=useState('');
    const [isAdmin, setIsAdmin]=useState(false);
    const [profileFetched, setProfileFetched]=useState(false);

    const {status}=session;

    useEffect(()=>{
     if(status==='authenticated'){
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
      fetch('/api/profile').then(response => {
        response.json().then(data => {

          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        })
      });


     }
    },[session,status]);

    async function handleProfileInfoUpdate(ev){
      ev.preventDefault();

      const savingPromise=new Promise(async (resolve, reject) =>{
        const response = await fetch('/api/profile',{
        method:'PUT',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: userName,
          image,
          phone,
          streetAddress,
          postalCode,
          city,
          country
        }),
        });
        if(response.ok)
          resolve();
        else 
          reject();
        
        });

    await toast.promise(
    savingPromise,
           {
             loading: 'Saving...',
             success: 'Profile saved!',
             error: 'Error',
           }
    );
        
    }
  

    if(status === 'loading' || !profileFetched) {
        return (<section className="">
               <h1 className="text-center text-primary text-4xl mb-4 mt-4">Loading...</h1>
               </section>);
    }

    if(status === 'unauthenticated') {
        return redirect('/login');
    }

    

    return(
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin}/>
            <div className="max-w-md mx-auto mt-8">
              
              <div className="grid items-start gap-4" style={{gridTemplateColumns: '.2fr .8fr'}}>
                <div>
                  <EditableImage link={image} setLink={setImage}/>
                </div>
                
                
                <form className="grow" onSubmit={handleProfileInfoUpdate}>
                <label>First and last name</label>
                <input type="text" placeholder="First and last name" value={userName} onChange={ev => setUserName(ev.target.value)}/>
                <label>Email</label>
                <input type="email" placeholder="Email" disabled value={session.data.user.email}/>
                <label>Phone Number</label>
                <input type="tel" placeholder="Phone number (e.g. +3556* **** ***)" value={phone} onChange={ev => setPhone(ev.target.value)}/> 
                <label>Street Address</label>
                <input type="text" placeholder="Street Address" value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)}/>
                <div className="flex gap-2">
                  <div>
                    <label>Postal Code</label>
                    <input type="text" placeholder="Postal Code" value={postalCode} onChange={ev => setPostalCode(ev.target.value)}/>
                  </div>
                  
                  <div>
                    <label>City</label>
                    <input type="text" placeholder="City" value={city} onChange={ev => setCity(ev.target.value)}/>
                  </div>
                 
                </div>
                <label>Country</label>
                <input type="text" placeholder="Country" value={country} onChange={ev => setCountry(ev.target.value)}/>
                <button type="submit">Save</button>
                </form>
              </div>    

            </div>
        </section>
    );
}