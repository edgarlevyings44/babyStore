import { useEffect, useState } from 'react'
import {HiOutlineSearch } from 'react-icons/hi'
import { userUrl } from '../urls';

function AdminCustomers() {

    const [users, setUsers] = useState([]);

    const[loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/users")
        .then((response) => response.json())
        .then((data) => {
            setUsers(data);
        })
        .catch((error) => {
            console.log('Error fetching users', error)
        })
    },[users])

  return (
    <div className="mx-auto overflow-x-auto overflow-y-auto w-full">

        <div className='relative mt-5 ml-5'>
            <HiOutlineSearch fontSize={20} className='text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'/>
            <input type='text' placeholder='Search' className='text-sm focus:outline-none active:outline-none h-10 w-[12rem] md:w-[20rem] border border-gray-300 rounded-md px-4 pl-11 pr-4'/>
        </div>

        <table className="block divide-y text-left text-gray-500 w-1">

            <thead className="sticky top-0 text-gray-700 uppercase font-semibold">

                <tr>
                    <th className="px-2 py-3">User_ID</th>
                    <th className="px-2 py-3">First Name</th>
                    <th className="px-2 py-3">Second Name</th>
                    <th className="px-2 py-3">Email</th>
                    <th className="px-2 py-3">Created_at</th>
                    <th className="px-2 py-3">Updated_at</th>
                    <th className='px-2 py-3'>
                        <span>Actions</span>
                    </th>
                </tr>
            </thead>

            {/* <tbody>
                {users.map((user) => (
                    <tr key={user.id} className='border-b'>
                        <td className='px-4 py-3'>{user.firstname}</td>
                        <td className='px-4 py-3'></td>
                        <td className='px-4 py-3'></td>
                        <td className='px-4 py-3'></td>
                        <td className='px-4 py-3'></td>
                        <td className='px-4 py-3'></td>
                        <td className='px-4 py-3'></td>
                    </tr>
                ))}
            </tbody> */}
        </table>
    </div>
  )
}

export default AdminCustomers