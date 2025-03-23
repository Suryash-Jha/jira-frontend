import { Layout } from '@/components/layout';
import { Inter } from 'next/font/google';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';

const CreateOrganization = () => {
  const [orgName, setOrgName] = useState('');
  const [orgDescription, setOrgDescription] = useState<any>('');
  const [orgImage, setOrgImage] = useState<any>(null);

  const handleImageChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      setOrgImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (!orgName) {
      toast.error("Organization name is required!");
      return;
    }
    toast.success("Organization created successfully!");
    setOrgName('');
    setOrgDescription('');
    setOrgImage(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black p-6">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Create Organization</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 font-semibold">Organization Name</label>
            <input 
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg focus:ring focus:ring-blue-500 outline-none text-white"
              placeholder="Enter organization name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 font-semibold">Organization Description</label>
            <textarea
              value={orgDescription}
              onChange={(e) => setOrgDescription(e.target.value)}
              className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg focus:ring focus:ring-blue-500 outline-none text-white"
              placeholder="Enter a brief description"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-semibold">Upload Picture</label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-300 border border-gray-600 rounded-lg cursor-pointer bg-gray-700 focus:outline-none"
              />
              {orgImage && <img src={orgImage} alt="Organization" className="w-20 h-20 object-cover rounded-lg shadow" />}
            </div>
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition-all">
            Create Organization
          </Button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
    </div>
  );
};

export default CreateOrganization;
