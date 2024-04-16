import classNames from "classnames"
import { FaBaby } from "react-icons/fa6"
import { HiOutlineViewGrid, HiOutlineCube, HiOutlineShoppingCart, HiOutlineUsers, HiOutlineDocumentText, HiOutlineAnnotation, HiOutlineQuestionMarkCircle, HiOutlineCog } from "react-icons/hi"
import { Link, useLocation } from "react-router-dom"


const Dashboard_Above_Links = [
  {
    key:'dashboard',
    label:'Dashboard',
    path:'/admin/',
    icon:<HiOutlineViewGrid/>
  },
  {
    key:'products',
    label:'Products',
    path:'/admin/products',
    icon:<HiOutlineCube />
  },
  {
    key:'orders',
    label:'Orders',
    path:'/admin/orders',
    icon:<HiOutlineShoppingCart />
  },
  {
    key:'customers',
    label:'Customers',
    path:'/admin/customers',
    icon:<HiOutlineUsers/>
  },
  {
    key:'transactions',
    label:'Messages',
    path:'/admin/messages',
    icon:<HiOutlineDocumentText/>
  }
]

const Dashboard_Bottom_Links = [
  {
    key:'settings',
    label:'Setting',
    path:'/settings',
    icon:<HiOutlineCog/>
  },
  {
    key:'support',
    label:'Help & Support',
    path:'/support',
    icon:<HiOutlineQuestionMarkCircle/>
  }
]

function AdminSidebar() {

  const linkStyles = 'flex items-center gap-3 font-light px-3 py-3 hover:bg-blue-400 hover:no-underline rounded-md text-base';

  const {pathname} = useLocation();

  return (
    <div className="flex flex-col bg-blue-300 p-3 w-36 md:w-52 lg:w-60">

        <div className="flex items-center gap-2 py-3 md:text-2xl">
          <FaBaby className="text-3xl text-red-600"/>
          <span>Baby Store</span>
        </div>


        <div className="flex-1">
          {Dashboard_Above_Links.map((item) => (
            <Link to={item.path} className={classNames(pathname === item.path ? 'text-white' :  "text-black", linkStyles)}>
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>


        <div>
          {Dashboard_Bottom_Links.map((item) => (
            <Link to={item.path} className={classNames(pathname === item.path ? 'text-white' :  "text-black", linkStyles)}>
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
    </div>
  )
}

export default AdminSidebar