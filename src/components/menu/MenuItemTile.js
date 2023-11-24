export default function MenuItemTile({onAddToCart, ...item}){
    const {image,description, name, basePrice, sizes, extraIngredientPrices}=item;
    return(
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
            <div className="text-center">
              {/* To show a image for test remove comment
              <img src="/4-djathrat-768x768.png" className="max-h-auto max-h-48 block mx-auto" alt="Unable to display"/> 
              */}
              <img src={image} className="max-h-auto max-h-24 block mx-auto" alt="Unable to display"/>
            </div>
                <h4 className="font-semibold my-3 text-xl">{name}</h4>
                <p className="text-gray-500 text-sm line-clamp-3 ">{description}</p>
                <button type="button" onClick={onAddToCart} className="mt-4 bg-primary text-white rounded-full px-8 py-2">
                    {(sizes?.length > 0 || extraIngredientPrices?.length > 0) ? (
                    <span>Add to cart (from €{basePrice})</span>
                    ): (
                    <span>Add to cart €{basePrice}</span>
                    )} 
                    </button>
            </div>
    );
}