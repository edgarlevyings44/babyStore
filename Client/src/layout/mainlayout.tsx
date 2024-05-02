import Navbar from "../Components/navbar"
import Footer from "../Components/footer"
import Sidebar from "../Components/sidebar"
import useAddToCart from "../hooks/useAddToCart"
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

interface MainLayoutProps {
  children: React.ReactNode;
  cartItems: Product[];
  cartCount: number;
}

function MainLayout({ children,cartItems, cartCount }: MainLayoutProps) {
  
    return (
      <> 
      <div>
      <Navbar cartItems={cartItems} cartCount={cartCount} />
      </div>
        <div>
          <Sidebar>
            <div className="">
              {children}
            </div>
          </Sidebar>
        </div>
      <div>
      <Footer />
      </div>
      </>
    )
  }
  
  export default MainLayout
  