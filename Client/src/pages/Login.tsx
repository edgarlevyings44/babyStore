import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {

    const [formData, setFormData] = useState({
        email:"",
        password:""
    });

    const navigate = useNavigate();

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        const key = event.target.name;
        const value = event.target.value;

        setFormData({ ...formData, [key]:value});
    }



    const handleLogin: FormEventHandler<HTMLFormElement> = (event) => {
        
        event.preventDefault();

        fetch('http://127.0.0.1:8000/api/login', {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(formData)
        })
        .then((response) => {
            if (response.ok){
                Swal.fire({
                    position:"top-end",
                    icon:"success",
                    title:"Logged in",
                    showConfirmButton:false,
                    timer:1000
                })

                navigate('/cart');
            }else{
                Swal.fire({
                    icon:"error",
                    title:"Ooops...",
                    text:"Something went wrong"
                })
            }
        })
    }
  return (
    <div className="container flex flex-col justify-center items-center mx-auto mt-60">

        <div className="mx-auto">

            <h3 className="text-3xl text-cyan-900 font-bold">Welcome</h3>
            <h4 className="text-xl text-gray-500 mt-4">Please login here</h4>


            <form className="space-y-6" onSubmit={handleLogin}>

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

                <div className="flex items-center">
                    <div>
                        <input type="checkbox" name="rememberme" className="form-checkbox mr-2"></input>
                    </div>

                    <label className="text-blue-900">Remember Me</label>

                    <a href="/resetpassword" className="text-blue-500 ml-36">Forgot Password ?</a>

                </div>

                <div>
                    <button type="submit" className="flex justify-center px-40 py-4 rounded-md bg-blue-600 font-semibold hover:bg-green-900 cursor-pointer text-white text-2xl">SignUp</button>
                </div>

            </form>

        </div>
    </div>
  )
}

export default Login