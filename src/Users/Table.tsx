import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsTrash3Fill, BsPlusCircleFill, BsCheckCircleFill, BsPencil, BsArrowRight } from "react-icons/bs";
import * as client from "./client";
import { User } from "./client";
export default function UserTable() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({
    _id: "", username: "", password: "", firstName: "",
    lastName: "", role: "USER" });
  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (user: User) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };

  const selectUser = async (user: User) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) =>
        (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };


  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  const [role, setRole] = useState("USER");
  const fetchUsersByRole = async (role: string) => {
    const users = await client.findUsersByRole(role);
    setRole(role);
    setUsers(users);
  };

  useEffect(() => { fetchUsers(); }, []);
  return (
    <div className="m-4"> 
    <br/>
    <br/>


    <select onChange={(e) => fetchUsersByRole(e.target.value)}
        value={role || "USER"}
        className="form-select w-25 float-end">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <label className="float-end m-2">Fetch user by role: </label>

      <h1>User Table</h1>
      <table className="table m-4">
        <thead>
          <tr>
            <td>
              <input className="form-control" value={user.password} placeholder="password" onChange={(e) =>
                setUser({ ...user, password: e.target.value })}/>
              <input className="form-control"   value={user.username} placeholder="username" onChange={(e) =>
                setUser({ ...user, username: e.target.value })}/>
            </td>
            <td>
              <input className="form-control"  value={user.firstName} placeholder="firstname" onChange={(e) =>
                setUser({ ...user, firstName: e.target.value })}/>
            </td>
            <td>
              <input className="form-control"  value={user.lastName} placeholder="lastname" onChange={(e) =>
                setUser({ ...user, lastName: e.target.value })}/>
            </td>
            <td>
              <select className="form-select"  value={user.role} onChange={(e) =>
                setUser({ ...user, role: e.target.value })}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>
            </td>
            <td>
            <button className="btn btn-success me-2"  onClick={updateUser}> <BsCheckCircleFill/></button>
              <button className="btn btn-success"  onClick={createUser}> <BsPlusCircleFill/></button>
            </td>
          </tr>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>&nbsp;</th>

          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role}</td>
              <td>
              <button className="btn btn-warning me-2">
                <BsPencil onClick={() => selectUser(user)} />
              </button>
              <button className="btn btn-danger" onClick={() => deleteUser(user)}>
                <BsTrash3Fill /> 
              </button>
              <BsArrowRight onClick={() =>navigate(`/Kanbas/Account/${user._id}`)} className="text-success fs-1 text" />


              </td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}
