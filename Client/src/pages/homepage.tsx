import MainLayout from "../layout/mainlayout"
import Banner from "../Components/banner"
import Products from "../Components/products"


interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  quantity: number;
  category: string;
  created_at: string | null;
  updated_at: string | null;

}

interface HomepageProps {
  addToCart: (product: Product) => void;
  cartItems: Product[];
}
function Homepage({ addToCart, cartItems }: HomepageProps) {
    return (
      <> 
      <MainLayout cartItems={cartItems}>
          <div className="min-h-screen bg-base-200">
            <div className="bg-cyan-800 p-4 block-md">
            </div>
            <Banner />
            <div className="bg-green-900 p-4 block-md">
            </div>
            <div>
              < Products addToCart={addToCart}/>
            </div>
          </div>
      </MainLayout>
      </>
    )
  }
  
  export default Homepage
  
