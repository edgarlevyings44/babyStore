import { FiShoppingBag } from "react-icons/fi";
import { FaShopify } from "react-icons/fa6";
import { GiCarSeat } from "react-icons/gi";
import { SiYourtraveldottv } from "react-icons/si";
import { FaPersonBreastfeeding } from "react-icons/fa6";
import { FaGifts } from "react-icons/fa";
import { MdStroller } from "react-icons/md";
function Sidebar({ children }: {children: React.ReactNode}) {
  
    return (
      <> 
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center lg:ml-5">
          {children}
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <button className="text-xl text-left font-bold lg:hidden">BabyStore</button>
            <li><a className="lg:text-xl"><FiShoppingBag /> All Categories</a></li>
            <li><a className="lg:text-xl"><FaShopify /> Best Seller</a></li>
            <li><a className="lg:text-xl"><GiCarSeat />Car Seats</a></li>
            <li><a className="lg:text-xl"><SiYourtraveldottv />Travel</a></li>
            <li><a className="lg:text-xl"><FaPersonBreastfeeding />Feeding</a></li>
            <li><a className="lg:text-xl"><FaGifts />Gifts</a></li>
            <li><a className="lg:text-xl"><MdStroller />Strollers</a></li>
          </ul>
        
        </div>
      </div>
      </>
    )
  }
  
  export default Sidebar
