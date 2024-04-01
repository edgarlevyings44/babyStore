import Sidebar from "../components/sidebar"
import Navbar from "../components/navbar"
import Footer from "../components/footer"

function MainLayout({ children }: {children: React.ReactNode}) {
  
    return (
      <> 
      <div>
      <Navbar />
      </div>
      <div>
      <Sidebar />
      </div>
      {children}
      <div>
      <Footer />
      </div>
      </>
    )
  }
  
  export default MainLayout
  