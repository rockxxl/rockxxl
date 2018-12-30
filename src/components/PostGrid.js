import React, { Fragment } from "react";
import { Link as GatsbyLink } from "gatsby";
import styled from "styled-components";
import { p } from "styled-components-spacing";
import Image from "./Image";

const List = styled.ul`
    display: grid;
    padding: 0;
    list-style: none;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    grid-gap: 1.5rem;
`;

const Link = styled(GatsbyLink)`
    display: block;
    color: ${props => props.theme.color.text};
    font-weight: ${props => props.theme.font.weight.bold};
    letter-spacing: -.66px;
    line-height: ${props => props.theme.leading.none};
    text-decoration: none;
    position: relative;

    &:after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        z-index: 9;
        display: block;
        content: "";
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
    }
`;

const Content = styled.div`
    color: ${props => props.theme.color.body};
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    ${p(6)};
`;

const Title = ({ title }) => (
    <Fragment>
        <div>{title.split(" - ")[0]}</div>
        { title.split(" - ")[1] && (
            <div>{title.split(" - ")[1]}</div>
        )}
    </Fragment>
);

const aspectRatio = (category) => {
    switch (category.toLowerCase()) {
    case "interviews":
        return "4:3";
    case "live reviews":
        return "210:297";
    default:
        return "1:1";
    }
};

const Post = ({
    node: {
        fields: { slug },
        frontmatter: {
            title,
            image,
            category,
        },
    },
}) => (
    category && (
        <li>
            <Link to={slug}>
                { image && (
                    <Image
                        publicId={image}
                        aspectRatio={aspectRatio(category)}
                        alt={title}
                    />
                )}
                <Content>
                    <Title title={title} />
                </Content>
            </Link>
        </li>
    )
);

export default ({ posts }) => posts && (
    <List>{posts.map(post => <Post key={post.node.fields.slug} {...post} />)}</List>
);
