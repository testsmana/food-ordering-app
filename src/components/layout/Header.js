'use client';
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "../icons/ShoppingCart";
import Bars from "../icons/Bars";

function AuthLinks({status,userName}){
  if(status === 'authenticated'){
    return (
    <>
    <Link href={'/profile'} className="whitespace-nowrap">
      Hello {userName}</Link>
    <button onClick={()=> signOut()} className="bg-primary text-white px-8 py-2 rounded-full ">Logout</button>
  
    </>
    );
    }
  if(status === 'authenticated'){
    return(
      <>
    <Link href={'/login'} >Login</Link>
    <Link href={'/register'} className="bg-primary text-white px-8 py-2 rounded-full ">Register</Link>
    </>
    );
  }
}


export default function Header (){
    const session= useSession();
    const status=session?.status;
    const userData= session.data?.user;
    let userName= userData?.name || userData?.email;
    const {cartProducts}=useContext(CartContext);
    const [mobileNavOpen, setMoblieNavOpen]=useState(false);
    if(userName && userName.includes(' ')){
      userName=userName.split(' ')[0];
    }
    return (
        <header>
        <div className="flex items-center md:hidden justify-between">
          <Link className="text-primary font-semibold text-2xl" href="/">Restaurant Name</Link>
          <div className="flex gap-6 items-center">
            
            <Link href={'/cart'} className="relative"><ShoppingCart/>
            {cartProducts?. length>0 && (
            <span className="absolute -top-2 -right-3 bg-primary text-white text-sm py-1 px-1 rounded-full leading-3">{cartProducts.length}</span>
            )}
            </Link>
            <button className="p-1" onClick={()=>setMoblieNavOpen(prev=> !prev)}><Bars/></button>

          </div>
          
        </div>
        {mobileNavOpen && (
        <div 
        onClick={()=>setMoblieNavOpen(false)}
        className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex mt-8 flex-col gap-2 text-center text-gray-500 font-semibold">
        <Link href={'/'}>Home</Link>
        <Link href={'/menu'}>Menu</Link>
        <Link href={'/#about'}>About</Link>
        <Link href={'/#contact'}>Contact</Link>
        <AuthLinks status={status} userName={userName}/>
        </div>
        )}

        

        <div className="hidden md:flex items-center justify-between">

        
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link className="text-primary font-semibold text-2xl" href="/">
        Restaurant Name</Link>
        <Link href={'/'}>Home</Link>
        <Link href={'/menu'}>Menu</Link>
        <Link href={'/#about'}>About</Link>
        <Link href={'/#contact'}>Contact</Link>
      </nav>
      
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        <AuthLinks status={status} userName={userName}/>
        
        <Link href={'/cart'} className="relative"><ShoppingCart/>
        {cartProducts?. length>0 && (
          <span className="absolute -top-2 -right-3 bg-primary text-white text-sm py-1 px-1 rounded-full leading-3">{cartProducts.length}</span>
        )}
        </Link>
       
        
      </nav>
      </div>
     </header>
    );
}