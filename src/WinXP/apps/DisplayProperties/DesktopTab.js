import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import BackgroundView from '../../../components/BackgroundView';

import arrowDown from '../../../assets/properties/displayProperties/icons/arrowDown.png';
import iconNone from '../../../assets/properties/displayProperties/icons/none.png';
import iconImage from '../../../assets/properties/displayProperties/icons/image.png';
import display from '../../../assets/properties/displayProperties/display.png';

import { backgrounds, DESKTOP } from './utils';

function DesktopTab({ state, dispatch }) {
  const { id, position, image, color } = state.displayProperties.desktop;
  const [disablePosition, setDisablePosition] = useState(false);
  const [desktopState, setDesktopState] = useState({
    id,
    position,
    image,
    color,
  });

  const refs = backgrounds.reduce((acc, item) => {
    acc[item.id] = React.createRef();
    return acc;
  }, {});

  useEffect(() => {
    if (desktopState.id === 0) setDisablePosition(true);
    dispatch({ type: DESKTOP, payload: desktopState });
  }, [desktopState, setDisablePosition, dispatch]);

  // Scroll to view.
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) return;
    refs[id].current.scrollIntoView({
      block: 'end',
    });
    setInit(true);
  }, [id, init, refs]);

  // Unmount only.
  useEffect(() => () => setInit(false), []);

  const handleBackgroundClick = (e, id, background) => {
    setDesktopState(prev => ({ ...prev, id }));

    if (e.target.innerText === '(None)') {
      setDisablePosition(true);
      setDesktopState(prev => ({ ...prev, image: null }));
      return;
    }
    setDisablePosition(false);
    setDesktopState(prev => ({ ...prev, image: background }));
  };

  const handleSelectChange = e => {
    setDesktopState(prev => ({ ...prev, position: e.target.value }));
  };

  const handleColorChange = e => {
    e.persist();
    setDesktopState(prev => ({ ...prev, color: e.target.value }));
  };

  return (
    <Desktop>
      <div className="preview">
        <img src={display} alt="display" />
        <div className="display-overlay">
          <BackgroundView background={desktopState} />
        </div>
      </div>
      <div className="settings">
        <div>Background:</div>
        <div className="preferences">
          <div className="List">
            <ul>
              {backgrounds.map(({ title, id, background }) => (
                <li key={id} ref={refs[id]}>
                  <img
                    className="icon"
                    src={id === 0 ? iconNone : iconImage}
                    alt="icon"
                  />
                  <span
                    className={desktopState.id === id ? 'active' : ''}
                    onClick={e => handleBackgroundClick(e, id, background)}
                  >
                    {title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="options">
            <button>Browse...</button>
            <div className={disablePosition ? 'disabled' : ''}>
              <img className="arrow-down" src={arrowDown} alt="arrow down" />
              <label htmlFor="position">Position:</label>
              <select
                disabled={disablePosition}
                id="position"
                onChange={handleSelectChange}
                defaultValue={position}
              >
                <option value="center">Center</option>
                <option value="tile">Tile</option>
                <option value="stretch">Stretch</option>
              </select>
            </div>
            <div>
              <label htmlFor="color">Color:</label>
              <input
                id="color"
                type="color"
                onChange={e => handleColorChange(e)}
                value={desktopState.color}
              />
            </div>
          </div>
        </div>
        <button className="customize-button">Customize Desktop...</button>
      </div>
    </Desktop>
  );
}

const Desktop = styled.div`
  .preview {
    position: relative;
    display: flex;
    justify-content: center;
    margin: 10px 0;

    & .display-overlay {
      position: absolute;
      top: 17px;
      left: 88px;
      width: 170px;
      height: 118px;
      background-color: #2f71cd;
    }
  }

  .preferences {
    display: flex;
    flex-direction: row;
    margin: 4px 0;
  }

  .List {
    flex-grow: 10;
    height: 111px;
    border: 1px solid #9b9b9b;
    overflow-y: scroll;
    padding-left: 5px;
    background-color: #fff;

    & li {
      display: flex;
    }

    & .icon {
      height: 17px;
    }

    & span {
      font-size: 12px;
      width: max-content;
      padding: 0 2px;
    }

    & .active {
      color: #fff;
      background-color: #2f71cd;
      border: 1px dotted grey;
    }
  }
  .options {
    position: relative;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 115px;
    font-size: 13px;

    & button,
    & select,
    & input {
      width: 80px;
    }

    .arrow-down {
      position: absolute;
      left: 70px;
      top: 48px;
      width: 16px;
      pointer-events: none;
    }

    & #position {
      border-radius: 0;
      border-color: grey;
      &:focus {
        color: #fff;
        background-color: #2f71cd;
        box-shadow: 0px 0px 0px 2px #fff inset;
        outline: none;
      }
    }

    & #color {
      position: relative;
      padding: 0 16px 0 2px;
      border-radius: 4px;
      height: 22px;

      &:before {
        content: '';
        position: absolute;
        top: 3px;
        right: 13px;
        width: 1px;
        height: 15px;
        background-color: darkgray;
      }

      &:after {
        content: '';
        position: absolute;
        top: 8px;
        right: 3px;
        border: 3.5px solid transparent;
        border-top-color: currentColor;
      }
    }

    & label {
      display: block;
    }
  }
  .customize-button {
    padding: 2px 9px;
  }

  .disabled {
    color: #9d9d9d;
  }
`;

export default DesktopTab;
