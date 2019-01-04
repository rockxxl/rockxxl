import React from "react";
import styled from "styled-components";
import { py } from "styled-components-spacing";
import breakpoint from "styled-components-breakpoint";
import Layout from "../components/Layout";
import Container from "../components/Container";
import Hero from "../components/Home/Hero";
import Categories from "../components/Home/Categories";

const Intro = styled.div`
    letter-spacing: -.5px;
    ${py(6)}
    ${breakpoint("md")`
        font-size: ${props => props.theme.font.size.xl}rem;
        ${py(12)}
    `}
`;

export default () => (
    <Layout>
        <Container>
            <Hero />
            <Intro>RockXXL is een organisatie die zich bezighoudt als webzine/blog alsook met de rock- en metalwereld in het algemeen (met een knipoog naar België in het bijzonder!). We hebben als organisatie het doel om vooral kleinere, Belgische bands in de kijker te zetten d.m.v. reviews, interviews, live verslagen, shows… Uiteraard blijven we niet alleen bij de kleinere undergroundbands maar krijgen ook de gevestigde waarden de aandacht die ze verdienen.</Intro>
            <Categories />
        </Container>
    </Layout>
);
