import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { userStore } from "../stores/userStore";

const SignUpPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup } = userStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    await signup(formData);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center p-6 pt-24">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl w-full max-w-md p-10 border border-white/20"
      >
        <div className="text-center mb-12">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-playfair font-bold text-rose-800 mb-4">
            Welcome Aboard
          </motion.h1>
          <p className="text-rose-600/80 font-light">Create your exclusive account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {[{ name: "name", icon: FaUser, placeholder: "Full Name", type: "text" },
            { name: "email", icon: FaEnvelope, placeholder: "Email Address", type: "email" },
            { name: "password", icon: FaLock, placeholder: "Password", type: "password" },
            { name: "confirmPassword", icon: FaLock, placeholder: "Confirm Password", type: "password" }
          ].map((field, index) => (
            <motion.div key={field.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 + 0.4 }}>
              <div className="relative group">
                <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-600/50 transition-colors group-focus-within:text-rose-600" />
                <input
                  {...register(field.name, { required: true })}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full pl-12 pr-6 py-4 bg-white/50 rounded-xl border border-rose-100 focus:border-rose-200 focus:ring-2 focus:ring-rose-100/30 placeholder-rose-600/50 text-rose-900 transition-all"
                />
              </div>
            </motion.div>
          ))}

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-gradient-to-r from-rose-400 to-amber-400 p-[2px] rounded-xl overflow-hidden transition-all hover:shadow-lg hover:shadow-rose-200/50">
            <div className="bg-white/95 rounded-xl py-4 px-6 flex items-center justify-center gap-2">
              <span className="bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent font-semibold">
                {isSubmitting ? <motion.div className="w-6 h-6 border-4 border-rose-100 border-t-rose-500 rounded-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} /> : "Create Account"}
              </span>
              {!isSubmitting && <FaArrowRight className="text-rose-600" />}
            </div>
          </motion.button>
        </form>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 text-center text-rose-600/80">
          Already have an account? <Link to="/login" className="text-rose-600 font-semibold hover:text-amber-600 transition-colors">Sign In</Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
