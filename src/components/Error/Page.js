import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Layout from "../Layout";
import Container from "../Container";

const Title = styled.h1`
    font-size: 5.063rem;
`;

const Wrapper = styled(Container)`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export default ({ title, description }) => (
    <Layout>
        <Wrapper>
            <Title>{title || "Woeps"}</Title>
            {description ? (<p>{description}</p>) : (<p>Er is iets misgelopen.</p>)}
            <Link to="/">Naar de homepagina.</Link>
        </Wrapper>
    </Layout>
);
