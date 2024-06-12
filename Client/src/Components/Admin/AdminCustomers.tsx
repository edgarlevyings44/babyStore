import { useEffect, useState } from 'react'
import {HiOutlineSearch } from 'react-icons/hi'
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';



interface User{
    id:number;
    firstname:string;
    lastname:string;
    email:string;
    created_at:string;
    updated_at:string;
    user_type:number;
}

const AdminCustomers: React.FC = () => {

    const [users, setUsers] = useState<User[]>([]);

    const[loading, setLoading] = useState<boolean>(false);

    const [searchQuery, setSearchQuery] = useState<string>('');


    useEffect(() => {
        setLoading(true);

        axios.get('http://127.0.0.1:8000/api/admin/users', {
            headers:{
                Authorization :'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjBlZmU0OWUzNzFiNDk0NzM1NDQ3OGUxNmYzNWVhOTY3MTA1MzIxNWYyNjdmYzA1MzJlMDExYjIzMDRkYWY1M2NkMjczY2Q1ZGFhMDAzYjQiLCJpYXQiOjE3MTgyMjEwMjYuOTU1OTA2LCJuYmYiOjE3MTgyMjEwMjYuOTU1OTIsImV4cCI6MTc0OTc1NzAyNS44MjkxMTEsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.ws1EbmR6JTKkAt1K9dJK_YIerPpdVRunNPNyvr2cfAUHY2kXZhP23D-0JQ6ZmC6RT-mbzeXGEzi6RW89DgXzwFZG3vBl0k4FaGfIGs6oq5W_D3WuS75BGnpGqOx104eUHnwIDl5JcJh9dk03M_HtJ53Mzfy5DP_moQM2k84n_hAC_MQ0aRkEjGthwrUQkIN3HLOcoE9-1pQE-csm80itL_32ws2H-CCUGBfU2aRn4A69hjXHWWyVZdSvw02LKV3DsJxNsBBLZk1kWjg9Rh7axze_b8V9ms0x87eEpszhpBZtoT6Me7n-0wiH0otlwst1qGT2jYGBNUD_zJVWb3qJbbdI0c7Dkw6rO8xLLEfZGMG3-HplTsnDu4zDlogMzwluGaiPzMzBA0KJOq_cwFioY8d0hUYouRq7LXm4WV660oBcBxHmgIXN5emWwTgAZthfxpKEArrl8HVWjgXofP-mmaJ2_XMx5j7Idkb6NOXI_IJsmMXRnt6cSJ96wWqnHbk63XI9CTkMT-QUYeJZIxefw7sAmyYEMnz5F7TEST4761y6Dd1lkHDvMKZu3oSUuP7cahLBBR7wvfSjfq6V6wruBvFI-sk7-fnF7WhqHQnuvUm6DjIzVyy8Y2fiaH3VKfvUEGumxc_67inbCwcKOLYFCWGXgDckxncV8k8DZbZTRdc'
            }
        })
        .then((response) => {


            const filteredUser = response.data.filter((user: User) => user.user_type == 1);


            if (searchQuery === ''){
                setUsers(filteredUser);
            }else{
                const searchUser = filteredUser.filter((user: User) => 
                    user.firstname.toLowerCase().includes(searchQuery.toLowerCase())
                )

                setUsers(searchUser);
            }
            
        })
        .catch((error) => {
            console.error('Error fetching users', error);
            
        })
        .finally(() => {
            setTimeout(() => {
                setLoading(false);
            }, 35000)
            setLoading(false);
        })
        
    },[searchQuery])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }


    const handleDelete = (id: number) =>{
        setLoading(true);

        axios.delete(`http://127.0.0.1:8000/api/admin/deleteuser/${id}`, {
            headers:{
                Authorization :'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGIwMTZiNzk4OTE0ZjBmMWJjMDVlOWRkOWY1MTY1Yjk3YmMzMjk0OTY0M2RlNmIxYzliZGY3MTAzNzQ1MjdkN2I3NzdkYmQxOWE5ZmRhYjAiLCJpYXQiOjE3MTM4NzkxMDMuNTkzODE3LCJuYmYiOjE3MTM4NzkxMDMuNTkzODIsImV4cCI6MTc0NTQxNTEwMi4zNjIyMjYsInN1YiI6IjQiLCJzY29wZXMiOltdfQ.CXz8fHICdKLT6AOp3bOMrTP878F30VL0tE1AyUkX3s1pP3WP0FtPa0J-KIhOk7ItDAhZW5WEFekQN24s4qDvn--PgrLSoKbKiqd8E1Z_F7tl0XoeFLVn-IX-bJwfLJLrE2C5SwECgMet1hcZUJzvx-CIq1DROYX0TT62cWPfsucsuZ9WnrJzWQybi5FshYWC_o0oyNu9GCoJYWUtD4irmubdAEK3JdAnluO5ivOX3y8LjTHipF7_-wONKsqAJ229sCF-ZV2gbXYqw2LiiPyiVUIMJY5Z9hLKl_gZ-gVii98QUois7Nyjhu-GYdbpux6c5v8BTnn1hQRNVGab7hbloTpDbmFP3VS6INEr3sOZhYfUPOFujVZCOm-KVqMPKm56pB9EviHq5VfL6SGbZjXAuzIQzbl8Uhn1vafbtN-Phq2ZcRHt2bi8pDf8257mUKLE6uwvAyz6XMB4BMG16CfMi7xyXDhJW1G-FSYOvP6ZTsxDxj031jKtRElp39e7784ZPFaXQGhjQPqpRlyfkM7Z546DWF5bddal5124pz7jxl0h0TJvPDy2XAm0nVjyrOHSkaJAmjyGvu0xghGaX9ayRz5rcDR5F9m7v9NCfJ6tSKTZ_1rvr7lQiKH-RYv5bvNqG30md_9HEBgTzfq6VnAMaTPW7oNJv2YjZap5SKIqhfE'
            }
        })
        .then((response) => {

            setLoading(false);

            const updatedUsers = users.filter(user => user.id !== id);
            setUsers(updatedUsers);

            Swal.fire({
                title:'delete',
                text:'User deleted',
                icon:'success'
            });
            
            return response.data;
        })
    }


    const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

  return (
    <div className="overflow-x-auto overflow-y-auto">

        <div className='relative mt-5 ml-5'>
            <HiOutlineSearch fontSize={20} className='text-gray-400 absolute top-1/2 -translate-y-1/2 left-3 cursor-pointer'/>
            <input type='text' placeholder='Search' value={searchQuery} onChange={handleInputSearch} className='text-sm focus:outline-none active:outline-none h-10 w-[12rem] md:w-[20rem] border border-gray-300 rounded-md px-4 pl-11 pr-4'/>
        </div>

        <table className="block text-gray-500 text-center w-1 h-[46rem]">

            <thead className="sticky top-0 text-gray-700 uppercase font-semibold">

                <tr>
                    <th className="px-5 py-3">User_ID</th>
                    <th className="px-5 py-3">First Name</th>
                    <th className="px-5 py-3">Second Name</th>
                    <th className="px-5 py-3">Email</th>
                    <th className="px-5 py-3">Created_at</th>
                    <th className="px-5 py-3">Updated_at</th>
                    <th className='px-5 py-3'>
                        <span>Actions</span>
                    </th>
                </tr>
            </thead>

            <tbody>
                {users.map((user) => (
                    <tr key={user.id} className='border-b'>
                        <td className='px-4 py-3'>{user.id}</td>
                        <td className='px-4 py-3'>{user.firstname}</td>
                        <td className='px-4 py-3'>{user.lastname}</td>
                        <td className='px-4 py-3'>{user.email}</td>
                        <td className='px-4 py-3'>{formatDate(user.created_at)}</td>
                        <td className='px-4 py-3'>{formatDate(user.updated_at)}</td>
                        <td className='px-6 py-3 flex gap-10'>
                            <Link to={`/admin/userdetails/${user.id}`} className='flex bg-blue-600 items-center justify-center gap-2 w-20 h-8 rounded-md'>
                                <FiEdit className='text-white'/> 
                                <button className='text-white'>Edit</button>
                            </Link>

                            <div className='flex bg-red-600 items-center justify-center gap-2 w-20 h-8 rounded-md'>
                                <RiDeleteBin6Line className='text-white'/> 
                                <button onClick={() => handleDelete(user.id)} className='text-white'>Delete</button>
                            </div>
                            
                        </td>
                    </tr>
                ))}
            </tbody>

            {loading && (
                <tfoot>
                    <tr>
                        <td colSpan={6} className='text-center text-2xl p-4'>Loading...</td>
                    </tr>
                </tfoot>
            )}
        </table>
    </div>
  )
}

export default AdminCustomers





