import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import ChevronDown from "../icons/ChevronDown";
import ChevronUp from "../icons/ChevronUp";
import { useState } from "react";

export default function MenuItemPriceProps({name, addLabel, props, setProps}){
    
    const [isOpen, setIsOpen]=useState(false);

    function addProp(){
        setProps(oldProps =>{
          return [...oldProps, {name:'', price:0}];
        });
      }
  
      function editProp(ev, index, prop){
          const newValue=ev.target.value;
          setProps(prevSizes=>{
              const newSizes=[...prevSizes];
              newSizes[index][prop]=newValue;
              return newSizes;
          })
      }
  
      function removeProp(indexToRemove){
          setProps(prev=>prev.filter((v,index)=>index!==indexToRemove))
      }

    return(
        <div className="bg-gray-200 p-2 rounded-md mb-2">
                    <button onClick={()=>setIsOpen(prev=> !prev)} type="button" className="inline-flex p-1 border-0 justify-start">
                        {isOpen && (<ChevronUp/>)}
                        {!isOpen && (<ChevronDown/>)}
                        <span>{name}</span>
                        <span>({props?.length})</span>
                    </button>
                    <div className={isOpen ? 'block' : 'hidden'}>
                    {props?.length > 0 && props.map((size,index)=>(
                        <div key={index} className="flex items-end gap-2">
                            <div>
                               <label>Name</label>
                               <input onChange={ev=>editProp(ev, index, 'name')} type="text" placeholder="Size name" value={size.name}/>
                            </div>
                            <div>
                               <label>Extra Price</label>
                               <input onChange={ev=>editProp(ev, index, 'price')} type="text" placeholder="Extra Price" value={size.price}/>
                            </div>
                            
                            <div>
                                <button type="button" onClick={()=>removeProp(index)} className="bg-white mb-2 px-2 text-primary">
                                    <Trash/>
                                </button>
                            </div>
                        </div>
                    ))}
                    <button onClick={addProp} type="button" className="bg-white">
                    <Plus/><span>{addLabel}</span></button>
                    </div>
                    

                  </div>
    );
}