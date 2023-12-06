'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import AddressInputs from "../../components/layout/AddressInputs";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import CartProduct from "../../components/menu/CartProduct";

export default function CartPage(){
    const {cartProducts, removeCartProduct}=useContext(CartContext);
    const [address, setAddress]=useState({});
    const {data:profileData}=useProfile();
    useEffect(()=>{
        if(typeof window !== 'undefined'){
            if(window.location.href.includes('canceled=1')){
                toast.error('Payment failed 😔');
            }
        }
    },[]);
    
    useEffect(()=>{
        if(profileData?.city){
            const {phone, streetAddress, city, postalCode,country}=profileData;
            const addressFormProfile={phone,streetAddress,city,postalCode,country};
            setAddress(addressFormProfile);
        }
    }, [profileData]);

    let subtotal=0;
    for (const prod of cartProducts){
        subtotal +=cartProductPrice(prod);
    }

    function handleAddressChange(propName,value){
       setAddress(prevAddress => ({...prevAddress, [propName]:value}));
    }

    async function proceedToCheckout(ev){
      ev.preventDefault();

       const promise= new Promise((resolve, reject)=> {
        fetch('/api/checkout', {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response)  => {
        if(response.ok){
            resolve();
            window.location = await response.json();
        } else {
            reject();
        }
      });
      });
      await toast.promise(promise, {
        loading:'Preparing your order...',
        success:'Redirecting to payment...',
        error:'Something went wrong... Please try again later.',
      })
       
    }
    
    if(cartProducts?.length===0){
        return(
            <section className="mt-8 text-center">
                <SectionHeaders mainHeader="Cart"/>
                <p className="mt-4 uppercase text-gray-500 leading-4 font-semibold">Your shopping cart is empty.</p>
            </section>
        );
    }


    return(
        <section className="max-w-4xl mx-auto mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart"/>
            </div>
            
            <div className="mt-8 grid gap-8 grid-cols-2">
                <div>
                     {cartProducts?.length>0 && cartProducts.map((product, index)=>(
                        <div key={index} className="flex gap-4 border-b py-4 items-center">
                        <div className="w-24"><Image src={product.image} alt={'Unable to display'} width={240} height={240}/></div>
                        <div className="grow">
                            <h3 className="font-semibold">{product.name}</h3>
                                {product.size && (<div className="text-sm">Size: <span>{product.size.name}</span></div>)}
                                {product.extras?.length > 0 && (<div className="text-sm text-gray-500">{product.extras.map(extra=>(
                                    <div key={extra.name}>{extra.name} €{extra.price}</div>
                                  ))}
                                </div>
                                )}
                        </div>
                            <div className="text-lg font-semibold">€{cartProductPrice(product)}</div>
                            <div className="ml-2"><button type="button" onClick={()=>removeCartProduct(index)} className="text-primary p-2"><Trash/></button></div>
                            
                            
                        </div>
                        
                        ))}
                        {/* if you want to change the delivery fee, change €5 to €x and €{subtotal+5} to €{subtotal+x}  */}
                        <div className="py-2 pr-[70px] flex justify-end items-center"><div className="text-gray-500">Subtotal:<br/>Delivery:<br/>Total:</div><div className=" font-semibold pl-1 text-right">€{subtotal}<br/>€5<br/>€{subtotal+5}</div></div>
                        
                        </div>
                <div>
                <div className="bg-gray-100 p-4 rounded-lg ">
                    <h2>Checkout</h2>
                    <form onSubmit={proceedToCheckout}>
                        <AddressInputs addressProp={address} setAddressProp={handleAddressChange}/>
                        <button type="submit">Pay €{subtotal+5}</button>
                    </form>
                </div>
                </div>
            </div>
        </section>
    );
}