import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  100% { background-position: left; }
`;

const LoaderWrapper = styled.div`
  width: fit-content;
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  background: radial-gradient(circle closest-side, #000 94%, transparent)
    right / calc(200% - 1em) 100%;
  animation: ${loadingAnimation} 1s infinite alternate linear;
  margin: auto;

  &::before {
    content: "Loading...";
    line-height: 1em;
    color: transparent;
    background: inherit;
    background-image: radial-gradient(circle closest-side, #fff 94%, #000);
    -webkit-background-clip: text;
    background-clip: text;
  }
`;

export default function Loader() {
  return <LoaderWrapper />;
}
