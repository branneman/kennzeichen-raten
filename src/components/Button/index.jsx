import styled from 'styled-components'
import theme from '../App/theme'

const Anchor = styled.a`
  display: inline-block;
  margin: 0 1em 1em 0;
  border: 1px solid ${theme.cta.border};
  border-radius: 0.5em;
  box-shadow: 2px 2px 2px ${theme.cta.border};
  padding: 0.75em;
  background-color: ${theme.cta.bg};
  color: ${theme.cta.fg};
  text-decoration: none;

  &:hover {
    filter: brightness(0.85);
  }
`

const Button = styled.button`
  /* generic button reset styles */
  width: 100%;
  margin: 0;
  border: 1px solid ${theme.cta.border};
  border-radius: 0.5em;
  box-shadow: 2px 2px 2px ${theme.cta.border};
  padding: 0.75em;
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  overflow: visible;
  text-transform: none;
  -webkit-appearance: button;
  cursor: pointer;

  /* specific styles to this component */
  display: inline-block;
  margin: 0 1em 1em 0;
  background-color: ${theme.cta.bg};
  color: ${theme.cta.fg};

  &:hover {
    filter: brightness(0.85);
  }
`

export default Button
export { Anchor }
