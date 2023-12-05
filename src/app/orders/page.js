'use client';
import { useProfile } from "@/components/UseProfile";
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { dataTime } from "../../libs/datetime";
import Link from "next/link";

export default function OrdersPage(){
    const [orders,setOrders]=useState([]);
    const [loadingOrders,setLoadingOrders]=useState(true);
    const {loading, data:profile}=useProfile();



    useEffect(()=> {
       fetchOrders();
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
    

    return(
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={profile.admin}/>
            <div className="mt-8">
              {orders?.length=== 0 && (<p className="mt-4 uppercase text-gray-500 leading-4 font-semibold text-center">You don't have any order.</p>)}
              {orders?.length >0 && orders.map(order=>(
                <div className="bg-gray-100 mb-2 p-4 rounded-lg flex items-center gap-6">
                    <div className="grow flex items-center gap-6">
                        <div>
                          <div className={(order.paid ? 'bg-green-500' : 'bg-red-400')+ ' p-2 rounded-md text-white w-24 text-center'}>
                            {order.paid ? 'Paid' : 'Not Paid'}
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