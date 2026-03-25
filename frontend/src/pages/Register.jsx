import { useState } from "react";

export const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        contactNumber: "",
        role: "user"
    });

    const [errors, setErrors] =  useState({});

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
        const passwordRegex = /^(?=.*\d).{8,}$/;
        const phoneRegex = /^09\d{9}$/;

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Must contain at least 1 number";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!formData.contactNumber) {
            newErrors.contactNumber = "Contact number is required";
        } else if (!phoneRegex.test(formData.contactNumber)) {
            newErrors.contactNumber = "Must be 11 digits starting with 09";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0){
            setErrors(validationErrors)
            return
        }

        try {
            const res = await fetch ("http://localhost:5000/api/auth/register", {
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

            alert("Registered successfully!");

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                contactNumber: "",
                role: "user"
            });
            setErrors({});
            
        } catch (error) {
            console.log(error);
            alert("Something went wrong")
        }


    }

  return (
    <div>
      <h1>REGISTER</h1>
      <form onSubmit={handleSubmit}>

        <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            placeholder="Juan Dela Cruz"
        />
        {errors.name && <p>{errors.name}</p>}

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

        <input 
            type="password" 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={handleChange}
            placeholder="Confirm Password"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

        <input 
            type="text" 
            name="contactNumber" 
            value={formData.contactNumber} 
            onChange={handleChange}
            placeholder="ex. 09123456789"
        />
        {errors.contactNumber && <p>{errors.contactNumber}</p>}

        <p>Role:</p>

        <label>
            <input
                type="radio"
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={handleChange}
            />
        User
        </label>

        <label>
            <input
                type="radio"
                name="role"
                value="admin"
                checked={formData.role === "admin"}
                onChange={handleChange}
            />
            Admin
            </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}