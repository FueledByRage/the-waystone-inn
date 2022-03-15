import styled from "styled-components";

export const PostBox = styled.div`
    grid-template-columns: 1fr 25fr;
    display: grid;
    grid-template-areas: " l t t"
                        "l b b"
                        "l f f";
    width: 40vw;
    min-width: 400px;
    height: auto;
    background-color: whitesmoke;
    grid-area: m;
    margin-top: 10vh;
    margin-left: 15vw;
    padding: 10px;
    border-radius: 8px;

    h1{
        color: #262627;
    }

    :hover{
        border: 1px solid;
    }
`;

export const PostTitle = styled.div`
    display: flex;
    justify-content: space-between;
    grid-area: t;

`;

export const PostBody = styled.div`
    padding: 5px;
    white-space: pre-wrap;
    grid-area: b;
    img{
        max-height: 500px;
        width: 100%;
    }
`;
export const PostFooter = styled.div`
    grid-area: f;
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
`;

export const LikeBox = styled.div`
    display: flex;
    grid-area: l;
    flex-direction: column;
    justify-content: space-between;
    padding: 2px;
    margin-right: 10px;
    span{
        margin-left: 5px;
        font-weight: bold;
    }
    button{
        border: none;
        width: 20px;
        height: 20px;
    }
`;