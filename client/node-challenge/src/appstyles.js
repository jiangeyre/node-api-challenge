import background from './img/ghkrcp.jpg';
import styled from 'styled-components';

export const BigBoy = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url(${background});
    height: 100%;
    background-size: 100%;
    background-repeat: repeat;
    z-index: -10;
`;

export const BUTT = styled.button`
    background-color: black;
    color: white;
`;