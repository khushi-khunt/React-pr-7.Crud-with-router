import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";

const View = () => {
  const navigate = useNavigate();
  let data = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : []
  const [record, setRecord] = useState(data)
  const [mdelete, setMdelete] = useState([]);
  const [status, setStatus] = useState("")
  const [filRecord, setFilRecord] = useState([])

  const deleteUser = (id) => {
    let d = record.filter((val) => val.id != id);
    localStorage.setItem('users', JSON.stringify(d));
    setFilRecord(d)
    alert("record delete")
  }

  const handlechangedelete = (id, checked) => {
    let all = [...mdelete];
    if (checked) {
      all.push(id)
    } else {
      all = all.filter(val => val != id)
    }
    setMdelete(all)
  }
  const multipleDelete = () => {
    if (mdelete.length > 0) {
      let md = record.filter(val => !mdelete.includes(val.id));
      localStorage.setItem("users", JSON.stringify(md));
      setFilRecord(md)
    } else {
      alert("Select at least one user")
      return false

    }
    setMdelete("")
  }

  useEffect(() => {
    let fil = [...record]
    if (status) {
      fil = fil.filter(val => val.status === status)
    }
    setFilRecord(fil)
  }, [status])
  return (
    <>
      <Header />
      <div className="container mt-5 shadow p-5">

        <div className="row">
          <div className="col-lg-4 mb-5">
            <select className="form-control"
              onChange={(e) => setStatus(e.target.value)}
              value={status}>
              <option>Select Status</option>
              <option value="Active"> Active</option>
              <option value="Deactive"> Deactive</option>
            </select>
          </div>
        </div>





        <div className="row">
          <div className="col-lg-8 mx-auto">

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Action</th>
                  <th scope="col">Status</th>

                  <th scope="col">
                    <button onClick={() => multipleDelete()}
                      style={{ fontWeight: "900", background: "transparent", border: "none", fontSize: "12px" }}
                    >Multiple-Delete</button>
                  </th>
                  <th scope="col">
                    <Link to={`/add`}>
                      <button className="btn btn-success btn-sm">Add</button>
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filRecord.map((val) => {
                  return (
                    <>
                      <tr>
                        <td>{val.id}</td>
                        <td>{val.name}</td>
                        <td>{val.email}</td>
                        <td>{val.password}</td>

                        <td>
                          <button
                            onClick={() => deleteUser(val.id)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                          &nbsp;
                          <button
                            onClick={() => navigate(`/edit`, { state: val })}
                            className="btn btn-primary btn-sm"
                          >
                            Edit
                          </button>
                        </td>

                        <td>
                          {
                            val.status == "Active" ? (
                              <button style={{ color: "green", border: 0, background: "none", fontWeight: 700 }}>{val.status}</button>
                            ) : (
                              <button style={{ color: "red", border: 0, background: "none", fontWeight: 700 }}>{val.status}</button>
                            )
                          }
                        </td>

                        <td>
                          <input type="checkbox" onChange={(e) => handlechangedelete(val.id, e.target.checked)} style={{ width: "100%" }} />
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;