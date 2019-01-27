/* eslint-disable react/no-danger */
import React, { Fragment } from "react";
import striptags from "striptags";
import { format } from "date-fns";
import { p, mb, mr } from "styled-components-spacing";
import breakpoint from "styled-components-breakpoint";
import cloudinary from "cloudinary-core";
import nlDateFnsLocale from "date-fns/locale/nl";
import styled from "styled-components";
import Image from "../Image";
import SEO from "../SEO";

const Grid = styled.div`
    flex-grow: 1;
    max-width: 1440px;
    width: 100%;
    ${breakpoint("md")`
        display: grid;
        grid-template-columns: 1fr 320px;
    `}
`;

const Sidebar = styled.aside`
    ${breakpoint("md")`
        width: 320px;
        border-left: 1px solid ${props => props.theme.color.gray[3]};
    `}
`;

const Sticky = styled.div`
    position: sticky;
    top: 0;
`;

const Scroll = styled.div`
    overflow-y: scroll;
`;

const Content = styled.article`
    display: flex;
    flex-direction: column;
    ${p(6)};
    ${breakpoint("md")`
        align-items: center;
    `}
`;

const Header = styled.header`
    width: 100%;
    max-width: 960px;
    ${mb(6)};
`;

const Section = styled.section`
    width: 100%;
    line-height: ${props => props.theme.leading.loose};
    ${breakpoint("md")`
        max-width: 640px;
    `}
`;

const Media = styled.div`
    ${mb(3)};
    ${breakpoint("sm")`
        max-width: 320px;
        width: 50%;
        float: left;
        ${mr(6)};
    `}

    ${breakpoint("lg")`
        margin-left: -25%;
    `}
`;

const aspectRatio = (category) => {
    switch (category.toLowerCase()) {
    case "interviews":
        return "4:3";
    case "live reviews":
        return "210:297";
    default:
        return null;
    }
};

const H1 = styled.h1`
    ${mb(5)};
`;

const Title = ({ title }) => {
    if (!title) return null;
    return (
        <H1>
            <div>{title.split(" - ")[0]}</div>
            { title.split(" - ")[1] && (
                <div>{title.split(" - ")[1]}</div>
            )}
        </H1>
    );
};

const Subtitle = styled.div`
    text-transform: uppercase;
    font-weight: 400;
    font-family: ${props => props.theme.font.family.headings};
    letter-spacing: 2px;
    font-size: .62rem;
    color: ${props => props.theme.color.gray[5]};
`;

const OgImage = (image) => {
    const cldnry = new cloudinary.Cloudinary({ cloud_name: process.env.GATSBY_CLOUDINARY_CLOUD_NAME });
    return cldnry.url(image, { transformation: "og_image" });
};

export default ({
    post: {
        fields: {
            slug,
        },
        frontmatter: {
            title,
            thumbnail,
            category,
            date,
            author,
        },
        html,
    },
    sidebar,
    preview = false,
}) => (
    <Fragment>
        {!preview && (
            <SEO
                title={title}
                description={striptags(html).substring(0, 300)}
                slug={slug}
                date={date}
                category={category}
                image={OgImage(thumbnail)}
                pageType="post"
            />
        )}
        <Grid>
            <Content>
                <Header>
                    <Title title={title} />
                    <Subtitle>
                        {`${format(date, "D MMM YYYY", { locale: nlDateFnsLocale })} – ${author} – ${category}`}
                    </Subtitle>
                </Header>
                <Section>
                    { thumbnail && (
                        <Media>
                            <Image
                                src={thumbnail}
                                aspectRatio={aspectRatio(category)}
                                alt={title}
                            />
                        </Media>
                    )}
                    {preview ? <Fragment>{ html }</Fragment> : <div dangerouslySetInnerHTML={{ __html: html }} />}
                </Section>
            </Content>
            {sidebar && (
                <Sidebar>
                    <Sticky>
                        <Scroll>
                            {sidebar}
                        </Scroll>
                    </Sticky>
                </Sidebar>
            )}
        </Grid>
    </Fragment>
);
