import React from "react";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/info/${props.itemData.id}`);
    //console.log(props.itemData.id);
  };
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling to the parent container

    props.onDelete(props.itemData.id);
  };

  return (
    <>
      <div
        className="card col-3 mt-3 m-5 "
        style={{ width: "18rem", maxHeight: "700px", cursor: "pointer" }}
        onClick={handleViewDetails}
      >
        <img
          src={props.itemData.image}
          className="card-img-top"
          alt="..."
          style={{ height: "200px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={props.itemData.title}>{props.itemData.title}</h5>
          <hr />
          <div className="container w-100 ">
            <div className=" d-inline ms-2 h-100 w-20 fs-5 justify-center">
              Price:  <span className="small">₹{props.itemData.price}/-</span>
            </div>
            &nbsp;&nbsp;&nbsp;
            <button
              className="btn btn-danger justify-center ms-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
