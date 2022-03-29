import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import BackgroundView from 'components/BackgroundView';
import Button from 'components/Button';
import ColorSwatches from 'components/ColorSwatches/';
import SelectInput from 'components/SelectInput/';

import display from 'assets/properties/displayProperties/display.png';
import iconNone from 'assets/properties/displayProperties/icons/none.png';
import iconImage from 'assets/properties/displayProperties/icons/image.png';

import { backgrounds, DESKTOP } from './utils';

function DesktopTab({ state, dispatch }) {
  const { id, position, image, color } = state.displayProperties.desktop;
  const [desktopState, setDesktopState] = useState({
    id,
    position,
    image,
    color,
  });
  const [openColorSwatches, setOpenColorSwatches] = useState(false);

  const positionOptions = [
    { value: 'center', label: 'Center' },
    { value: 'tile', label: 'Tile' },
    { value: 'stretch', label: 'Stretch' },
  ];

  const isBackgroundNone = desktopState.id === 0;

  const refs = backgrounds.reduce((acc, item) => {
    acc[item.id] = React.createRef();
    return acc;
  }, {});

  useEffect(() => {
    dispatch({ type: DESKTOP, payload: desktopState });
  }, [desktopState, dispatch]);

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

    const hasNoBackground = e.target.innerText === backgrounds[0].title;
    if (hasNoBackground) {
      setDesktopState(prev => ({ ...prev, image: null }));
      return;
    }
    setDesktopState(prev => ({
      ...prev,
      image: background,
      position: backgrounds[id].defaultPosition,
    }));
  };

  const handleSelectChange = value => {
    setDesktopState(prev => ({ ...prev, position: value }));
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
            <Button>Browse...</Button>
            <div className={isBackgroundNone ? 'disabled' : ''}>
              <label>Position:</label>
              <SelectInput
                disabled={isBackgroundNone}
                cb={handleSelectChange}
                value={position}
                options={positionOptions}
              />
            </div>
            <div>
              <label>Color:</label>
              <button
                id="color"
                className="color-button ignore-react-onclickoutside"
                type="button"
                onClick={() => setOpenColorSwatches(true)}
              >
                <input
                  type="color"
                  value={desktopState.color}
                  disabled
                  className="color-box"
                />
              </button>
              {openColorSwatches && (
                <ColorSwatches
                  currentColor={desktopState.color}
                  setDesktopState={setDesktopState}
                  setOpenColorSwatches={setOpenColorSwatches}
                />
              )}
            </div>
          </div>
        </div>
        <Button style={{ width: 146 }}>Customize Desktop...</Button>
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

    select {
      font-size: 13px;
    }

    & .color-button {
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

    & .color-box {
      position: relative;
      right: 1px;
      bottom: 1px;
      border: none;
      width: 60px;
      height: 20px;
    }

    & label {
      display: block;
    }
  }

  .disabled {
    color: #9d9d9d;
  }
`;

export default DesktopTab;
