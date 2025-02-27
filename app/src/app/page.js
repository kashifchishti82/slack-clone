"use client"
import { useState } from "react";
import axios from "axios";
//import { useRouter } from "next/router";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login", { email, password }, { withCredentials: true });
            localStorage.setItem("token", response.data.token);
            // router.push("/chat");
        } catch (error) {
            alert("Invalid credentials");
        }
    };


  return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-2" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-2" onChange={(e) => setPassword(e.target.value)}/>
            <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
          </form>
        </div>
      </div>
  );
}
