//d
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

function GroupMember() {
  const navigate = useNavigate();
  const User = [
    {
      userid: 1,
      name: "Rahul",
      mobile: 984562562,
      address: "pune",
    },
    {
      userid: 2,
      name: "sayali",
      mobile: 984562562,
      address: "pune",
    },
    {
      userid: 3,
      name: "priti",
      mobile: 984562562,
      address: "pune",
    },
  ];



   // api integration code

  // const [memberData, setMemberData] = useState([]);
  // useEffect(() => {
  //   fetchData();
  // }, [id]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("your_api_endpoint_here");
  //     setGroupsData(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //   }
  // };
  return (
    <div>
      <div className="container">
        <Row className="m-0 ">
          <Col lg={12} className="text-center">
            <h1 className="pb-2">Group Name</h1>
          </Col>
          <Col className="text-end pe-lg-5">
            <Button
              variant="primary"
              onClick={() => {
                navigate("/agency/createmember");
              }}
            >
              Add Member{" "}
            </Button>
          </Col>
        </Row>
        <div className="py-4">
          <div className="table-responsive">
            <table className="table border shadow">
              <thead>
                <tr className="text-center p-2">
                  <th scope="col">SR.NO</th>
                  <th scope="col">Name</th>
           
                  <th scope="col">Mobile NO</th>
                  <th scope="col">Address</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {User.map((post1, index) => (
                  <tr className="text-center" key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{post1.name}</td>
                    <td>{post1.mobile}</td>
                    <td>{post1.address}</td>
                    <td>
                      {/* <Link
                        className="btn btn-primary mx-2 mb-2 mb-md-0"
                        to={`/viewuser/${post1.id}`}
                      >
                        View
                      </Link> */}
                      <Link
                        className="btn btn-outline-primary mx-2 mb-2 mb-md-0"
                        to={`/editmember/${post1.id}`}
                      >
                        Edit
                      </Link>
                      <Link
                        className="btn btn-outline-primary mx-2 mb-2 mb-md-0"
                        to={`/deletemember/${post1.id}`}
                      >
                        Delete
                      </Link>
                      {/* <button className="btn btn-danger mb-2 mb-md-0">Delete</button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupMember;
