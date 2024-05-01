import axios from "axios";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


function UpdateProduct() {

    interface FormData {
        id:string;
        name:string;
        description:string;
        image_url:string;
        price:string;
        quantity:string;
        category_id:string;
    }

    const {id} = useParams();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        id:"",
        name:"",
        description:"",
        image_url:"",
        price:"",
        quantity:"",
        category_id:"",
    })

    useEffect(() => {
        setLoading(true);

        axios.get(`http://127.0.0.1:8000/api/products/${id}`, {
            headers:{
                Authorization :'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGIwMTZiNzk4OTE0ZjBmMWJjMDVlOWRkOWY1MTY1Yjk3YmMzMjk0OTY0M2RlNmIxYzliZGY3MTAzNzQ1MjdkN2I3NzdkYmQxOWE5ZmRhYjAiLCJpYXQiOjE3MTM4NzkxMDMuNTkzODE3LCJuYmYiOjE3MTM4NzkxMDMuNTkzODIsImV4cCI6MTc0NTQxNTEwMi4zNjIyMjYsInN1YiI6IjQiLCJzY29wZXMiOltdfQ.CXz8fHICdKLT6AOp3bOMrTP878F30VL0tE1AyUkX3s1pP3WP0FtPa0J-KIhOk7ItDAhZW5WEFekQN24s4qDvn--PgrLSoKbKiqd8E1Z_F7tl0XoeFLVn-IX-bJwfLJLrE2C5SwECgMet1hcZUJzvx-CIq1DROYX0TT62cWPfsucsuZ9WnrJzWQybi5FshYWC_o0oyNu9GCoJYWUtD4irmubdAEK3JdAnluO5ivOX3y8LjTHipF7_-wONKsqAJ229sCF-ZV2gbXYqw2LiiPyiVUIMJY5Z9hLKl_gZ-gVii98QUois7Nyjhu-GYdbpux6c5v8BTnn1hQRNVGab7hbloTpDbmFP3VS6INEr3sOZhYfUPOFujVZCOm-KVqMPKm56pB9EviHq5VfL6SGbZjXAuzIQzbl8Uhn1vafbtN-Phq2ZcRHt2bi8pDf8257mUKLE6uwvAyz6XMB4BMG16CfMi7xyXDhJW1G-FSYOvP6ZTsxDxj031jKtRElp39e7784ZPFaXQGhjQPqpRlyfkM7Z546DWF5bddal5124pz7jxl0h0TJvPDy2XAm0nVjyrOHSkaJAmjyGvu0xghGaX9ayRz5rcDR5F9m7v9NCfJ6tSKTZ_1rvr7lQiKH-RYv5bvNqG30md_9HEBgTzfq6VnAMaTPW7oNJv2YjZap5SKIqhfE'
            }
        })
        .then((response) => {
            setFormData(response.data);
            setLoading(false)
        })
        .catch((error) => {
            console.error('Errorr fetching product id', error);
            setLoading(false);
        })
    }, [id])


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

    const handleUpdateProduct = async (event:FormEvent<HTMLFormElement>) => {
        setLoading(true);

        event.preventDefault();

        try{
            const response = await axios.put('http://127.0.0.1:8000/api/admin/updateproduct', formData, {
                headers:{
                    Authorization :'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGIwMTZiNzk4OTE0ZjBmMWJjMDVlOWRkOWY1MTY1Yjk3YmMzMjk0OTY0M2RlNmIxYzliZGY3MTAzNzQ1MjdkN2I3NzdkYmQxOWE5ZmRhYjAiLCJpYXQiOjE3MTM4NzkxMDMuNTkzODE3LCJuYmYiOjE3MTM4NzkxMDMuNTkzODIsImV4cCI6MTc0NTQxNTEwMi4zNjIyMjYsInN1YiI6IjQiLCJzY29wZXMiOltdfQ.CXz8fHICdKLT6AOp3bOMrTP878F30VL0tE1AyUkX3s1pP3WP0FtPa0J-KIhOk7ItDAhZW5WEFekQN24s4qDvn--PgrLSoKbKiqd8E1Z_F7tl0XoeFLVn-IX-bJwfLJLrE2C5SwECgMet1hcZUJzvx-CIq1DROYX0TT62cWPfsucsuZ9WnrJzWQybi5FshYWC_o0oyNu9GCoJYWUtD4irmubdAEK3JdAnluO5ivOX3y8LjTHipF7_-wONKsqAJ229sCF-ZV2gbXYqw2LiiPyiVUIMJY5Z9hLKl_gZ-gVii98QUois7Nyjhu-GYdbpux6c5v8BTnn1hQRNVGab7hbloTpDbmFP3VS6INEr3sOZhYfUPOFujVZCOm-KVqMPKm56pB9EviHq5VfL6SGbZjXAuzIQzbl8Uhn1vafbtN-Phq2ZcRHt2bi8pDf8257mUKLE6uwvAyz6XMB4BMG16CfMi7xyXDhJW1G-FSYOvP6ZTsxDxj031jKtRElp39e7784ZPFaXQGhjQPqpRlyfkM7Z546DWF5bddal5124pz7jxl0h0TJvPDy2XAm0nVjyrOHSkaJAmjyGvu0xghGaX9ayRz5rcDR5F9m7v9NCfJ6tSKTZ_1rvr7lQiKH-RYv5bvNqG30md_9HEBgTzfq6VnAMaTPW7oNJv2YjZap5SKIqhfE',
                    'Content-Type':'application/json'
                }
            });

            Swal.fire({
                title:'Update',
                text:'Product details updated',
                icon:'success'
            });

            setLoading(false);

            return response.data;
        }catch(error){
            console.log('Error updating product details', error);
            setLoading(false);
        }
    }

  return (

    <div className="flex flex-col items-center mt-10">

        <div className="w-3/4 md:w-1/2">

            <h3 className="text-3xl text-cyan-900 font-bold">Edit Product Details</h3>
            <h4 className="text-xl text-gray-500 mt-4">Please enter details</h4>


            <form className="space-y-6" onSubmit={handleUpdateProduct}>
                
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
                       
                        <select name="category" value={formData.category_id} onChange={handleSelect} className="w-1/2 py-1 text-gray-900 shadow-sm">
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

export default UpdateProduct