import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook, faInstagram, faSpotify,
} from "@fortawesome/free-brands-svg-icons";

const SocialMedia = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > a {
        display: block;
        padding: .75rem;
        color: #ffffff;
    }
`;

const socialmedia = [
    { name: "Facebook", icon: faFacebook, route: "https://www.facebook.com/rockxxlbe/" },
    { name: "RockXXL", icon: faInstagram, route: "https://www.instagram.com/rockxxl/" },
    { name: "Spotify", icon: faSpotify, route: "https://open.spotify.com/user/rockxxl" },
];

export default () => (
    <SocialMedia>
        {
            socialmedia.map(({ name, icon, route }) => (
                <a key={name} href={route} target="_blank" rel="noopener noreferrer" title={name}>
                    <FontAwesomeIcon icon={icon} size="lg" />
                </a>
            ))
        }
    </SocialMedia>
);
