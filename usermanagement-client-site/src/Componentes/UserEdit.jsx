import React from 'react';
import { useLoaderData } from 'react-router-dom';

const UserEdit = () => {
    const user = useLoaderData()
    const { name, email, gender, status, _id } = user

    const handleUpdate = e => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const gender = form.gender.value
        const status = form.status.value
        const Updateuser = { name, email, gender, status }
        console.log(Updateuser);
        fetch(`http://localhost:5000/users/${_id}` ,{
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(Updateuser)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center text-teal-600">User Management System</h1>
                <h2 className="text-xl font-semibold mt-4 text-gray-700 text-center">Update User</h2>
                <p className="text-sm text-gray-500 text-center mb-6">Use the form below to create a new account</p>
                <form onSubmit={handleUpdate} >
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={name}
                            className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            defaultValue={email}
                            className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium">Gender</label>
                        <div className="flex gap-4 mt-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value='Male'
                                    className="mr-2"
                                    defaultChecked={gender === 'Male' ? true : false}
                                />
                                Male
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value='Female'
                                    className="mr-2"
                                    defaultChecked={gender === 'Female' ? true : false}
                                />
                                Female
                            </label>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 text-sm font-medium">Status</label>
                        <div className="flex gap-4 mt-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="status"
                                    value='Active'
                                    className="mr-2"
                                    defaultChecked={status === 'Active' ? true : false}
                                />
                                Active
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="status"
                                    value='Inactive'

                                    className="mr-2"
                                    defaultChecked={status === 'Inactive' ? true : false}
                                />
                                Inactive
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg text-sm font-medium"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserEdit;