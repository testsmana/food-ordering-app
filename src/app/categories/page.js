'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { useProfile } from "../../components/UseProfile";
import { resolve } from "path";
import { rejects } from "assert";
import toast from "react-hot-toast";
import DeleteButton from "@/components/DeleteButton";
import Pencil from "@/components/icons/Pencil";
import Plus from "@/components/icons/Plus";
import XCircle from "@/components/icons/XCircle";

export default function CategoriesPage(){

    const [categoryName, setCategoryName]=useState('');
    const [categories, setCategories]=useState([]);
    const {loading:profileLoading, data:profileData}=useProfile();
    const [editedCategory,setEditedCategory]=useState(null);

    useEffect(()=>{
      fetchCategories(); 
    }, []);

    function fetchCategories(){
      fetch('/api/categories').then(res=> {
        res.json().then(categories=>{
        setCategories(categories);
        });
      });
    }

    async function handleCategorySubmit(ev){
      ev.preventDefault();
      const creationPromise=new Promise(async (resolve,reject) => {
        const data= {name:categoryName};
        if(editedCategory){
          data._id=editedCategory._id;
        }
        const response= await fetch('/api/categories', {
        method: editedCategory ? 'PUT' : 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(data),
        });
      setCategoryName('');
      fetchCategories();
      setEditedCategory(null);
      if(response.ok) 
        resolve()
      else 
        reject();

      });

      await toast.promise(creationPromise, {
        loading: editedCategory ? 'Updating category...': 'Creating your new category...',
        success: editedCategory ? 'Category updated' : 'Category created',
        error: 'Error',
      });
      
    }

    async function handleDeleteClick(_id){
      const promise= new Promise(async (resolve, reject)=> {
       const response= await fetch('/api/categories?_id='+ _id, {
        method: 'DELETE',
       });
       if(response.ok){
        resolve();
       } else {
        reject();
       }
      });

      await toast.promise(promise, {
        loading: 'Deleting...',
        success: 'Deleted',
        error:'Error',
      });

    fetchCategories();
    }
    
    if(profileLoading){
      return (
        <h1 className="text-center text-primary text-4xl mb-4 mt-4">Loading...</h1>
        );
    }
    

    if(!profileData.admin){
        return (
        <h1 className="text-center text-primary text-4xl mb-4 mt-4">Not an admin!</h1>
        );
    }

    return(
        <section className="mt-8 ">
            
            <UserTabs isAdmin={true}/>
            <form className="mt-8 max-w-lg mx-auto " onSubmit={handleCategorySubmit}>
              <div className="flex gap-2 items-end">
                <div className="grow">
                  <label>{editedCategory ? 'Update Category' : 'New Category Name'} 
                  {editedCategory && (
                    <>: <b>{editedCategory.name}</b></>
                  )}
                  </label>
                  <input type="text" value={categoryName} onChange={ev => setCategoryName(ev.target.value)}/> 
                </div>

                <div className="pb-2 md:flex gap-1">
                  <button className="border border-primary" type="submit"><Plus/>{editedCategory ? 'Update' : 'Create'}</button>
                  <div className={editedCategory ? 'block' : 'hidden'}>
                    <button type="button" className="mt-1 md:mt-0" onClick={()=>{
                    setEditedCategory(null);
                    setCategoryName('');
                    }}><XCircle/>Cancel</button>
                  </div>
                </div>

              </div>
              
            </form>

            <div className="mt-8 max-w-lg mx-auto">
              {categories?.length > 0 && (<h2 className="mt-8 text-sm text-gray-500">Existing categories:</h2>)}
              {categories?.length > 0 && categories.map(c => (
                <div
                key={c._id}
                className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
                  <div className="grow">{c.name}</div>
                  <div className="flex gap-1">
                    <button type="button" onClick={()=>{setEditedCategory(c);
                                                        setCategoryName(c.name);}}><span className="flex items-center"><Pencil className="w-5 h-5"/>&nbsp;Edit</span>
                    </button>
                    <DeleteButton label="Delete" onDelete={()=>handleDeleteClick(c._id)}/>
                  </div>
                  
                </div>
              ))}
            </div>
        </section>
    );
}