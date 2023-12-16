'use client';
import {signIn} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage(){
    const session= useSession();
    const {status}=session;
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [loginInProgress, setLoginInProgress]=useState(false);
    async function handleFormSubmit(ev){
        ev.preventDefault();
        setLoginInProgress(true);
        
        await signIn('credentials', {email, password, redirect: false })
        .then(({ ok, error }) => {
            if (ok) {
                location.replace("/");
            } else {
                console.log(error)
                toast.error("Credentials do not match!");
            }
        })



        setLoginInProgress(false);
    }

    if(status === 'authenticated') {
        return redirect('/');
    }

    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
        <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input  name="email"
                type="email" 
                placeholder="email" 
                value={email} 
                disabled={loginInProgress}
                onChange={ev => setEmail(ev.target.value)}/>
                
        <input  name="password"
                type="password" 
                placeholder="password" 
                value={password} 
                disabled={loginInProgress}
                onChange={ev => setPassword(ev.target.value)}/>
        <button disabled={loginInProgress}
                type="submit"
                >Login</button>
                <div className="my-4 text-center text-gray-500">or login with provider</div>
        <button type="button"
                className="flex gap-4 justify-center" 
                onClick={()=>signIn('google', {callbackUrl:'/'})}>
                    <Image src={'/google-logo.png'} alt={'Unable to display'} width={24} height={24} />
                    Login with Google
                    </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
                Don&apos;t Have an Account? <Link className="underline" href={'/register'}>Register here &raquo;</Link>
                </div>

        </form>
        </section>
    );
}