'use client';
import { useProfile } from "@/components/UseProfile";
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { dataTime } from "../../libs/datetime";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function OrdersPage(){
    const [orders,setOrders]=useState([]);
    const [loadingOrders,setLoadingOrders]=useState(true);
    const {loading, data:profile}=useProfile();
    const session= useSession();
    const {status}=session;



    useEffect(()=> {
       if(status==='authenticated'){
       fetchOrders();}
    }, []);

    function fetchOrders(){
        setLoadingOrders(true);
        fetch('/api/orders').then(res=> {
            res.json().then(orders => {
                setOrders(orders.reverse());
                setLoadingOrders(false);
            })
        })
    }

    if(loadingOrders){
        return(<h1 className="text-center text-primary text-4xl mb-4 mt-4">Loading...</h1>);
    }
    
    if(status === 'loading') {
        return (<section className="">
               <h1 className="text-center text-primary text-4xl mb-4 mt-4">Loading...</h1>
               </section>);
    }

    if(status === 'unauthenticated') {
        return redirect('/login');
    }

    return(
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={profile.admin}/>
            <div className="mt-8">
              {orders?.length=== 0 && (<p className="mt-4 uppercase text-gray-500 leading-4 font-semibold text-center">You don&apos;t have any order.</p>)}
              {orders?.length >0 && orders.map(order=>(
                <div key={order._id} className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6">
                    <div className="grow flex flex-col md:flex-row items-center gap-6">
                        <div>
                          <div className={(order.paid ? 'bg-green-500' : 'bg-red-400')+ ' p-2 rounded-md text-white w-28 text-center flex justify-center'}>
                            {order.paid ? <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
</svg>
<div>&nbsp;Paid&nbsp;</div></>  : <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg><div>&nbsp;Not&nbsp;Paid&nbsp;</div></>}
                        </div>
                        </div>
                        <div className="grow">
                            <div className="flex gap-2 items-center mb-1">
                                 <div className="grow">{order.userEmail}</div>
                                 <div className="text-gray-600 text-sm">{dataTime(order.createdAt)}</div>
                           </div>
                           <div  className="text-sm text-gray-500" >{order.cartProducts.map(p=>p.name).join(', ')}</div>
                    </div>
                    <div>
                    <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                        <Link href={"/orders/"+order._id} className="button">Show order</Link>
                        </div>    
                    </div>
                    </div>
                </div>
              ))}  
           </div>
            
            
        </section>
    );
}