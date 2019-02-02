import styled from "styled-components";
import { px, py } from "styled-components-spacing";

export default styled.input`
    border: ${({ theme: { input: { border: { width, style, color } } } }) => `${width} ${style} ${color}`};
    appearance: none;
    display: block;
    width: 100%;
    font-size: 1rem;
    background-color: ${({ theme }) => theme.color.white};
    ${px(4)}
    ${py(3)}

    &:focus {
        outline: 0;
        border-color: ${({ theme }) => theme.input.focus.border.color};
    }
`;
