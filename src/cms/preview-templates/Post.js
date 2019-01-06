import React from "react";
import Layout from "../../components/Layout/Preview";
import Detail from "../../components/Post/Detail";

export default ({ entry, widgetFor }) => {
    const post = {
        fields: { slug: null },
        frontmatter: {
            title: entry.getIn(["data", "title"]),
            thumbnail: entry.getIn(["data", "thumbnail"]),
            category: entry.getIn(["data", "category"]),
            date: entry.getIn(["data", "date"]),
            author: entry.getIn(["data", "author"]),
        },
        html: widgetFor("body"),
    };
    return (
        <Layout>
            <Detail post={post} preview />
        </Layout>
    );
};
