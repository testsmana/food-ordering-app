'use client';
import { useState } from "react";
import EditableImage from "../../components/layout/EditableImage";
import ClipboardDocumentCheck from "../../components/icons/ClipboardDocumentCheck";
import { useProfile } from "../UseProfile";

export default function UserForm({user, onSave}){
    const [userName, setUserName]=useState(user?.name || '');
    const [image,setImage]=useState(user?.image || '');
    const [phone,setPhone]=useState(user?.phone || '');
    const [streetAddress, setStreetAddress]=useState(user?.streetAddress || '');
    const [postalCode, setPostalCode]=useState(user?.postalCode || '');
    const [city, setCity]=useState(user?.city || '');
    const [country, setCountry]=useState(user?.country || '');
    const [admin,setAdmin]=useState(user?.admin || false);
    const {data:loggedInUserData}=useProfile();


    return(
        <div className="grid items-start gap-4" style={{gridTemplateColumns: '.2fr .8fr'}}>
                <div>
                  <EditableImage link={image} setLink={setImage}/>
                </div>
                
                
                <form className="grow" onSubmit={ev=>onSave(ev, {name:userName,image,phone,streetAddress, city, country, postalCode,admin,})}>
                <label>First and last name</label>
                <input type="text" placeholder="First and last name" value={userName} onChange={ev => setUserName(ev.target.value)}/>
                <label>Email</label>
                <input type="email" placeholder="Email" disabled value={user.email}/>
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
                {loggedInUserData.admin && (
                  <div >
                  <label className="p-2 inline-flex items-center gap-2 mb-2 " htmlFor="adminCb">
                  <input id="adminCb" type="checkbox" className="" value={'1'} checked={admin} onClick={ev=>setAdmin(ev.target.checked)}/>
                  <span>Admin</span>
                  </label>
                  </div>
                )}
                
                <button type="submit"><ClipboardDocumentCheck/>Save</button>
                </form>
              </div>
    );
}