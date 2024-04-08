function Login() {
  return (
    <div className="container flex flex-col justify-center items-center mx-auto mt-60">

        <div className="mx-auto">

            <h3 className="text-3xl text-cyan-900 font-bold">Welcome</h3>
            <h4 className="text-xl text-gray-500 mt-4">Please login here</h4>


            <form className="space-y-6">

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-600">Email Address</label>
                    <div className="mt-4">
                        <input name="email" type="email" required className="w-full rounded-md border-2 border-zinc-950 indent-3 text-gray-900 shadow-sm py-1.5"/>
                    </div>
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-600">Password</label>
                    <div className="mt-4">
                        <input name="password" type="password" required className="w-full rounded-md border-2 border-zinc-950 indent-3 text-gray-900 shadow-sm py-1.5"/>
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