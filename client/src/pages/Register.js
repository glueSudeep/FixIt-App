import React from 'react'
import "../styles/Register.css"
import { Form, Input } from "antd";
import { Link } from "react-router-dom";

const Register = () => {


    const onfinishHandler = async (values) => {
        console.log(values)
    }

  return (
    <>
        <div className="form-container ">
            <Form
                layout="vertical"
                onFinish={onfinishHandler}
                className="register-form"
            >
            <h3 className="text-center">Register</h3>
            <Form.Item label="Name" name="name">
                <Input type="text" required />
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input type="email" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type="password" required />
            </Form.Item>
            <Link to="/login" className="m-2">
                Have an account? Login Here.
            </Link>
            <button className="btn btn-primary" type="submit">
                Register
            </button>
            </Form>
        </div>
    </>
  )
}

export default Register