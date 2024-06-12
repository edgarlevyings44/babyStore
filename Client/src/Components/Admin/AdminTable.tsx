import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { productsUrl } from '../urls';
import axios from 'axios';
import Swal from 'sweetalert2';

interface Product {
    id: number;
    name: string;
    category: string;
    quantity: number;
    description: string;
    price: number;
}


const AdminTable:React.FC = () => {

    const linkClasses = "z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600";
    const [isOpen, setIsOpen] = useState<boolean[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const [products, setProduct] = useState<Product[]>([]);

    //Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const[itemsPerPage] = useState<number>(10);    

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

    const handleClick = (page: number) => {
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


    const handleDelete = (id: number) => {
        setLoading(true);
        
        axios.delete(`http://127.0.0.1:8000/api/admin/deleteproduct/${id}`,{
            headers:{
                Authorization :'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjBlZmU0OWUzNzFiNDk0NzM1NDQ3OGUxNmYzNWVhOTY3MTA1MzIxNWYyNjdmYzA1MzJlMDExYjIzMDRkYWY1M2NkMjczY2Q1ZGFhMDAzYjQiLCJpYXQiOjE3MTgyMjEwMjYuOTU1OTA2LCJuYmYiOjE3MTgyMjEwMjYuOTU1OTIsImV4cCI6MTc0OTc1NzAyNS44MjkxMTEsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.ws1EbmR6JTKkAt1K9dJK_YIerPpdVRunNPNyvr2cfAUHY2kXZhP23D-0JQ6ZmC6RT-mbzeXGEzi6RW89DgXzwFZG3vBl0k4FaGfIGs6oq5W_D3WuS75BGnpGqOx104eUHnwIDl5JcJh9dk03M_HtJ53Mzfy5DP_moQM2k84n_hAC_MQ0aRkEjGthwrUQkIN3HLOcoE9-1pQE-csm80itL_32ws2H-CCUGBfU2aRn4A69hjXHWWyVZdSvw02LKV3DsJxNsBBLZk1kWjg9Rh7axze_b8V9ms0x87eEpszhpBZtoT6Me7n-0wiH0otlwst1qGT2jYGBNUD_zJVWb3qJbbdI0c7Dkw6rO8xLLEfZGMG3-HplTsnDu4zDlogMzwluGaiPzMzBA0KJOq_cwFioY8d0hUYouRq7LXm4WV660oBcBxHmgIXN5emWwTgAZthfxpKEArrl8HVWjgXofP-mmaJ2_XMx5j7Idkb6NOXI_IJsmMXRnt6cSJ96wWqnHbk63XI9CTkMT-QUYeJZIxefw7sAmyYEMnz5F7TEST4761y6Dd1lkHDvMKZu3oSUuP7cahLBBR7wvfSjfq6V6wruBvFI-sk7-fnF7WhqHQnuvUm6DjIzVyy8Y2fiaH3VKfvUEGumxc_67inbCwcKOLYFCWGXgDckxncV8k8DZbZTRdc'
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
                {currentProducts.map((product) => (
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
                    <div className='absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50'>
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