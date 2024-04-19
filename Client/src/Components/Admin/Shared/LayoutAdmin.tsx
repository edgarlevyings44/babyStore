import { Outlet } from "react-router-dom"
import Header from "./Header"
import AdminSidebar from "./AdminSidebar"

function LayoutAdmin() {
  return (
    <div className="flex flex-row h-screen overflow-hidden">
        <AdminSidebar />

        <div className="flex-1">
            <Header />
            <div>{<Outlet />}</div>
        </div>
    </div>
  )
}

export default LayoutAdmin