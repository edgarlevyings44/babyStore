import Sidebar from "../components/sidebar"
import Navbar from "../components/navbar"

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
      </>
    )
  }
  
  export default MainLayout
  