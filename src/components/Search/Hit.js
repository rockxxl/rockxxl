import React, { Fragment } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
    pt, mr, mt, mb,
} from "styled-components-spacing";
import { Link } from "gatsby";
import { format } from "date-fns";
import nlDateFnsLocale from "date-fns/locale/nl";
import Image from "../Image";
import Subtitle from "../Post/Subtitle";

const Styles = createGlobalStyle`

    .ais-Hits-list {
        list-style: none;
        padding: 0;
    }

    .ais-Hits-item {
        ${pt(3)}

        &:not(:first-child) {
            ${mt(3)}
            border-top: 1px solid ${({ theme }) => theme.color.gray[3]};
        }
    }
`;

const Title = styled.div`
    ${mb(2)}
`;

const Hit = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    letter-spacing: 0;
    font-family: ${props => props.theme.font.family.headings};
    font-size: ${({ theme }) => theme.font.size.lg}rem;
    font-weight: ${props => props.theme.font.weight.headings};
    line-height: ${props => props.theme.leading.none};
    color: ${props => props.theme.color.text};

    &:not(&:first-child) {
        ${pt(3)}
        ${mt(3)}
        border-top: 1px solid ${({ theme }) => theme.color.gray[3]};
    }
`;

const Thumbnail = styled.div`
    width: 4.5rem;
    ${mr(6)}
`;

export default ({
    hit: {
        title, slug, thumbnail, date, author, category,
    },
}) => (
    <Fragment>
        <Styles />
        <Hit to={slug}>
            <Thumbnail>
                <Image
                    src={thumbnail}
                    aspectRatio="1: 1"
                    alt={title}
                />
            </Thumbnail>
            <div>
                <Title>{title}</Title>
                <Subtitle>
                    {`${format(date, "D MMM YYYY", { locale: nlDateFnsLocale })} – ${author} – ${category}`}
                </Subtitle>
            </div>
        </Hit>
    </Fragment>
);
