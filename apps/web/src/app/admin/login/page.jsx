// "use client";

// import React, { useState } from "react";
// import { AlertCircle } from "lucide-react";

// export default function AdminLoginPage() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (error) setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       setError("Please fill in all fields");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     // Simulate API call
//     setTimeout(() => {
//       if (
//         formData.email === "admin@natioid.gov.ng" &&
//         formData.password === "admin123"
//       ) {
//         localStorage.setItem(
//           "adminAuth",
//           JSON.stringify({
//             email: formData.email,
//             role: "Super Admin",
//             loginTime: new Date().toISOString(),
//           }),
//         );
//         window.location.href = "/dashboard";
//       } else {
//         setError("Invalid email or password");
//         setLoading(false);
//       }
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="max-w-md w-full space-y-8">
//         {/* Header */}
//         <div className="text-center">
//           <div className="mx-auto h-16 w-16 bg-[#004040] rounded-full flex items-center justify-center mb-4">
//             <svg
//               className="h-8 w-8 text-white"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//           </div>
//           <h2 className="mt-6 text-3xl font-bold text-gray-900">
//             NatioID Admin
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Sign in to your administrator account
//           </p>
//         </div>

//         {/* Login Form */}
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="bg-white rounded-lg shadow-md p-8">
//             {error && (
//               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
//                 <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
//                 <span className="text-sm text-red-700">{error}</span>
//               </div>
//             )}

//             <div className="space-y-4">
//               {/* Email Input */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Email Address
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004040] focus:border-transparent"
//                   placeholder="admin@natioid.gov.ng"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               {/* Password Input */}
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     autoComplete="current-password"
//                     required
//                     className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004040] focus:border-transparent"
//                     placeholder="Enter your password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <svg
//                         className="h-4 w-4 text-gray-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
//                         />
//                       </svg>
//                     ) : (
//                       <svg
//                         className="h-4 w-4 text-gray-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                         />
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                         />
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Remember Me */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <input
//                     id="remember-me"
//                     name="remember-me"
//                     type="checkbox"
//                     className="h-4 w-4 text-[#004040] focus:ring-[#004040] border-gray-300 rounded"
//                   />
//                   <label
//                     htmlFor="remember-me"
//                     className="ml-2 block text-sm text-gray-700"
//                   >
//                     Remember me
//                   </label>
//                 </div>

//                 <div className="text-sm">
//                   <a
//                     href="#"
//                     className="font-medium text-[#004040] hover:text-[#003030]"
//                   >
//                     Forgot password?
//                   </a>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#004040] hover:bg-[#003030] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004040] ${
//                   loading ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 {loading ? (
//                   <div className="flex items-center">
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                     Signing in...
//                   </div>
//                 ) : (
//                   "Sign in"
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Demo Credentials */}
//           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
//             <div className="flex">
//               <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
//               <div>
//                 <h3 className="text-sm font-medium text-yellow-800">
//                   Demo Credentials
//                 </h3>
//                 <div className="mt-2 text-sm text-yellow-700">
//                   <p>
//                     <strong>Email:</strong> admin@natioid.gov.ng
//                   </p>
//                   <p>
//                     <strong>Password:</strong> admin123
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="text-center">
//             <p className="text-xs text-gray-500">
//               © 2025 Federal Republic of Country. All rights reserved.
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [screen, setScreen] = useState("login"); // "login" | "forgot"

  // LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (email === "admin@natioid.gov.ng" && password === "admin123") {
        localStorage.setItem(
          "adminAuth",
          JSON.stringify({
            email,
            role: "Super Admin",
            loginTime: new Date().toISOString(),
          })
        );
        window.location.href = "/dashboard";
      } else {
        setError("Invalid email or password");
        setIsLoading(false);
      }
    }, 1500);
  };

  // FORGOT PASSWORD HANDLER
  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email to reset password");
      return;
    }
    setError("");
    alert(`Password reset link sent to ${email} (demo only).`);
    setScreen("login");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-[#004040] rounded-full flex items-center justify-center mb-4">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-white">NatioID Admin</h2>
          <p className="mt-2 text-sm text-gray-400">
            {screen === "login"
              ? "Sign in to access your administrator dashboard"
              : "Enter your email to reset your password"}
          </p>
        </div>

        {/* LOGIN SCREEN */}
        {screen === "login" && (
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md flex items-center">
                  <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
                  <span className="text-sm text-red-400">{error}</span>
                </div>
              )}

              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#004040]"
                    placeholder="admin@natioid.gov.ng"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#004040] pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-[#004040] border-gray-600 bg-gray-700 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setScreen("forgot");
                    }}
                    className="text-sm text-[#ECBE07] hover:text-yellow-300"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-[#004040] hover:bg-[#003030] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004040] ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="bg-yellow-50/10 border border-yellow-500/30 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-400">
                    Demo Credentials
                  </h3>
                  <div className="mt-2 text-sm text-yellow-300">
                    <p>
                      <strong>Email:</strong> admin@natioid.gov.ng
                    </p>
                    <p>
                      <strong>Password:</strong> admin123
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                © 2025 Federal Republic of Country. All rights reserved.
              </p>
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD SCREEN */}
        {screen === "forgot" && (
          <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md flex items-center">
                  <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
                  <span className="text-sm text-red-400">{error}</span>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="reset-email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#004040]"
                    placeholder="Enter your email"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 rounded-md text-sm font-medium text-white bg-[#004040] hover:bg-[#003030] focus:ring-2 focus:ring-offset-2 focus:ring-[#004040]"
                >
                  Send Reset Link
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setScreen("login");
                    }}
                    className="text-sm text-[#ECBE07] hover:text-yellow-300"
                  >
                    ← Back to login
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
