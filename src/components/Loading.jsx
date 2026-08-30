import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  100% { background-position: left; }
`;

// Uses `currentColor` so the loader is legible in both light and dark themes
// (the page sets a theme-appropriate text colour on <body>).
const LoaderWrapper = styled.div`
  width: fit-content;
  margin: 4rem auto;
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  color: currentColor;
  background: radial-gradient(circle closest-side, currentColor 94%, transparent)
    right / calc(200% - 1em) 100%;
  animation: ${loadingAnimation} 1s infinite alternate linear;

  &::before {
    content: "Loading...";
    line-height: 1em;
    color: transparent;
    background: inherit;
    background-image: radial-gradient(
      circle closest-side,
      currentColor 94%,
      transparent
    );
    -webkit-background-clip: text;
    background-clip: text;
  }
`;

export default function Loading() {
  return <LoaderWrapper role="status" aria-label="Loading countries" />;
}
