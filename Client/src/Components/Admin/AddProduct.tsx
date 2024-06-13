import { useState, FormEvent, ChangeEvent } from "react"
import axios from "axios";
import Swal from "sweetalert2";

function AddProduct() {

    const [loading, setLoading] = useState(false);



    const initialFormData = {
        name:"",
        description:"",
        image_url:"",
        price:"",
        quantity:"",
        category_id:""
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const key = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [key]: value});
    };

    const handleTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const key = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [key]: value});
    }

    const handleSelect = (event:ChangeEvent<HTMLSelectElement>) => {
        const key = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [key]: value})
    }


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        setLoading(true);

        try {
            await axios.post('http://127.0.0.1:8000/api/admin/addproduct', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization :'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjBlZmU0OWUzNzFiNDk0NzM1NDQ3OGUxNmYzNWVhOTY3MTA1MzIxNWYyNjdmYzA1MzJlMDExYjIzMDRkYWY1M2NkMjczY2Q1ZGFhMDAzYjQiLCJpYXQiOjE3MTgyMjEwMjYuOTU1OTA2LCJuYmYiOjE3MTgyMjEwMjYuOTU1OTIsImV4cCI6MTc0OTc1NzAyNS44MjkxMTEsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.ws1EbmR6JTKkAt1K9dJK_YIerPpdVRunNPNyvr2cfAUHY2kXZhP23D-0JQ6ZmC6RT-mbzeXGEzi6RW89DgXzwFZG3vBl0k4FaGfIGs6oq5W_D3WuS75BGnpGqOx104eUHnwIDl5JcJh9dk03M_HtJ53Mzfy5DP_moQM2k84n_hAC_MQ0aRkEjGthwrUQkIN3HLOcoE9-1pQE-csm80itL_32ws2H-CCUGBfU2aRn4A69hjXHWWyVZdSvw02LKV3DsJxNsBBLZk1kWjg9Rh7axze_b8V9ms0x87eEpszhpBZtoT6Me7n-0wiH0otlwst1qGT2jYGBNUD_zJVWb3qJbbdI0c7Dkw6rO8xLLEfZGMG3-HplTsnDu4zDlogMzwluGaiPzMzBA0KJOq_cwFioY8d0hUYouRq7LXm4WV660oBcBxHmgIXN5emWwTgAZthfxpKEArrl8HVWjgXofP-mmaJ2_XMx5j7Idkb6NOXI_IJsmMXRnt6cSJ96wWqnHbk63XI9CTkMT-QUYeJZIxefw7sAmyYEMnz5F7TEST4761y6Dd1lkHDvMKZu3oSUuP7cahLBBR7wvfSjfq6V6wruBvFI-sk7-fnF7WhqHQnuvUm6DjIzVyy8Y2fiaH3VKfvUEGumxc_67inbCwcKOLYFCWGXgDckxncV8k8DZbZTRdc'
                }
            });

            Swal.fire({
                title:"Product added",
                text:"Product added",
                icon:"success"
            });
            setFormData(initialFormData);
            

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon:"error",
                title:"Ooops...",
                text:"Something went wrong"
            });
        
        } finally {
            setLoading(false);
        }
        



    }

  return (
    
    <div className="flex flex-col items-center mt-10">

        <div className="w-3/4 md:w-1/2">

            <h3 className="text-3xl text-cyan-900 font-bold">Add Product</h3>
            <h4 className="text-xl text-gray-500 mt-4">Please enter details</h4>


            <form className="space-y-6" onSubmit={handleSubmit}>
                
                <div className="mt-1">
                    <label className="block text-sm font-medium text-gray-600">Name</label>
                    <div className="mt-2">
                        <input name="name" value={formData.name} onChange={handleChange} type="name" required className="w-full rounded-xl border-2 border-zinc-950 indent-3 text-gray-900 shadow-sm py-1.5"/>
                    </div>
                </div>

                <div className="mt-1">
                    <label className="block text-sm font-medium text-gray-600">Description</label>
                    <div className="mt-2">
                        <textarea name="description" value={formData.description} onChange={handleTextArea} placeholder="Maximum 255 characters" className="w-full h-32 rounded-xl border-2 border-zinc-950 indent-5 text-gray-900 shadow-sm py-1.5"/>
                    </div>
                </div>

                <div className="mt-1">
                    <label className="block text-sm font-medium text-gray-600">Image_Url</label>
                    <div className="mt-2">
                        <input name="image_url" value={formData.image_url} onChange={handleChange} type="text" required className="w-full rounded-md border-2 border-zinc-950 indent-3 text-gray-900 shadow-sm py-1.5"/>
                    </div>
                </div>

                <div className="mt-1">
                    <label className="block text-sm font-medium text-gray-600">Price</label>
                    <div className="mt-2">
                        <input name="price" value={formData.price} onChange={handleChange} type="number" required className="w-full rounded-md border-2 border-zinc-950 indent-3 text-gray-900 shadow-sm py-1.5"/>
                    </div>
                </div>

                <div className="mt-1">
                    <label className="block text-sm font-medium text-gray-600">Quantity</label>
                    <div className="mt-2">
                        <input name="quantity" value={formData.quantity} onChange={handleChange} type="number" required className="w-full rounded-md border-2 border-zinc-950 indent-3 text-gray-900 shadow-sm py-1.5"/>
                    </div>
                </div>

                <div className="mt-1">
                    <label className="block text-sm font-medium text-gray-600">Category</label>
                    <div className="mt-2">
                       
                        <select name="category_id" value={formData.category_id} onChange={handleSelect} className="w-1/2 py-1 text-gray-900 shadow-sm">
                            <option value="">Category</option>
                            <option value="1">Car Seats</option>
                            <option value="2">Feeding</option>
                            <option value="3">Gifts</option>
                            <option value="4">Strollers</option>
                        </select>
                    </div>
                </div>


                <div className="text-center">
                    <button type="submit" className="rounded-md px-10 bg-blue-600 font-semibold hover:bg-green-900 cursor-pointer text-white text-2xl">Save</button>
                </div>

            </form>

        </div>
        {loading && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-lg font-semibold">Loading...</p>
                </div>
            </div>
        )}
    </div>
  )
}

export default AddProduct