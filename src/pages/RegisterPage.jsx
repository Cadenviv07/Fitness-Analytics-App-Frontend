import AuthForm from "../components/AuthForm";
import { register } from "../api/auth";

export default function SignupPage(){
      const handleRegister = async ({ username, email, password }) => {
        try{
          const response = await register({username, email, password});
          console.log("Signup Succsesful: ", response.data);

          localStorage.setItem("email", email);

          alert("Account created succsesfully");
          window.location.href = "/verify";
        }catch(error){
          console.error("Signup failed:", error.response?.data || error.message);
          alert("Signup failed. Please try again.");
        }
      };

    return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <AuthForm type="register" onSubmit={handleRegister} />
    </div>
  );
}