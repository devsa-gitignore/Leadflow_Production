// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import { login } from '../utils/auth';

// const Login = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     role: ''
//   });
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     // Password regex: at least 8 chars, 1 uppercase, 1 lowercase, 1 number
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (!passwordRegex.test(formData.password)) {
//       newErrors.password = 'Password must be at least 8 characters, include uppercase, lowercase, and a number';
//     }

//     if (!formData.role) {
//       newErrors.role = 'Please select a role';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       try {
//         const user = login(formData.email, formData.password);
//         console.log('Login successful', user);
        
//         // Ensure the role matches what they selected
//         if (user.role !== formData.role) {
//             setErrors({ ...errors, role: `You are registered as a ${user.role.replace('_', ' ')}` });
//             return;
//         }

//         if (user.role === 'sales_manager' || user.role==='sales_representative') {
//           navigate('/dashboard');
//         }
//       } catch (err) {
//         setErrors({ ...errors, email: err.message });
//       }
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="min-h-screen bg-[#e6f2f0] flex flex-col">
//       <Navbar />

//       {/* Login Card Container */}
//       <div className="flex-1 flex items-center justify-center p-4 md:p-8">
//         <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-md">
//           <button 
//             onClick={() => navigate(-1)} 
//             className="flex items-center gap-2 text-muted text-sm mb-6 hover:text-primary transition-colors"
//           >
//             <span>←</span> Back
//           </button>

//           <div className="text-center mb-8">
//             <div className="w-16 h-16 bg-[#f0f7f6] rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-gray-300">
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
//                 <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
//                 <circle cx="8.5" cy="8.5" r="1.5" />
//                 <polyline points="21 15 16 10 5 21" />
//               </svg>
//             </div>
//             <h1 className="text-3xl font-bold text-primary mb-2">Login to your account</h1>
//             <p className="text-muted text-sm">Please enter your details to sign in</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <input 
//                 type="text" 
//                 placeholder="Enter your email"
//                 className={`w-full px-4 py-3 rounded-xl bg-[#f8fafb] border ${errors.email ? 'border-red-500' : 'border-gray-100'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
//                 value={formData.email}
//                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//               />
//               {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//             </div>

//             <div className="relative">
//               <div className="flex justify-between items-center mb-1">
//                 <label className="text-sm font-medium text-gray-700">Password</label>
//                 <a href="#" className="text-primary text-xs font-semibold hover:underline">Forgot Password?</a>
//               </div>
//               <div className="relative">
//                 <input 
//                   type={showPassword ? "text" : "password"} 
//                   placeholder="Enter your password"
//                   className={`w-full px-4 py-3 rounded-xl bg-[#f8fafb] border ${errors.password ? 'border-red-500' : 'border-gray-100'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all pr-12`}
//                   value={formData.password}
//                   onChange={(e) => setFormData({...formData, password: e.target.value})}
//                 />
//                 <button 
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
//                 >
//                   {showPassword ? (
//                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
//                       <line x1="1" y1="1" x2="23" y2="23" />
//                     </svg>
//                   ) : (
//                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//                       <circle cx="12" cy="12" r="3" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
//               <select 
//                 className={`w-full px-4 py-3 rounded-xl bg-[#f8fafb] border ${errors.role ? 'border-red-500' : 'border-gray-100'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none`}
//                 value={formData.role}
//                 onChange={(e) => setFormData({...formData, role: e.target.value})}
//               >
//                 <option value="">Select your role</option>
//                 <option value="sales_manager">Sales manager</option>
//                 <option value="sales_representative">Sales representative</option>
//               </select>
//               {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
//             </div>

//             <button 
//               type="submit"
//               className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-[#0a3d37] transition-all shadow-lg shadow-primary/10 mt-2"
//             >
//               Login
//             </button>
//           </form>

//           <p className="text-center text-sm text-muted mt-8 font-medium">
//             Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign up</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { login } from '../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters, include uppercase, lowercase, and a number';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const user = login(formData.email, formData.password);
console.log('Login successful', user);

// STORE FIRST
localStorage.setItem("role", user.role);
localStorage.setItem("name", user.fullName);

// THEN VALIDATE ROLE
if (user.role !== formData.role) {
  setErrors({
    ...errors,
    role: `You are registered as a ${user.role.replace('_', ' ')}`
  });
  return;
}

// NAVIGATE
navigate('/dashboard');
      } catch (err) {
        setErrors({ ...errors, email: err.message });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-[#e6f2f0] flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-md">

          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-muted text-sm mb-6 hover:text-primary transition-colors"
          >
            ← Back
          </button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Login to your account
            </h1>
            <p className="text-muted text-sm">
              Please enter your details to sign in
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="text" 
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-xl bg-[#f8fafb] border ${
                  errors.email ? 'border-red-500' : 'border-gray-100'
                }`}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative mt-1">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 rounded-xl bg-[#f8fafb] border ${
                    errors.password ? 'border-red-500' : 'border-gray-100'
                  } pr-12`}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />

                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  👁
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* ROLE */}
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select 
                className={`w-full px-4 py-3 rounded-xl bg-[#f8fafb] border ${
                  errors.role ? 'border-red-500' : 'border-gray-100'
                }`}
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="">Select your role</option>
                <option value="sales_manager">Sales manager</option>
                <option value="sales_representative">Sales representative</option>
              </select>

              {errors.role && (
                <p className="text-red-500 text-xs mt-1">{errors.role}</p>
              )}
            </div>

            {/* BUTTON */}
            <button 
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-xl font-bold"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm mt-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-bold">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;