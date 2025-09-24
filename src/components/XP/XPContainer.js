import styled from 'styled-components';
import 'xp.css/dist/XP.css';
import './XPOverrides.css';
import '../../assets/xp-button-overrides.css';

// Simple container for XP components without aggressive isolation
export const XPContainer = styled.div`
  /* Light scoping - just ensure XP components work properly */
  font-family: 'MS Sans Serif', sans-serif;

  /* Let XP.css do its work */
  & button,
  & input,
  & select,
  & textarea,
  & fieldset,
  & legend,
  & label,
  & progress,
  & menu,
  & article,
  & details,
  & summary,
  & ul,
  & li,
  & pre {
    /* Let XP.css styles take precedence */
    font-family: inherit;
  }
`;

// No need for global styles - XP.css is imported directly
export const XPGlobalStyles = () => null;