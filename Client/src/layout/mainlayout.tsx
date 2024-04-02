import Navbar from "../components/navbar"
import Footer from "../components/footer"

function MainLayout({ children }: {children: React.ReactNode}) {
  
    return (
      <> 
      <div>
      <Navbar />
      </div>
      {children}
      <div>
      <Footer />
      </div>
      </>
    )
  }
  
  export default MainLayout
  