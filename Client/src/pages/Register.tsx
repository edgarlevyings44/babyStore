
import { useState, FormEvent, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { registerUser } from "../Components/urls";

function Register() {
    
    const [formData, setFormData] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:""
    })

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const key = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [key]: value});
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        setLoading(true);

        try {
            await axios.post(registerUser, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            Swal.fire({
                title:"Register",
                text:"Account registered successfully",
                icon:"success"
            });
            navigate('/login');
            

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
    <div className="container flex flex-col justify-center items-center mx-auto mt-60">

        <div className="mx-auto">

            <h3 className="text-3xl text-cyan-900 font-bold">Create New Account</h3>
            <h4 className="text-xl text-gray-500 mt-4">Please enter details</h4>


            <form className="space-y-6" onSubmit={handleSubmit}>
                
                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-600">First Name</label>
                    <div className="mt-4">
                        <input name="firstname" value={formData.firstname} onChange={handleChange} type="name" required className="w-full rounded-xl border-2 border-zinc-950 indent-3 text-gray-900 shadow-sm py-1.5"/>
                    </div>
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-600">Last Name</label>
                    <div className="mt-4">
                        <input name="lastname" value={formData.lastname} onChange={handleChange} type="name" required className="w-full rounded-md border-2 border-zinc-950 indent-3 text-gray-900 shadow-sm py-1.5"/>
                    </div>
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-600">Email Address</label>
                    <div className="mt-4">
                        <input name="email" value={formData.email} onChange={handleChange} type="email" required className="w-full rounded-md border-2 border-zinc-950 indent-3 text-gray-900 shadow-sm py-1.5"/>
                    </div>
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-600">Password</label>
                    <div className="mt-4">
                        <input name="password" value={formData.password} onChange={handleChange} type="password" required className="w-full rounded-md border-2 border-zinc-950 indent-3 text-gray-900 shadow-sm py-1.5"/>
                    </div>
                </div>

                <div className="mb-6 flex items-center">
                    <div>
                        <input type="checkbox" name="terms" className="form-checkbox mr-2"></input>
                    </div>

                    <label className="text-blue-900">I agree to the <span className="font-bold">Terms & Conditions</span></label>

                </div>

                <div>
                    <button type="submit" className="flex justify-center px-40 py-4 rounded-md bg-blue-600 font-semibold hover:bg-green-900 cursor-pointer text-white text-2xl">SignUp</button>
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

export default Register