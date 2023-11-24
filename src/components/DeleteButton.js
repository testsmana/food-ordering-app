import { useState } from "react";
import Trash from "@/components/icons/Trash";
import XCircle from "./icons/XCircle";

export default function DeleteButton({label, onDelete}){
  const [showConfirm, setShowConfirm]=useState(false);

  if(showConfirm){
    return(
        <div className="fixed bg-black/50 inset-0 flex items-center h-full justify-center">
           <div className="bg-white p-4 rounded-md ">
           <div>Are you sure you want to delete?</div>
           <div className="flex gap-2 mt-1">
            <button type="button" onClick={()=>setShowConfirm(false)}><XCircle/>Cancel</button>
            <button type="button" className="primary" onClick={()=>{onDelete(); setShowConfirm(false);}}><Trash/>Yes,&nbsp;delete!</button>
           </div> 
           </div>
        </div>
    );
  }
  return(
    <button type="button" onClick={()=>setShowConfirm(true)}>
        <span className="flex items-center text-primary"><Trash className="w-5 h-5"/>&nbsp;{label}</span>
    </button>
  );
}