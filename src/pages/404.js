import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import Container from "../components/Container";

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

export default () => (
    <Layout>
        <Wrapper>
            <Title>404</Title>
            <p>Deze pagina kan niet worden gevonden</p>
            <Link to="/">Naar de homepagina.</Link>
        </Wrapper>
    </Layout>
);
