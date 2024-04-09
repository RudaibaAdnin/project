import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UserProfile() {

  const { id } = useParams();
  const [profile, setProfile] = useState({ _id: "", id:"", username: "", password: "", 
    firstName: "", lastName: "", dob: "", email: "", role: "USER" });
  const navigate = useNavigate();
  const fetchProfile = async () => {
   // const account = await client.profile();
   const account = await client.findUserById(id);
    setProfile(account);
  };

  
  const save = async () => {
    await client.updateUser(profile);
  };

  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);


  return (
    <div className="col-md-5 m-4">
      <h4 className="m-4">Profile</h4>
      <Link to="/Kanbas/Account/Admin/Users"
        className="btn btn-warning w-15 m-4">
        User
      </Link>
      <button className="btn btn-danger float-end m-2"  onClick={signout}>
            Signout
      </button>
      {profile && (
        <div  className="m-4" >
          <input className="form-control m-2" value={profile.username} onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })}/>
          <input className="form-control m-2" value={profile.password} onChange={(e) =>
            setProfile({ ...profile, password: e.target.value })}/>
          <input className="form-control m-2" value={profile.firstName} onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })}/>
          <input className="form-control m-2" value={profile.lastName} onChange={(e) =>
            setProfile({ ...profile, lastName: e.target.value })}/>
          <input className="form-control m-2" value={profile.dob} type="date" onChange={(e) =>
            setProfile({ ...profile, dob: e.target.value })}/>
          <input className="form-control m-2"  value={profile.email} onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })}/>
          <select className="form-select m-2" value={profile.role} onChange={(e) =>
              setProfile({ ...profile, role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>


          <button className="btn btn-success float-end m-2" onClick={save}>
            Save
          </button>

          <br/> <br/> <br/>

        </div>
      )}
    </div>
  );
}
