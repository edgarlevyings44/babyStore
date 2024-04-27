import Navbar from "../Components/navbar"
import Footer from "../Components/footer"
import Sidebar from "../Components/sidebar"

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
}

function MainLayout({ children, cartItems }: MainLayoutProps) {
  
    return (
      <> 
      <div>
      <Navbar cartItems={cartItems} />
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
  