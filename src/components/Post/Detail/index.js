/* eslint-disable react/no-danger */
import React, { Fragment } from "react";
import RehypeReact from "rehype-react";
import striptags from "striptags";
import { format } from "date-fns";
import nlDateFnsLocale from "date-fns/locale/nl";
import SEO from "../../SEO";
import Subtitle from "../Subtitle";
import Image from "../../Image";
import OgImage from "./OgImage";
import {
    H1,
    Grid,
    Sidebar,
    Sticky,
    Scroll,
    Content,
    Header,
    Section,
    Media,
} from "./Styles";

const renderAst = new RehypeReact({
    createElement: React.createElement,
    components: {
        img: Image,
    },
}).Compiler;

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
        htmlAst,
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
                author={author}
                image={thumbnail && OgImage(thumbnail)}
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
                    <Fragment>{preview ? { html } : renderAst(htmlAst)}</Fragment>
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
