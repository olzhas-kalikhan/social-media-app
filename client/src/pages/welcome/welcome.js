import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Wrapper, Left, Right, Item } from './styles';
import SignUpForm from '../../components/signUpForm/signUpForm';
import Login from '../../components/login/login';
const Welcome = () => {
    const [signUp, showSignUp] = useState(false);
    const [login, showLogin] = useState(false);
    const openSignUpForm = () => {
        showSignUp(true);
    }
    const closeSignUpForm = () => {
        showSignUp(false);
    }
    const openLogin = () => {
        showLogin(true);
    }
    const closeLogin = () => {
        showLogin(false);
    }
    return (
        <Wrapper>
            <Left>

            </Left>
            <Right>
                <Item><h1>Welcome to Twitter</h1></Item>
                <Item><Button type="primary" onClick={openSignUpForm} shape="round" size="large" block>Sign Up</Button></Item>
                <Item><Button shape="round" onClick={openLogin} size="large" block>Login</Button></Item>
            </Right>

            <SignUpForm visible={signUp} onCancel={closeSignUpForm} />
            <Login visible={login} onCancel={closeLogin}/>

        </Wrapper>
    )
}
export default Welcome;