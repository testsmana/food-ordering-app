'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { useProfile } from "../../components/UseProfile";
import { resolve } from "path";
import { rejects } from "assert";
import toast from "react-hot-toast";

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
        <section className="mt-8 max-w-md mx-auto ">
            <UserTabs isAdmin={true}/>
            <form className="mt-8" onSubmit={handleCategorySubmit}>
              <div className="flex gap-2 items-end">
                <div className="grow">
                  <label>{editedCategory ? 'Update Category' : 'New Category Name'} 
                  {editedCategory && (
                    <>: <b>{editedCategory.name}</b></>
                  )}
                  </label>
                  <input type="text" value={categoryName} onChange={ev => setCategoryName(ev.target.value)}/> 
                </div>

                <div className="pb-2">
                  <button className="border border-primary" type="submit">{editedCategory ? 'Update' : 'Create'}</button>
                </div>

              </div>
              
            </form>

            <div>
              <h2 className="mt-8 text-sm text-gray-500">Edit Category:</h2>
              {categories?.length > 0 && categories.map(c => (
                <button 
                onClick={()=>{
                  setEditedCategory(c);
                  setCategoryName(c.name);
                }} 
                className="cursor-pointer bg-gray-200 rounded-xl p-2 px-4 flex gap-1 mb-1">
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
        </section>
    );
}