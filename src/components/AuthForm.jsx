import React, { useState } from "react";

function AuthForm({type, onSubmit}){
    const[username, setUsername] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ username, email, password });
    };

    return (
        <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-sm mx-auto mt-10"
        >
       
        <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-64"
        />
           
        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        />

        <input
        type = "password"
        placeholder = "Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
        />
        <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
            {type === "login" ? "Log In" : "Sign Up"}
        </button>
        </form>
    );
}
export default AuthForm;

