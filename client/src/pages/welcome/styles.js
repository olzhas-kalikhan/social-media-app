import styled from 'styled-components';
import logoBg from '../../assets/logo-background.png';

const Wrapper = styled.div`
    display: flex;
    height:100vh;
`;
const Left = styled.div`
    background-image: url(${logoBg});
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 50%;
`;
const Right = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 12%;
    height: 100%;
    width: 50%;
`;
const Item = styled.div`
    text-align: center;
    margin: 8px 0;
    width:100%;
`;


export { Wrapper, Left, Right, Item };