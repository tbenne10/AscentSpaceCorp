import { createGlobalStyle } from 'styled-components';
import { fontFaces } from './fontFaces';

export const GlobalStyles = createGlobalStyle`
    ${fontFaces}
`;