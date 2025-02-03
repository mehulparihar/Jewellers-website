import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userStore } from '../stores/userStore';
import { FiLock, FiMail, FiArrowRight } from 'react-icons/fi';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { login } = userStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-orange-50 to-amber-50 flex items-center justify-center relative overflow-hidden p-6 pt-24">
      {/* Floating Liquid Blobs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-30"
          style={{
            background: `linear-gradient(45deg, ${i % 2 ? '#f43f5e' : '#f59e0b'}, ${i % 2 ? '#ec4899' : '#d946ef'})`
          }}
          initial={{
            x: Math.random() * 100 - 50 + "vw",
            y: Math.random() * 100 - 50 + "vh",
            scale: 0
          }}
          animate={{
            scale: [0, 1, 0],
            x: [0, Math.random() * 40 - 20 + "vw", 0],
            y: [0, Math.random() * 40 - 20 + "vh", 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Main Card */}
      <motion.div
        onMouseMove={handleMouseMove}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white/50 backdrop-blur-2xl p-12 rounded-[3rem] shadow-2xl
        border border-white/70 w-full max-w-lg overflow-hidden"
        style={{
          boxShadow: '0 25px 50px -12px rgba(255, 161, 161, 0.2)'
        }}
      >
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(251,113,133,0.15)_0%,transparent_100%)]"
            style={{
              '--mouse-x': useMotionTemplate`${mouseX}px`,
              '--mouse-y': useMotionTemplate`${mouseY}px`,
            }}
          />
        </div>

        <div className="relative z-10 space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-8">
            <motion.div 
              className="inline-block p-6 rounded-2xl bg-white/40 backdrop-blur-lg border border-white/50"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="text-5xl bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
                ✨
              </div>
            </motion.div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-600 via-orange-500 to-pink-500 
              bg-clip-text text-transparent tracking-tight">
              Welcome Back
            </h1>
            <p className="text-rose-500/80 text-lg font-light">
              Continue your beautiful journey
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Email Input */}
            <motion.div 
              className="group relative"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute -inset-[2px] bg-gradient-to-r from-rose-200 to-orange-200 
                rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
              <div className="relative flex items-center bg-white/70 rounded-2xl p-5 border border-white/80
                backdrop-blur-sm gap-4">
                <FiMail className="text-2xl text-rose-500/80 ml-2" />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-rose-700 placeholder-rose-400/70 
                    focus:outline-none border-none text-lg font-light italic"
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div 
              className="group relative"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute -inset-[2px] bg-gradient-to-r from-rose-200 to-orange-200 
                rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
              <div className="relative flex items-center bg-white/70 rounded-2xl p-5 border border-white/80
                backdrop-blur-sm gap-4">
                <FiLock className="text-2xl text-orange-500/80 ml-2" />
                <input
                  type="password"
                  placeholder="Your Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-rose-700 placeholder-orange-400/70 
                    focus:outline-none border-none text-lg font-light italic"
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-rose-500 to-orange-400 p-[3px] rounded-2xl 
              shadow-xl hover:shadow-rose-300/40 transition-shadow"
            >
              <div className="bg-white/95 rounded-2xl p-5 text-rose-600 font-semibold tracking-wide
                flex items-center justify-center gap-3 text-lg hover:bg-white transition-colors">
                <span>Continue</span>
                <motion.div
                  animate={{ x: [-5, 5, -5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiArrowRight className="text-xl" />
                </motion.div>
              </div>
            </motion.button>
          </form>

          {/* Footer Links */}
          <div className="text-center space-y-8">
            <Link
              to="/signup"
              className="text-rose-600/80 hover:text-orange-500 transition-colors 
                font-light text-lg group"
            >
              Create New Account
              <div className="h-[2px] bg-gradient-to-r from-transparent via-rose-400/50 to-transparent 
                w-0 group-hover:w-full transition-all duration-500 mt-1" />
            </Link>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-rose-300/50" />
              <span className="text-rose-500/60 text-sm">Secure Connection</span>
              <div className="h-px w-16 bg-rose-300/50" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-rose-400/30 backdrop-blur-sm"
          initial={{
            x: Math.random() * 100 + "vw",
            y: Math.random() * 100 + "vh",
            scale: 0
          }}
          animate={{
            scale: [0, 1, 0],
            x: [0, Math.random() * 40 - 20 + "vw", 0],
            y: [0, Math.random() * 40 - 20 + "vh", 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default LoginPage;