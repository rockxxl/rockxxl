import styled from "styled-components";

export default styled.div`
    text-transform: uppercase;
    font-weight: 400;
    font-family: ${props => props.theme.font.family.headings};
    letter-spacing: 2px;
    font-size: .62rem;
    color: ${props => props.theme.color.gray[5]};
`;
