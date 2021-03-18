import React from 'react';
import styled from 'styled-components';

function ThemeTab() {
  return (
    <ThemesPage>
      <div className="description">
        <p>
          A theme is a background plus a set of sounds, icons and other elements
        </p>
        <p> to help you personalize your computer with one click.</p>
      </div>
      <div className="theme">
        <div className="options">
          <label className="label" htmlFor="theme">
            Theme:
          </label>
          <select className="select" id="theme">
            <option value="Windows-xp">Windows XP</option>
            <option value="pink">Pink</option>
          </select>
        </div>
        <div className="buttons">
          <button>Save As...</button>
          <button>Delete</button>
        </div>
      </div>
      <div className="sample">
        <p>Sample:</p>
        <div className="preview"></div>
      </div>
    </ThemesPage>
  );
}

const ThemesPage = styled.div`
  font-size: 10px;

  .theme {
    margin-top: 10px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .label {
    display: block;
  }

  .select {
    margin-top: 5px;
    width: 180px;
  }

  & .buttons {
    button {
      width: 80px;
    }

    button:first-child {
      margin-right: 4px;
    }
  }

  .sample {
    margin-top: 10px;
    height: 100%;

    .preview {
      height: 284px;
      background-color: red;
    }
  }
`;

export default ThemeTab;
