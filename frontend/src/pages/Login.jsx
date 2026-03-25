import { useState } from "react";

export const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newValue =
            name === "email"
                ? value.trim().toLowerCase()
                : value;

            setFormData((prev) => ({
            ...prev,
            [name]: newValue
        }));

        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    };

    const validate = () => {
        let newErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } 

        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0){
            setErrors(validationErrors)
            return
        }

         try {
            const res = await fetch ("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if(!res.ok){
                alert(data.message)
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            
            alert("Login successfully!");

            setFormData({
                email: "",
                password: "",
            });
            setErrors({});

        } catch (error) {
            console.log(error);
            alert("Something went wrong")
        }

    } 

  return (
    <div>
        <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            placeholder="example@email.com"
        />
        {errors.email && <p>{errors.email}</p>}

        <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange}
            placeholder="Password"
        />
        {errors.password && <p>{errors.password}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  )
}