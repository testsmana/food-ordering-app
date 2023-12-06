'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function OrderPage(){
    const {clearCart}=useContext(CartContext);
    const [order,setOrder]=useState();
    const [loadingOrders,setLoadingOrders]=useState(true);
    const {id}=useParams();
    useEffect(()=>{
       if(typeof window.console !== "undefined"){
        if(window.location.href.includes('clear-cart=1')){
            clearCart();
        }
       }
       if(id){
        setLoadingOrders(true);
        fetch('/api/orders?_id='+id).then(res=>{
            res.json().then(orderData=>{
                setOrder(orderData);
                setLoadingOrders(false);
            });
        })
       }

    }, []);

    let subtotal=0;
    if(order?.cartProducts){
        for(const product of order?.cartProducts){
            subtotal+=cartProductPrice(product);
        }
    }
    
    if(loadingOrders){
        return(<h1 className="text-center text-primary text-4xl mb-4 mt-4">Loading...</h1>);
    }

    return(
        <section className="max-w-4xl mx-auto mt-8 ">
            <div className="text-center">
                <SectionHeaders mainHeader="Your order"/>
                <div className="mt-4">
                   {!order.paid && <p className="uppercase text-gray-500 leading-4 font-semibold mb-2">This payment has failed.</p>}
                   {order.paid && <div>
                    <p className="uppercase text-gray-500 leading-4 font-semibold mb-2">Thanks for your order.</p>
                    <p className="uppercase text-gray-500 leading-4 font-semibold ">We will call you when your order will be on the way.</p>
                    </div>}
                   
                </div>
            </div>
        {order && (
            <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                    {order.cartProducts.map(product=>(
                        <CartProduct key={product._id} product={product}/>
                    ))}
                    <div className="py-2 pr-[3px] flex justify-end items-center">
                        <div className="text-gray-500">Subtotal:<br/>Delivery:<br/>Total:</div> 
                        <div className="font-semibold pl-1 text-right">€{subtotal}<br/>€5<br/>€{subtotal+5}</div>
                    </div>
                    
                </div>
                <div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <AddressInputs disabled={true} addressProp={order}/>
                    </div>
                </div>
            </div>
        )}
            
            
        </section>
    )
}