import React, { useEffect, useState } from "react";
import Card from "./component/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useData } from "./component/DataContext";

const Home = () => {
  const [itemIds, setItemIds] = useState([]);
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [newProduct, setNewProduct] = useState({
    image: null,
    title: "",
    description: "",
    price: 0,
  });
  const { setData } = useData();

  // For Modal
  const handleClose = () => {
    setShow(false); // Close the modal
  };

  const handleAddProduct = () => {
    const maxId = Math.max(...itemIds);
    const newId = maxId + 1;
    setItemIds((itemIds) => [ ...itemIds,newId]);
   
    // Create a new product object from the state
    const productToAdd = {
      id:newId,
      image: newProduct.image ? URL.createObjectURL(newProduct.image) : null,
      title: newProduct.title,
      description: newProduct.description,
      price: newProduct.price,
    };
   
    // You can perform validation on the new product here if needed
       setData((data) => [ ...data,productToAdd]) ;
       
    
    setItems((items) => [ productToAdd,...items]);

    // Reset the newProduct state for the next entry
    setNewProduct({
      image: null,
      title: "",
      description: "",
      price: 0,
    });

    // Close the modal
    setShow(false);
  };

  // Handle changes in the form inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };
  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setNewProduct({
      ...newProduct,
      image: file,
    });
  };
  const handleShow = () => setShow(true);
  // Modal end

  

  useEffect(() => {
    const loadData = async () => {
      try {
        let data = await fetch("https://fakestoreapi.com/products");
        data = await data.json();
        const ids = data.map((item) => item.id);
        setItemIds(ids);
        setItems(data);
        setData(data);
        // localStorage.setItem("myData", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    loadData();
  }, []);

  // useEffect(() => {
  //   // Load data from local storage
  //   const savedData = localStorage.getItem("myData");
  //   const getData = JSON.parse(savedData);
    
  // }, []);

  //   For sorting data by price
  const sortItems = (order) => {
    const sortedItems = [...items];
    if (order === "lowToHigh") {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (order === "highToLow") {
      sortedItems.sort((a, b) => b.price - a.price);
    }
    setItems(sortedItems);
  };
  //   Sorting data end

  const handleDelete = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  return (
    <div>
      <div>
        <div className="col-12 d-flex justify-content-center">
          <h1 className="fs-2 col-6 mt-3 mb-2 d-flex justify-left ">
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
          <div className="mb-2 mt-3">
            {[DropdownButton].map((DropdownType, idx) => (
              <DropdownType
                as={ButtonGroup}
                key={idx}
                id={`dropdown-button-drop-${idx}`}
                size="lg"
                title="Sort By Price"
              >
                <Dropdown.Item
                  eventKey="1"
                  onClick={() => sortItems("lowToHigh")}
                >
                  Low to High
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => sortItems("highToLow")}
                >
                  Hight to Low
                </Dropdown.Item>
              </DropdownType>
            ))}
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            className="col-2 mt-3 mb-2 btn btn-primary justify-center"
            variant="primary"
            onClick={handleShow}
          >
            Add Product
          </Button>
        </div>
      </div>
      <hr />
      <div className="row">
        {items.map((item) => {
          return (
            <div key={item.id} className="col-12 col-md-6 col-lg-3 ">
              <Card itemData={item} onDelete={() => handleDelete(item.id)} />
            </div>
          );
        })}
      </div>

      {/* Modal start */}
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Title"
                value={newProduct.title}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Description"
                value={newProduct.description}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Price"
                value={newProduct.price}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal End */}
    </div>
  );
};

export default Home;
