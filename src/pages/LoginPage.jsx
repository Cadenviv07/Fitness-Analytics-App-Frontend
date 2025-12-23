import AuthForm from "../components/AuthForm";
import { login } from "../api/auth";

export default function LoginPage(){
    const handleLogin =  async ({username, email, password}) => {
      console.log("Logging in:", username, email, password);
      try{
          const response = await login({username, email, password});
          const token = response.data;
          localStorage.setItem("token", token);
          console.log("Signup Succsesful: ", token);

          window.location.href = "/";

        }catch(error){
          console.error("Login failed:", error.response?.data || error.message);
          alert("Login failed. Please try again.");
        }
    }

    return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
}