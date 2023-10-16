import React from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "./component/DataContext";

const Info = () => {
  const { data } = useData();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const { productId } = useParams();
  const produ = productId-1;
  
  return (
    <div>
      <div className="col-12 d-flex justify-content-center">
        <h1 className="fs-2 col-8 mt-3 d-flex justify-left ">
          <span
            style={{
              backgroundColor: "black",
              padding: "7px",
              color: "white",
              borderRadius: "10px",
            }}
          >
            E-COMMERCE APP
          </span>
        </h1>
        <button
          className="col-2 mt-3 mb-2 btn btn-primary justify-center"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
      <div className="mt-4">
        <CardGroup
          className="mt-5"
          style={{ width: "80rem", maxHeight: "500px", marginLeft: "180px" }}
        >
          <Card>
            <Card.Img
              variant="top"
              style={{
                width: "20rem",
                maxHeight: "500px",
                marginLeft: "130px",
              }}
              src={data[produ].image}
            />
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Product Title </Card.Title>
              <Card.Text>{data[produ].title}</Card.Text>
              <hr />
              <Card.Title>Description</Card.Title>
              <Card.Text>{data[produ].description}</Card.Text>
              <hr />
              <Card.Title>Price</Card.Title>
              <Card.Text>{data[produ].price}</Card.Text>
              <hr />
              
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    </div>
  );
};

export default Info;

//<Card.Title>Rating</Card.Title>
              //<Card.Text>{data[produ].rating.rate}</Card.Text>
