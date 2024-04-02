import Sidebar from "../components/sidebar"
function SidebarLayout({ children }: {children: React.ReactNode}) {
  
    return (
      <> 
      <div className="flex">
         <div className="w-64 mr-16">
            <Sidebar />
         </div>
         <div className="flex-1 ml-4">
            {children}
         </div>
      </div>
      </>
    )
  }
  
  export default SidebarLayout
  