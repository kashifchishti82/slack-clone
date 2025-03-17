import {useState} from "react";
import {useMutation} from "@apollo/client";
import {LOGIN_MUTATION} from "@/chat-server/mutations/login";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginUser, {data, loading, error}] = useMutation(LOGIN_MUTATION, {
        onCompleted: (data) => {
            if (data &&  data.login.token) {
                const token = data.login.token; // get the token from the response
                Cookies.set('token', token, { expires: 7, path: '' }) // save the token in the local storage
                Cookies.set('user', JSON.stringify(data.login.user), { expires: 7, path: '' })
                //localStorage.setItem('user', JSON.stringify(data.login.user)); // save the user data in the local storage
                router.push('/chat'); // redirect to the chat page
            } else {
                console.log(data.login.response)
            }
        }
    })
    const handleLogin = async (e) => {
        e.preventDefault();
        await loginUser({variables: {email, password}})
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Welcome Section */}
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-700">Welcome Back!</h1>
                <p className="text-center text-gray-600">Please log in to your account.</p>

                {/* Login Form */}
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="********"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={handleLogin}
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Log In
                    </button>
                </form>

                <div className="flex items-center justify-between">
                    <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
                    <a href="#" className="text-sm text-blue-600 hover:underline">Sign Up</a>
                </div>

                {/* Social Login Section */}
                <div className="mt-6">
                    <p className="text-center text-gray-600">Or log in with</p>
                    <div className="flex justify-around mt-4">
                        <a href="#"
                           className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700">
                            {/* Google SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 48 48"
                                 fill="currentColor">
                                <path
                                    d="M23.75 24h-11.3v12.6h11.3c6.2 0 11.2-5 11.2-11.3s-5-11.3-11.2-11.3h-11.3v12.6h11.3c2.6 0 4.8 2.2 4.8 4.8s-2.2 4.8-4.8 4.8zM0 24c0 6.2 5 11.2 11.2 11.2h12.6v-12.6H11.2C5 24 0 24 0 24z"/>
                            </svg>
                        </a>
                        <a href="#"
                           className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700">
                            {/* Apple SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24"
                                 fill="currentColor">
                                <path
                                    d="M17.6 0h-11.2C5.2 0 0 5.2 0 11.6c0 6.4 5.2 11.6 11.6 11.6h11.2c6.4 0 11.6-5.2 11.6-11.6S24 0 17.6 0zm1.6 17.6h-1.6c-.8 0-1.6-.8-1.6-1.6v-1.6h-1.6v1.6c0 2.4 2.4 4.8 4.8 4.8h1.6v1.6H19.2c-3.2 0-5.6-2.4-5.6-5.6V12c0-3.2 2.4-5.6 5.6-5.6h1.6v1.6H19.2c-1.6 0-2.4 1.6-2.4 2.4v1.6c0 .8.8 1.6 1.6 1.6h1.6v1.6z"/>
                            </svg>
                        </a>
                        <a href="#"
                           className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700">
                            {/* GitHub SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24"
                                 fill="currentColor">
                                <path
                                    d="M12 .5C5.373.5 0 5.873 0 12.5c0 5.513 3.577 10.184 8.438 11.834.617.113.843-.267.843-.594 0-.295-.01-1.286-.016-2.33-3.438.746-4.168-1.67-4.168-1.67-.562-1.43-1.375-1.81-1.375-1.81-1.125-.77.085-.754.085-.754 1.244.087 1.898 1.282 1.898 1.282 1.107 1.905 2.905 1.354 3.614 1.037.112-.802.433-1.354.79-1.667-2.665-.303-5.465-1.335-5.465-5.93 0-1.312.468-2.383 1.236-3.22-.124-.303-.535-1.533.117-3.194 0 0 1.008-.322 3.303 1.226a11.513 11.513 0 013.006-.404c1.018.004 2.042.137 3.003.404 2.293-1.547 3.303-1.226 3.303-1.226.654 1.661.241 2.891.118 3.194.77.837 1.236 1.908 1.236 3.22 0 4.61-2.805 5.62-5.465 5.93.444.38.84 1.12.84 2.246 0 1.623-.014 2.93-.014 3.324 0 .329.223.711.848.594C20.423 22.684 24 17.995 24 12.5 24 5.873 18.627.5 12 .5z"/>
                            </svg>
                        </a>
                        <a href="#"
                           className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700">
                            {/* Microsoft SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24"
                                 fill="currentColor">
                                <path
                                    d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12C24 5.373 18.627 0 12 0zm-1.5 17H9v-3h1.5v3zm0-4.5H9v-3h1.5v3zm3 4.5h-1.5v-3H15v3zm0-4.5h-1.5v-3H15v3z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>


            {/* Footer Section */}
            <footer className="mt-8 text-center text-gray-500">
                &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </footer>
        </div>
    )
}