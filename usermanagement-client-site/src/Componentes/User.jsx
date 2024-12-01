import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const User = () => {
    const loadedUser = useLoaderData()
    const [users, setUser] = useState(loadedUser)
    const handleDelete = _id => {
        console.log(_id);
        fetch(`http://localhost:5000/users/${_id}`, {
            method: "DELETE",

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const remaining = users.filter(user => user._id !== _id)
                setUser(remaining)
            })
    }

    return (
        <div>
            <h1>user{users.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {users.map((user, idx) =>
                            <tr className="bg-base-200">
                                <th>{idx + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.status}</td>
                                <td>
                                    <button className='btn' onClick={() => handleDelete(user._id)}>X</button>
                                    <Link to={`/userEdit/${user._id}`} className='btn' >E</Link >
                                </td>
                            </tr>



                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;