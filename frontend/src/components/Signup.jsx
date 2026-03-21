import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email Address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.role) {
      newErrors.role = 'Position/Role is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters, include uppercase, lowercase, and a number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms & Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Signup successful', formData);
      // Proceed with signup logic
    }
  };

  return (
    <div className="min-h-screen bg-[#e6f2f0] flex flex-col">
      {/* Navbar on Signup Page */}
      <nav className="py-6 px-10 flex justify-between items-center">
        <div className="flex items-center gap-2.5 font-sans font-extrabold text-2xl text-black">
          <div className="w-6 h-6 bg-black rounded" />
          <span>LeadFlow</span>
        </div>
        <ul className="flex gap-8 text-sm font-medium text-muted">
          <li><Link to="/" className="hover:text-primary transition-colors">Overview</Link></li>
          <li><Link to="/" className="hover:text-primary transition-colors">Plans</Link></li>
          <li><Link to="/" className="hover:text-primary transition-colors">Support</Link></li>
        </ul>
      </nav>

      {/* Signup Card Container */}
      <div className="flex-1 flex items-center justify-center p-5 py-10">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-muted text-sm mb-6 hover:text-primary transition-colors"
          >
            <span>←</span> Back
          </button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Create an account</h1>
            <p className="text-muted text-sm font-medium">Enter your details below to get started.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-primary mb-1">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-xl bg-white border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-1">Email Address</label>
              <input 
                type="text" 
                placeholder="name@example.com"
                className={`w-full px-4 py-3 rounded-xl bg-white border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-1">Position/Role</label>
              <select 
                className={`w-full px-4 py-3 rounded-xl bg-white border ${errors.role ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none`}
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="">Select your role</option>
                <option value="sales_manager">Sales manager</option>
                <option value="sales_representative">Sales representative</option>
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>

            <div className="relative">
              <label className="block text-sm font-bold text-primary mb-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create a password"
                  className={`w-full px-4 py-3 rounded-xl bg-white border ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all pr-12`}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="relative">
              <label className="block text-sm font-bold text-primary mb-1">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Repeat password"
                  className={`w-full px-4 py-3 rounded-xl bg-white border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all pr-12`}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="terms"
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
              />
              <label htmlFor="terms" className="text-xs text-muted font-medium">
                I agree to the <a href="#" className="text-primary font-bold hover:underline">Terms & Conditions</a> and <a href="#" className="text-primary font-bold hover:underline">Privacy Policy</a>.
              </label>
            </div>
            {errors.agreeToTerms && <p className="text-red-500 text-xs mt-0">{errors.agreeToTerms}</p>}

            <button 
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-[#0a3d37] transition-all shadow-lg shadow-primary/10 mt-2"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-8 font-medium">
            Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
