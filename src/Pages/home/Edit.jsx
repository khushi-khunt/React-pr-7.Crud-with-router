
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Edit = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("")

  let data = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  const [record, setRecord] = useState(data);
  const navigate = useNavigate()
  const location = useLocation();
  useEffect(() => {
    setName(location.state.name)
    setEmail(location.state.email);
    setPassword(location.state.password);
    setStatus(location.state.status)



  }, [location.state])



  const handlesubmit = (e) => {
    e.preventDefault();

    let up = record.map((val) => {
      if (val.id === location.state.id) {
        val.name = name,
          val.email = email,
          val.password = password

      }
      return val;
    })

    localStorage.setItem("users", JSON.stringify(up));
    alert("Record update");

    setTimeout(() => {
      navigate('/');
    }, 2000)
  };

  return (
    <>
      <Header />
      <div className="container mt-5 shadow p-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="d-flex justify-content-end">
              <Link to={`/`}>
                <button className="btn btn-success btn-sm mb-2">View</button>
              </Link>
            </div>

            <form onSubmit={handlesubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="form-control"
                  placeholder="Enter your Name"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="form-control"
                  placeholder="Enter your Email"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="form-control"
                  placeholder="Enter your Password"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>

              <div className="mb-3">
                <select onChange={(e) => setStatus(e.target.value)} value={status}>
                  <option>-- Select Status --</option>
                  <option value="Active">Active</option>
                  <option value="Deactive">Deactive</option>

                </select>

              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;