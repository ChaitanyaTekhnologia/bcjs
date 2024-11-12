import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams, useHistory, useNavigate } from "react-router-dom";
import { deletescheme } from "../store/apiService";

function DeleteScheme() {
  const { schemeId } = useParams();
  const navigate = useNavigate();
  const [deleteStatus, setDeleteStatus] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deletescheme({ sch_id: id });
      setDeleteStatus(true);
    } catch (error) {
      console.error("Error deleting scheme: ", error);
      setDeleteStatus(false);
    }
  };

  const handleBack = () => {
    navigate("/agency");
  };

  return (
    <div>
      <Container>
        <div>Are you sure you want to delete the scheme?</div>
        {deleteStatus === true && <div>Scheme deleted successfully</div>}
        {deleteStatus === false && <div>Error deleting scheme</div>}
        <Button
          className="mx-2 mb-2 mb-md-0"
          onClick={() => handleDelete(schemeId)}
        >
          Delete
        </Button>
        <Button className="mx-2 mb-2 mb-md-0" onClick={handleBack}>
          Back
        </Button>
      </Container>
    </div>
  );
}

export default DeleteScheme;
