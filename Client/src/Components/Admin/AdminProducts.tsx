import { IoIosAdd } from "react-icons/io";
import {Transition, Menu} from '@headlessui/react';
import { Fragment } from "react/jsx-runtime";
import { FaFilter } from "react-icons/fa";
import AdminTable from "./AdminTable";
import { useNavigate } from "react-router-dom";

function AdminProducts() {

    const navigate = useNavigate();

    const handleAddButton = () => {
        navigate('/admin/addproduct');
    }
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">

        <div className="mx-auto px-4 lg:px-1">

            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overlflow-hidden flex flex-col">

                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">

                    <div className="w-full md:w-1/2">

                        <form className="flex items-center w-1/2">
                            <label className="sr-only">Search</label>

                            <div className="relative w-full">

                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">

                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" />
                            </div>
                        </form>
                    </div>

                    <div className="w-1/2 md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:items-center justify-end md:space-x-3 flex-shrink-0">

                        <button onClick={handleAddButton} type="button" className="flex items-center justify-center text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 focus:outline-none">
                            <IoIosAdd fontSize={20} className="text-white mr-2"/>
                            Add product
                        </button>


                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    <FaFilter fontSize={15}/>
                                    Filter
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                        {() => (

                                            <label className="flex items-center">
                                                <input type="checkbox" className="ml-5"/>
                                                    <span className="block px-1 py-2 text-sm">Apple</span>
                                            </label>
                                        )}
                                        </Menu.Item>

                                        <Menu.Item>
                                        {() => (

                                            <label className="flex items-center">
                                                <input type="checkbox" className="ml-5"/>
                                                    <span className="block px-1 py-2 text-sm">Microsoft</span>
                                            </label>
                                        )}
                                        </Menu.Item>

                                        <Menu.Item>
                                        {() => (

                                            <label className="flex items-center">
                                                <input type="checkbox" className="ml-5"/>
                                                    <span className="block px-1 py-2 text-sm">Razor</span>
                                            </label>
                                        )}
                                        </Menu.Item>

                                    </div>
                                </Menu.Items>
                            </Transition>
                            </Menu>


                    </div>
                </div>


                <AdminTable />

            </div>
            
        </div>
    </div>
  )
}

export default AdminProducts