import React from 'react';
import { Modal, Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const validatePassword = (rule, value, callback) => {
    const errors = [];
    if (value) {
        if (!value.match(/^(?=.*[a-z])/))
            errors.push("Password must include at least 1 lowercase character");
        if (!value.match(/^(?=.*[A-Z])/))
            errors.push("Password must include at least 1 uppercase character");
        if (!value.match(/^(?=.*[0-9])/))
            errors.push("Password must include at least 1 digit");
        if (!value.match(/^(?=.*[!@#$%^&*])/))
            errors.push("Password must include at least 1 specail symbol: \"!@#$%^&*\"");
    }
    if (errors)
        callback(errors);
    callback();
}
const SignUpForm = (props) => {
    const [form] = Form.useForm();
    const { visible, onCancel } = props;
    const onFinish = async (values) => {
        try {
            console.log('Success:', values);
            let response = await axios.post('/user/signup', values);
            console.log(response);
        }
        catch (e) {
            console.log(e)
        }
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const closeModal = () => {
        form.resetFields();
        onCancel();
    }
    return (
        <Modal
            title="Sign Up"
            visible={visible}
            onCancel={closeModal}
            width="50%"
            footer={null}
            keyboard
            centered

        >
            <Form
                {...layout}
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                size="large"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email' }
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        { min: 8 },
                        { validator: validatePassword }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </Modal >
    );
};
export default SignUpForm;