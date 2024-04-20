import React, { useEffect, useState } from 'react'

function AdminTable() {

    const linkClasses = "z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600";
    const [isOpen, setIsOpen] = useState([]);

    const [products, setProduct] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products')
        .then((response) => response.json())
        .then((data) => {
            setProduct(data);
            setIsOpen(new Array(data.length).fill(false));
        });
        console.log('This is data', products)
    }, [products])

    const toggleDropDown = (index) => {
        setIsOpen(prevState => {
            const newState = [...prevState];
            // newState[index] = !newState[index];
            // return newState;
            newState.forEach((_, i) => {
                if(i !== index) newState[i] = false;
            });
            newState[index] = !newState[index]
            return newState;
        })
    }
  return (
    <table className='w-full text-sm text-left text-gray-500'>

        <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
            <tr>
                <th scope="col" className="px-4 py-3">Product name</th>
                <th scope="col" className="px-4 py-3">Category</th>
                <th scope="col" className="px-4 py-3">Quantity</th>
                <th scope="col" className="px-4 py-3">Description</th>
                <th scope="col" className="px-4 py-3">Price</th>
                <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                </th>
            </tr>
        </thead>

        <tbody>
            {products.map((product, index) => (
                <tr key={product.id} className='border-b'>
                    <td className='px-4 py-3'>{product.name}</td>
                    <td className='px-4 py-3'>{product.category}</td>
                    <td className='px-4 py-3'>{product.quantity}</td>
                    <td className='px-4 py-3'>{product.description}</td>
                    <td className='px-4 py-3'>{product.price}</td>

                    <td className="px-4 py-3 flex items-center justify-end">
                        <button onClick={() => toggleDropDown(index)} id="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                        </button>


                        <div className={`${isOpen[index] ? 'absolute' : 'hidden'} ${linkClasses}`}>
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                                <li>
                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                </li>
                            </ul>
                            <div className="py-1">
                                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                            </div>
                        </div>

                    </td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default AdminTable