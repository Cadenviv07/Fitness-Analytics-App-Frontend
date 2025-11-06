import { useState } from "react";
import { sendVerificationEmail, verifyEmail } from "../api/auth";

export default function VerificationPage(){
    const[code ,setCode] = useState("");
    const email = localStorage.getItem("email");

    const handleSendVerify = async () => {
        try{
            const email = localStorage.getItem("email");
            const response = await sendVerificationEmail(email);
            console.log("Verification email sent:", response.data);
            alert("Verification email sent successfully!");
        }catch{
            console.error("Verification email failed to send: ", error.response?.data || error.message);
            alert("Verification email failed to send please try again");
        }
    }

    const handleVerify = async () => {
        try{
            const response = await verifyEmail({email, code});
            console.log("Verification successful:", response.data);
            alert("Email verified successfully!");
            window.location.href = "/login";
        }catch(error){
            console.error("Verification failed:", error.response?.data || error.message);
            alert("Invalid code or verification failed. Please try again.");
        }
    };

    
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-semibold mb-6">Verify Your Email</h1>
        <p className="text-gray-600 mb-4">A verification code was sent to: <strong>{email}</strong></p>

        <button
            onClick={handleSendVerify}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
            Send Verification Email
        </button>

        <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
            onClick={handleVerify}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
            Verify Email
        </button>
        </div>
    );
}

