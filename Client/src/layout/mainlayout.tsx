import Navbar from "../Components/navbar"
import Footer from "../Components/footer"
import Sidebar from "../Components/sidebar"

function MainLayout({ children }: {children: React.ReactNode}) {
  
    return (
      <> 
      <div>
      <Navbar />
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
  