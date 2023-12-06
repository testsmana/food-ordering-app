import EditableImage from "@/components/layout/EditableImage";
import { useEffect, useState } from "react";
import MenuItemPriceProps from "./MenuItemPriceProps";
import ClipboardDocumentCheck from "../../components/icons/ClipboardDocumentCheck";

export default function MenuItemForm({onSubmit, menuItem}){
    const [image, setImage]=useState(menuItem?.image || '');
    const [name,setName]=useState(menuItem?.name || '');
    const [description, setDescription]=useState(menuItem?.description || '');
    const [basePrice, setBasePrice]=useState(menuItem?.basePrice || '');
    const [sizes, setSizes]=useState(menuItem?.sizes || []);
    const [category,setCategory]=useState(menuItem?.category || '');
    const [categories,setCategories]=useState([]);
    const [extraIngredientPrices,setExtraIngredientPrices]=useState(menuItem?.extraIngredientPrices || []);
    
    useEffect(()=>{
      fetch('/api/categories').then(res=>{
        res.json().then(categories=>{
         setCategories(categories);
        });
      });
    }, []);
    
return(
        <form onSubmit={ev=>onSubmit(ev, {image,name,description,basePrice,sizes,extraIngredientPrices,category,})} className="mt-8 max-w-lg mx-auto">
          <div className="grid items-start gap-4" style={{gridTemplateColumns: '.3fr .7fr'}}>
              <div>
                <EditableImage link={image} setLink={setImage} />
              </div>
              <div className="grow">
                  <label >Item name</label>
                  <input type="text" value={name} onChange={ev=> setName(ev.target.value)}/>
                  <label >Description</label>
                  <textarea type="text" rows="4" cols="50" value={description} onChange={ev=> setDescription(ev.target.value)}></textarea>
                  <label >Category<span className="text-primary">*</span></label>
                  <select value={category} onChange={ev=> setCategory(ev.target.value)} >
                  <option value="" disabled>Select category</option>
                    {categories?.length > 0 && categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))} </select>
                  <label >Base Price</label>
                  <input type="text" value={basePrice} onChange={ev=> setBasePrice(ev.target.value)}/>
                  <MenuItemPriceProps name={'Sizes'} addLabel={'Add item size'} props={sizes} setProps={setSizes}/>
                  <MenuItemPriceProps name={'Extra ingredients'} addLabel={'Add ingrediants prices'} props={extraIngredientPrices} setProps={setExtraIngredientPrices}/>
                  <button type="submit"><ClipboardDocumentCheck/>Save</button>
              </div>
          </div>

        </form>
    );
}