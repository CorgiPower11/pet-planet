import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

//import { createUser } from '../utils/API';
import Auth from "../utils/auth";
//TODO: set up ADD_USER reference from mutation.js file
import { ADD_USER, CREATE_PET, CREATE_STAT } from "../utils/mutations";
//TODO: set up useMutation
import { useMutation } from "@apollo/client";

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
    petName: "",
    petType: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  //TODO: set addUser mutation
  const [addUser] = useMutation(ADD_USER);
  // const [addPet] = useMutation(CREATE_PET);
  const [addStat] = useMutation(CREATE_STAT);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log(userFormData);
    //TODO:
    try {
      //const response = await createUser(userFormData);
      //set up useMutation hook
      const { data } = await addUser({ variables: { ...userFormData } });
      // console.log(data);
      console.log(userFormData);
      // create users pet from 
      // Uncomment line below once image selection is in the signup form
      //const { userPet } = await addPet({ variables: { ...userFormData } });
      // console.log(userPet);
      // Create the users statblock from the form data
      const { userStats } = await addStat({ variables: { ...userFormData } });
      console.log(userStats);


      if (!data) {
        throw new Error("something went wrong!");
      }

      //pass in token recevied from mutation response
      // Backend returns as a createUser object
      Auth.login(data.createUser.token);
      //part of mutation use
      window.location.reload();
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
      petName: "",
      petType: "",
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="petName">Pet Name</Form.Label>
          <Form.Control
            type="petName"
            placeholder="Name your pet name"
            name="petName"
            onChange={handleInputChange}
            value={userFormData.petName}
            required
          />
          <Form.Control.Feedback type="invalid">
            Pet name is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="petType">Pet Type</Form.Label>
          <Form.Control
            type="petType"
            placeholder="Your pet type"
            name="petType"
            onChange={handleInputChange}
            value={userFormData.petType}
            required
          />
          <Form.Control.Feedback type="invalid">
            Pet type is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
