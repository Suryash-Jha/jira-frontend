"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { AppDispatch } from "@/redux/store";
import { login, register } from "@/features/auth/authActions";
import { ToastContainer, toast } from "react-toastify";

export default function AuthPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [showSplash, setShowSplash] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event: any): Promise<any> => {
    setIsLoggingIn(true);
    const body = {
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await dispatch(login(body)).unwrap();
      console.log("response, --->", response)

      if (response?.status === 201) {
        setShowSplash(true);

        setTimeout(() => {
          router.push("/");
        }, 5000); // 3 seconds splash
      } else {
        toast.error("Login failed!");
      }
    } catch (err: any) {
      toast.error("Login error: " + err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRegister = async (event: any): Promise<void> => {
    const body = {
      fullName: formData.username,
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await dispatch(register(body)).unwrap();
      toast.success("Registered successfully. You can now log in.");
    } catch (err: any) {
      toast.error("Registration error: " + err.message);
    }
  };

  // --- Splash Screen ---
  if (showSplash) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          {/* <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-20 h-20 mb-6 bg-blue-500 rounded-full shadow-lg flex items-center justify-center"
          >
            <span className="text-2xl font-bold">🚀</span>
          </motion.div> */}
          <motion.div
            animate={{
              y: [0, -20, 0], // bounce up and down
            }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "easeInOut",
            }}
            className="text-5xl mb-6"
          >
            🚀
          </motion.div>
          <motion.h2
            initial={{ y: 10 }}
            animate={{ y: [10, -10, 10] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-xl font-semibold mb-4"
          >
            Welcome back to Jira...
          </motion.h2>
          <motion.div
            className="flex gap-2 mt-4"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.2,
                  repeat: Infinity
                }
              }
            }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-white"
                variants={{
                  animate: {
                    y: [0, -10, 0],
                    transition: {
                      duration: 0.6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // --- Main Auth Form ---
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-96 bg-gray-800 shadow-xl p-6 rounded-2xl">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="flex justify-between bg-gray-700 p-1 rounded-lg">
              <TabsTrigger value="login" className="flex-1 text-center py-2">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="flex-1 text-center py-2">
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardContent>
                <Label className="block mb-2">Email</Label>
                <Input name="email" type="email" placeholder="Enter your email" className="mb-3" onChange={handleChange} />
                <Label className="block mb-2">Password</Label>
                <Input name="password" type="password" placeholder="Enter your password" className="mb-4" onChange={handleChange} />
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleLogin} disabled={isLoggingIn}>
                  {isLoggingIn ? "Logging in..." : "Login"}
                </Button>
              </CardContent>
            </TabsContent>

            <TabsContent value="register">
              <CardContent>
                <Label className="block mb-2">Username</Label>
                <Input name="username" type="text" placeholder="Enter your username" className="mb-3" onChange={handleChange} />
                <Label className="block mb-2">Email</Label>
                <Input name="email" type="email" placeholder="Enter your email" className="mb-3" onChange={handleChange} />
                <Label className="block mb-2">Password</Label>
                <Input name="password" type="password" placeholder="Enter your password" className="mb-4" onChange={handleChange} />
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleRegister}>
                  Register
                </Button>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
        <ToastContainer />
      </motion.div>
    </div>
  );
}
