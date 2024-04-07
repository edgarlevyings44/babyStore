import Navbar from "../components/navbar"
import Footer from "../components/footer"
import Sidebar from "../components/sidebar"

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
  