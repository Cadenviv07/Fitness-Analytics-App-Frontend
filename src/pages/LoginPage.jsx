import AuthForm from "../components/AuthForm";

export default function LoginPage(){
    const handleLogin =  async ({email, password}) => {
      console.log("Logging in:", email, password);
      try{
          const response = await login({email, password});
          const token = response.data;

          localStorage.setItem("Token", token);
          console.log("Signup Succsesful: ", token);
      
        }catch{
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