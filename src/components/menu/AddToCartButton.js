
import FlyingButton from 'react-flying-item'
export default function AddToCartButton({hasSizesOrExtras, onClick, basePrice,image}){
    if(!hasSizesOrExtras){
        return(
        <div className="flying-button-parent mt-4">
          {/* for test in src insert src={'https://properpizza.ch/wp-content/uploads/2022/08/Peperoni.png'} to see the effect */}
          <FlyingButton targetTop={'5%'} targetLeft={'90%'} src={image}>
            <div onClick={onClick} className='grow p-2'>Add to cart €{basePrice}</div>
          </FlyingButton>
        </div>
        );
    }
    return(
    <button type="button" onClick={onClick} className="mt-4 bg-primary text-white rounded-full px-8 py-2">
    <span>Add to cart (from €{basePrice})</span>
    
    </button>
   ); 
}