import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


function UserDetails() {

    interface FormData{
        firstname:string;
        lastname:string;
        email:string;
        password:string;
        confirmpassword:string
    }

    const {id} = useParams();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        confirmpassword:""
    });



    useEffect(() => {
        setLoading(true);

        axios.get(`http://127.0.0.1:8000/api/admin/singlecustomer/${id}`, {
            headers:{
                Authorization :'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGIwMTZiNzk4OTE0ZjBmMWJjMDVlOWRkOWY1MTY1Yjk3YmMzMjk0OTY0M2RlNmIxYzliZGY3MTAzNzQ1MjdkN2I3NzdkYmQxOWE5ZmRhYjAiLCJpYXQiOjE3MTM4NzkxMDMuNTkzODE3LCJuYmYiOjE3MTM4NzkxMDMuNTkzODIsImV4cCI6MTc0NTQxNTEwMi4zNjIyMjYsInN1YiI6IjQiLCJzY29wZXMiOltdfQ.CXz8fHICdKLT6AOp3bOMrTP878F30VL0tE1AyUkX3s1pP3WP0FtPa0J-KIhOk7ItDAhZW5WEFekQN24s4qDvn--PgrLSoKbKiqd8E1Z_F7tl0XoeFLVn-IX-bJwfLJLrE2C5SwECgMet1hcZUJzvx-CIq1DROYX0TT62cWPfsucsuZ9WnrJzWQybi5FshYWC_o0oyNu9GCoJYWUtD4irmubdAEK3JdAnluO5ivOX3y8LjTHipF7_-wONKsqAJ229sCF-ZV2gbXYqw2LiiPyiVUIMJY5Z9hLKl_gZ-gVii98QUois7Nyjhu-GYdbpux6c5v8BTnn1hQRNVGab7hbloTpDbmFP3VS6INEr3sOZhYfUPOFujVZCOm-KVqMPKm56pB9EviHq5VfL6SGbZjXAuzIQzbl8Uhn1vafbtN-Phq2ZcRHt2bi8pDf8257mUKLE6uwvAyz6XMB4BMG16CfMi7xyXDhJW1G-FSYOvP6ZTsxDxj031jKtRElp39e7784ZPFaXQGhjQPqpRlyfkM7Z546DWF5bddal5124pz7jxl0h0TJvPDy2XAm0nVjyrOHSkaJAmjyGvu0xghGaX9ayRz5rcDR5F9m7v9NCfJ6tSKTZ_1rvr7lQiKH-RYv5bvNqG30md_9HEBgTzfq6VnAMaTPW7oNJv2YjZap5SKIqhfE'
            }
        })
        .then((response) => {
            setFormData(response.data);
            setLoading(false)
        })
        .catch((error) => {
            console.error('Error fetching id user', error)
            setLoading(false);
        })
        
    }, [id])





    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        const key = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [key]:value});
    }


    const handleUpdateUserDetails = async (event:FormEvent<HTMLFormElement>) =>{
        setLoading(true);
        
        event.preventDefault();

        try {
            const response = await axios.put('http://127.0.0.1:8000/api/admin/updateuser', formData, {
                headers:{
                    Authorization :'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGIwMTZiNzk4OTE0ZjBmMWJjMDVlOWRkOWY1MTY1Yjk3YmMzMjk0OTY0M2RlNmIxYzliZGY3MTAzNzQ1MjdkN2I3NzdkYmQxOWE5ZmRhYjAiLCJpYXQiOjE3MTM4NzkxMDMuNTkzODE3LCJuYmYiOjE3MTM4NzkxMDMuNTkzODIsImV4cCI6MTc0NTQxNTEwMi4zNjIyMjYsInN1YiI6IjQiLCJzY29wZXMiOltdfQ.CXz8fHICdKLT6AOp3bOMrTP878F30VL0tE1AyUkX3s1pP3WP0FtPa0J-KIhOk7ItDAhZW5WEFekQN24s4qDvn--PgrLSoKbKiqd8E1Z_F7tl0XoeFLVn-IX-bJwfLJLrE2C5SwECgMet1hcZUJzvx-CIq1DROYX0TT62cWPfsucsuZ9WnrJzWQybi5FshYWC_o0oyNu9GCoJYWUtD4irmubdAEK3JdAnluO5ivOX3y8LjTHipF7_-wONKsqAJ229sCF-ZV2gbXYqw2LiiPyiVUIMJY5Z9hLKl_gZ-gVii98QUois7Nyjhu-GYdbpux6c5v8BTnn1hQRNVGab7hbloTpDbmFP3VS6INEr3sOZhYfUPOFujVZCOm-KVqMPKm56pB9EviHq5VfL6SGbZjXAuzIQzbl8Uhn1vafbtN-Phq2ZcRHt2bi8pDf8257mUKLE6uwvAyz6XMB4BMG16CfMi7xyXDhJW1G-FSYOvP6ZTsxDxj031jKtRElp39e7784ZPFaXQGhjQPqpRlyfkM7Z546DWF5bddal5124pz7jxl0h0TJvPDy2XAm0nVjyrOHSkaJAmjyGvu0xghGaX9ayRz5rcDR5F9m7v9NCfJ6tSKTZ_1rvr7lQiKH-RYv5bvNqG30md_9HEBgTzfq6VnAMaTPW7oNJv2YjZap5SKIqhfE',
                    'Content-Type':'application/json'
                }
                
            });

            Swal.fire({
                title:'Update',
                text:'User details updated',
                icon:'success'
            });

            setLoading(false);
            return response.data;
        }catch(error){
            console.log('Error updating user details', error);
            setLoading(false);
        }

    };

  return (
    <div className="flex flex-col items-center">

        <div className="mt-5">
            <h1 className="text-2xl">User Details</h1>
            <form className="mt-5" onSubmit={handleUpdateUserDetails}>

                <div className="flex items-center gap-5 mt-5">
                    <label className="block text-lg font-medium text-gray-600 w-[7rem]">First Name</label>
                    <div className="flex flex-1">
                        <input onChange={handleChange} className="w-full rounded-md border-2 border-zinc-950 indent-3 text-gray-900 shadow-sm py-1" name="firstname" value={formData.firstname}/>
                    </div>
                </div>

                <div className="flex items-center gap-5 mt-5">
                    <label className="block text-lg font-medium text-gray-600 w-[7rem]">Last Name</label>
                    <div className="flex flex-1">
                        <input onChange={handleChange} className="w-full rounded-md border-2 border-zinc-950 indent-3 text-gray-900 shadow-sm py-1" name="lastname" value={formData.lastname}/>
                    </div>
                </div>

                <div className="flex items-center gap-5 mt-5">
                    <label className="block text-lg font-medium text-gray-600 w-[7rem]">Email</label>
                    <div className="flex flex-1">
                        <input onChange={handleChange} className="w-full rounded-md border-2 border-zinc-950 indent-3 text-gray-900 shadow-sm py-1" name="email" value={formData.email}/>
                    </div>
                </div>

                <div className="flex items-center gap-5 mt-5">
                    <label className="block text-lg font-medium text-gray-600 w-[7rem]">Password</label>
                    <div className="flex flex-1">
                        <input onChange={handleChange} className="w-full rounded-md border-2 border-zinc-950 indent-3 text-gray-900 shadow-sm py-1" name="password" value={formData.password}/>
                    </div>
                </div>

                <div className="flex items-center gap-5 mt-5">
                    <label className="block text-lg font-medium text-gray-600 w-[7rem]">Confirm Password</label>
                    <div className="flex flex-1">
                        <input onChange={handleChange} className="w-full rounded-md border-2 border-zinc-950 indent-3 text-gray-900 shadow-sm py-1" name="confirmpassword" value={formData.password}/>
                    </div>
                </div>

                <div className="text-center mt-5">
                    <button className="bg-green-600 w-20 h-8 rounded-md" type="submit">Save</button>
                </div>

            </form>
        </div>

        {loading && (
                <tfoot>
                    <tr>
                        <td colSpan={6} className='text-center text-2xl p-4'>Loading...</td>
                    </tr>
                </tfoot>
            )}
    </div>
  )
}

export default UserDetails