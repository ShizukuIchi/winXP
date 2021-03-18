import React from 'react';
import styled from 'styled-components';

import preview from '../../../assets/properties/displayProperties/preview.png';

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
        <div className="preview">
          <img src={preview} alt="preview" />
        </div>
      </div>
    </ThemesPage>
  );
}

const ThemesPage = styled.div`
  font-size: 10px;

  .theme {
    margin-top: 15px;
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
    margin-top: 15px;

    .preview {
      margin-top: 5px;
      height: 2px;
      height: 235px;

      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
    }
  }
`;

export default ThemeTab;
