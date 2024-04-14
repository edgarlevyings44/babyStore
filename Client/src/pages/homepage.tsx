import MainLayout from "../layout/mainlayout"
import Banner from "../components/banner"
import Products from "../components/products"
function Homepage() {
    return (
      <> 
      <MainLayout>
          <div className="min-h-screen bg-base-200">
            <div className="bg-cyan-800 p-4 block-md">
            </div>
            <Banner />
            <div className="bg-green-900 p-4 block-md">
            </div>
            <div>
              < Products/>
            </div>
          </div>
      </MainLayout>
      </>
    )
  }
  
  export default Homepage
  
