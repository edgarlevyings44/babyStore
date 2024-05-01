import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { productsUrl } from '../urls';
import axios from 'axios';
import Swal from 'sweetalert2';


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
    // console.log(products.length);

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


    const handleDelete = (id) => {
        setLoading(true);
        
        axios.delete(`http://127.0.0.1:8000/api/admin/deleteproduct/${id}`,{
            headers:{
                Authorization :'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGIwMTZiNzk4OTE0ZjBmMWJjMDVlOWRkOWY1MTY1Yjk3YmMzMjk0OTY0M2RlNmIxYzliZGY3MTAzNzQ1MjdkN2I3NzdkYmQxOWE5ZmRhYjAiLCJpYXQiOjE3MTM4NzkxMDMuNTkzODE3LCJuYmYiOjE3MTM4NzkxMDMuNTkzODIsImV4cCI6MTc0NTQxNTEwMi4zNjIyMjYsInN1YiI6IjQiLCJzY29wZXMiOltdfQ.CXz8fHICdKLT6AOp3bOMrTP878F30VL0tE1AyUkX3s1pP3WP0FtPa0J-KIhOk7ItDAhZW5WEFekQN24s4qDvn--PgrLSoKbKiqd8E1Z_F7tl0XoeFLVn-IX-bJwfLJLrE2C5SwECgMet1hcZUJzvx-CIq1DROYX0TT62cWPfsucsuZ9WnrJzWQybi5FshYWC_o0oyNu9GCoJYWUtD4irmubdAEK3JdAnluO5ivOX3y8LjTHipF7_-wONKsqAJ229sCF-ZV2gbXYqw2LiiPyiVUIMJY5Z9hLKl_gZ-gVii98QUois7Nyjhu-GYdbpux6c5v8BTnn1hQRNVGab7hbloTpDbmFP3VS6INEr3sOZhYfUPOFujVZCOm-KVqMPKm56pB9EviHq5VfL6SGbZjXAuzIQzbl8Uhn1vafbtN-Phq2ZcRHt2bi8pDf8257mUKLE6uwvAyz6XMB4BMG16CfMi7xyXDhJW1G-FSYOvP6ZTsxDxj031jKtRElp39e7784ZPFaXQGhjQPqpRlyfkM7Z546DWF5bddal5124pz7jxl0h0TJvPDy2XAm0nVjyrOHSkaJAmjyGvu0xghGaX9ayRz5rcDR5F9m7v9NCfJ6tSKTZ_1rvr7lQiKH-RYv5bvNqG30md_9HEBgTzfq6VnAMaTPW7oNJv2YjZap5SKIqhfE'
            }
        })
        .then((response) => {
            setLoading(false);

            const updatedProducts = products.filter(product => product.id !== id);

            setProduct(updatedProducts);

            Swal.fire({
                title:'delete',
                text:'Product deleted',
                icon:'success'
            });

            return response.data;
        })
    }
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
                                <Link to={`/admin/updateproduct/${product.id}`} className='flex text-center justify-center bg-green-600 text-black w-12 h-8 rounded-md'>
                                    <button>Edit</button>
                                </Link>
                                <button onClick={() => handleDelete(product.id)} className='text-center bg-red-500 text-black w-12 h-8 rounded-md'>Delete</button>
                            </div>

                        </td>
                    </tr>
                ))}
            </tbody>
            {loading && (
                    <div className='absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50'>
                        <div className='bg-white p-4 rounded-lg'>
                            <p className='text-3xl text-gray-800'>Loading...</p>
                        </div>
                    </div>
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