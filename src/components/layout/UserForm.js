'use client';
import { useState } from "react";
import EditableImage from "../../components/layout/EditableImage";
import ClipboardDocumentCheck from "../../components/icons/ClipboardDocumentCheck";
import { useProfile } from "../UseProfile";
import AddressInputs from "./AddressInputs";

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

    function handleAddressChange(propName, value){
      if(propName ==='phone') setPhone(value);
      if(propName ==='streetAddress') setStreetAddress(value);
      if(propName === 'postalCode') setPostalCode(value);
      if(propName ==='city') setCity(value);
      if(propName ==='country') setCountry(value);
      
    }


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
                <AddressInputs 
                addressProp={{phone, streetAddress, postalCode, city, country}}
                setAddressProp={handleAddressChange}/>
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