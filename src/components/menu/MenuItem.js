export default function MenuItem(){
    return(
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
            <div className="text-center">
              <img src="/4-djathrat-768x768.png" className="max-h-auto max-h-48 block mx-auto" alt="Unable to display"/>
            </div>
                <h4 className="font-semibold my-3 text-xl">4 Cheeses</h4>
                <p className="text-gray-500 text-sm">
                    cream base, proper cheese, gorgonzola, mozzarella, grana padano and sesame
                </p>
                <button className="mt-4 bg-primary text-white rounded-full px-8 py-2">Add to cart 12€</button>
            </div>
    );

}