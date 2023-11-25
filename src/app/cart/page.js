'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import AddressInputs from "../../components/layout/AddressInputs";
import { useProfile } from "@/components/UseProfile";

export default function CartPage(){
    const {cartProducts, removeCartProduct}=useContext(CartContext);
    const [address, setAddress]=useState({});
    const {data:profileData}=useProfile();
    
    useEffect(()=>{
        if(profileData?.city){
            const {phone, streetAddress, city, postalCode,country}=profileData;
            const addressFormProfile={phone,streetAddress,city,postalCode,country};
            setAddress(addressFormProfile);
        }
    }, [profileData]);

    let total=0;
    for (const prod of cartProducts){
        total +=cartProductPrice(prod);
    }

    function handleAddressChange(propName,value){
       setAddress(prevAddress => ({...prevAddress, [propName]:value}));
    }
    return(
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart"/>
            </div>
            
            <div className="mt-8 grid gap-8 grid-cols-2">
                <div>{cartProducts?.length === 0 && (<div>Not products in your shopping cart</div>)}
                     {cartProducts?.length>0 && cartProducts.map((product, index)=>(
                        <div className="flex gap-4 border-b py-4 items-center">
                            <div className="w-24"><Image src={product.image} alt={'Unable to display'} width={240} height={240}/></div>
                            <div className="grow">
                                <h3 className="font-semibold">{product.name}</h3>
                                    {product.size && (<div className="text-sm">Size: <span>{product.size.name}</span></div>)}
                                    {product.extras?.length > 0 && (<div className="text-sm text-gray-500">{product.extras.map(extra=>(
                                        <div>{extra.name} €{extra.price}</div>
                                      ))}
                                    </div>
                                    )}
                                </div>
                                <div className="text-lg font-semibold">€{cartProductPrice(product)}</div>
                                <div className="ml-2"><button type="button" onClick={()=>removeCartProduct(index)} className="text-primary p-2"><Trash/></button></div>
                            </div>
                        ))}
                        <div className="py-2 text-right pr-16"><span className="text-gray-500">Subtotal:</span><span className="text-lg font-semibold pl-1">€{total}</span></div>
                        </div>
                <div className="bg-gray-100 p-4 rounded-lg ">
                    <h2>Checkout</h2>
                    <form>
                        <AddressInputs addressProp={address} setAddressProp={handleAddressChange}/>
                        <button type="submit">Pay €{total}</button>
                    </form>
                </div>
            </div>
        </section>
    );
}