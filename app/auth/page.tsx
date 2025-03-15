"use client"

import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { AppDispatch } from "@/redux/store";
import { login, register} from "@/features/auth/authActions";
import { ToastContainer, toast } from 'react-toastify';


export default function AuthPage() {
    const dispatch= useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

    const handleLogin= async (event: any): Promise<any> => {
        const body={
            email: formData.email,
            password: formData.password
        }
        await dispatch(login(body));
        console.log("Login", formData);
        // throw new Error("Function not implemented.");
    }
    const handleRegister= (event: any): void => {
        const body={
            username: formData.username,
            email: formData.email,
            password: formData.password
            
        }
        dispatch(register(body));
        console.log("Register", formData);
        // throw new Error("Function not implemented.");
    }

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
              <TabsTrigger value="login" className="flex-1 text-center py-2">Login</TabsTrigger>
              <TabsTrigger value="register" className="flex-1 text-center py-2">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <CardContent>
                <Label className="block mb-2">Email</Label>
                <Input name="email" type="email" placeholder="Enter your email" className="mb-3" onChange={handleChange} />
                <Label className="block mb-2">Password</Label>
                <Input name="password" type="password" placeholder="Enter your password" className="mb-4" onChange={handleChange} />
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleLogin}>Login</Button>
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
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleRegister}>Register</Button>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
        <ToastContainer />
      </motion.div>
    </div>
  );
}
