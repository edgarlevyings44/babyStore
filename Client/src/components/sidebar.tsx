import { FiShoppingBag } from "react-icons/fi";
import { FaShopify } from "react-icons/fa6";
import { GiCarSeat } from "react-icons/gi";
import { SiYourtraveldottv } from "react-icons/si";
import { FaPersonBreastfeeding } from "react-icons/fa6";
import { FaGifts } from "react-icons/fa";
import { MdStroller } from "react-icons/md";
function Sidebar() {
  
    return (
      <> 
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li><a><FiShoppingBag /> All Categories</a></li>
            <li><a><FaShopify /> Best Seller</a></li>
            <li><a><GiCarSeat />Car Seats</a></li>
            <li><a><SiYourtraveldottv />Travel</a></li>
            <li><a><FaPersonBreastfeeding />Feeding</a></li>
            <li><a><FaGifts />Gifts</a></li>
            <li><a><MdStroller />Strollers</a></li>
          </ul>
        
        </div>
      </div>
      </>
    )
  }
  
  export default Sidebar
