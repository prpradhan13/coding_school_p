import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpPage() {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/signup`,
          formData
        );
  
        if (res && res.data.success) {
          localStorage.setItem("auth", JSON.stringify(res.data));
          navigate(location.state || "/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    
  const togglePassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className='register'>
        <form className='form' onSubmit={handleSubmit}>
            <div className="input_field">
                <label>Full Name</label>
                <input 
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="input_field">
                <label>Email</label>
                <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="input_field">
                <label>Password</label>
                <input 
                    type={`${showPassword ? 'password' : 'text'}`}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button onClick={togglePassword}>
                  {showPassword ? 'show':'hide'}
                </button>
            </div>

            <button type="submit" className='btn'>
                {isLoading ? 'Loading...' : 'Sign Up'}
            </button>
        </form>
    </div>
  )
}

export default SignUpPage
