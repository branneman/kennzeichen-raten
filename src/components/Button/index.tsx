import styled from 'styled-components'

const Anchor = styled.a`
  display: inline-block;
  margin: 0 1em 1em 0;
  border: 1px solid grey;
  border-radius: 0.5em;
  box-shadow: 2px 2px 2px grey;
  padding: 0.75em;
  background-color: #555;
  color: #fff;
  text-decoration: none;

  &:hover {
    filter: brightness(0.85);
  }
`

const Button = styled.button`
  /* generic button reset styles */
  width: 100%;
  margin: 0;
  border: 1px solid grey;
  border-radius: 0.5em;
  box-shadow: 2px 2px 2px grey;
  padding: 0.75em;
  background-color: transparent;
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  overflow: visible;
  text-transform: none;
  -webkit-appearance: button;
  cursor: pointer;
  color: #fff;

  /* specific styles to this component */
  display: inline-block;
  margin: 0 1em 1em 0;
  background-color: #555;

  &:hover {
    filter: brightness(0.85);
  }
`

export default Button
export { Anchor }
