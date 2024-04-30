import React, { useEffect, useState } from 'react'
import { productsUrl } from '../urls';

function AdminTable() {

    const linkClasses = "z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600";
    const [isOpen, setIsOpen] = useState([]);

    const [loading, setLoading] = useState(false);

    const [products, setProduct] = useState([]);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const[itemsPerPage] = useState(10);    

    useEffect(() => {
        setLoading(true);
        fetch(productsUrl)
        .then((response) => response.json())
        .then((data) => {
            
            setProduct(data);

            setLoading(false);
            setIsOpen(new Array(data.length).fill(false));
        });
    }, []);

    //pagination
    const totalPages = Math.ceil(products.length / itemsPerPage);
    console.log(products.length);

    const handleClick = (page) => {
        setCurrentPage(page);
    }

    const startIndex = (currentPage -1 ) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    //end of pagination
 
    // const toggleDropDown = (index) => {
    //     setIsOpen(prevState => {
    //         const newState = [...prevState];
    //         newState.forEach((_, i) => {
    //             if(i !== index) newState[i] = false;
    //         });
    //         newState[index] = !newState[index]
    //         return newState;
    //     })
    // }
  return (
    <div style={{overflowX:'auto', overflowY:'auto', maxHeight:'750px'}}>
        <table className='block divide-y text-sm text-left text-gray-500 w-1 lg:w-full'>

            <thead className='sticky top-0 text-xs text-gray-700 uppercase bg-gray-50'>
                <tr>
                    <th className="px-4 py-3">Product name</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">
                        <span >Actions</span>
                    </th>
                </tr>
            </thead>

            <tbody>
                {currentProducts.map((product, index) => (
                    <tr key={product.id} className='border-b'>
                        <td className='px-4 py-3'>{product.name}</td>
                        <td className='px-4 py-3'>{product.category}</td>
                        <td className='px-4 py-3'>{product.quantity}</td>
                        <td className='px-4 py-3'>{product.description}</td>
                        <td className='px-4 py-3'>{product.price}</td>

                        <td className="px-4 py-3 items-center">

                            <div className='flex gap-5 items-center'>
                                <button className='text-center bg-green-600 text-black w-12 h-8 rounded-md'>Edit</button>
                                <button className='text-center bg-red-500 text-black w-12 h-8 rounded-md'>Delete</button>
                            </div>

                        </td>
                    </tr>
                ))}
            </tbody>
            {loading && (
                    <tfoot>
                        <tr>
                            <td colSpan={6} className="text-center text-2xl p-4">Loading...</td>
                        </tr>
                    </tfoot>
                )}
        </table>

        <nav style={{left:'50%'}} className='flex text-center fixed justify-center bottom-5 md:bottom-3'>
            <ul className='flex gap-5 md:gap-10 items-center'>
                <li className={`${currentPage === 1 ? 'hidden' : ''}`}>
                    <button onClick={() => handleClick(currentPage -1)}>Previous</button>
                </li>

                {[...Array(totalPages).keys()].map((page) => (
                    <li key={page} className={`${currentPage === page + 1 ? 'active' : ''}`}>
                        <button onClick={() => handleClick(page + 1)}>
                            {page + 1}
                        </button>
                    </li>
                ))}
                <li className={`${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button onClick={() => handleClick(currentPage + 1)}>Next</button>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default AdminTable