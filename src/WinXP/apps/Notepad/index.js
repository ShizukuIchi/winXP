import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { WindowDropdown } from 'src/components';
import dropDownData from './dropDownData';

export default function Notepad({ onClose }) {
  const dropDown = useRef(null);
  const [openOption, setOpenOption] = useState('');
  const [docText, setDocText] = useState('');
  const [wordWrap, setWordWrap] = useState(false);

  function hoverOption(option) {
    if (openOption) setOpenOption(option);
  }
  function onMouseUp(e) {
    if (!dropDown.current.contains(e.target)) setOpenOption('');
  }
  function onClickOptionItem(item) {
    switch (item) {
      case 'Exit':
        onClose();
        break;
      case 'Word Wrap':
        setWordWrap(!wordWrap);
        break;
      case 'Time/Date':
        const date = new Date();
        setDocText(`${docText}${date.toLocaleTimeString()} ${date.toLocaleDateString()}`);
        break;
      default:
    }
    setOpenOption('');
  }
  function onTextAreaKeyDown(e) {
    // handle tabs in text area
    if (e.which === 9) {
      e.preventDefault();
      e.persist();
      var start = e.target.selectionStart;
      var end = e.target.selectionEnd;
      setDocText(`${docText.substring(0, start)}\t${docText.substring(end)}`);

      // asynchronously update textarea selection to include tab
      // workaround due to https://github.com/facebook/react/issues/14174
      requestAnimationFrame(() => {
        e.target.selectionStart = start + 1;
        e.target.selectionEnd = start + 1;
      });
    }
  }
  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <Div>
      <section className="np__toolbar">
        <div className="np__toolbar__drop-downs" ref={dropDown}>
          {'File,Edit,Format,View,Help'.split(',').map(name => (
            <div
              className={`np__toolbar__drop-down${
                openOption === name ? '--active' : ''
              }`}
              key={name}
            >
              <div className="np__toolbar__drop-down__label">{name}</div>
              {openOption === name && (
                <WindowDropdown
                  onClick={onClickOptionItem}
                  items={dropDownData[name]}
                  position={{ top: '20px', left: '0' }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="np__toolbar__options">
          {'File,Edit,Format,View,Help'.split(',').map(name => (
            <div
              key={name}
              onMouseDown={() => {
                setOpenOption(name);
              }}
              onMouseEnter={() => hoverOption(name)}
              className="np__toolbar__option"
            >
              {name}
            </div>
          ))}
        </div>
      </section>
      <StyledTextarea
        wordWrap={wordWrap}
        value={docText}
        onChange={e => setDocText(e.target.value)}
        onKeyDown={onTextAreaKeyDown}
        spellCheck={false}
      />
    </Div>
  );
}

const Div = styled.div`
  height: 100%;
  background: linear-gradient(to right, #edede5 0%, #ede8cd 100%);
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .np__toolbar {
    position: relative;
    display: flex;
    align-items: center;
    line-height: 100%;
    height: 22px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    flex-shrink: 0;
  }
  .np__toolbar__drop-downs {
    display: flex;
    height: 100%;
    position: absolute;
    border-bottom: 1px solid transparent;
  }
  .np__toolbar__drop-down {
    font-size: 11px;
    line-height: 20px;
    height: 100%;
    background-color: #1660e8;
    position: relative;
    visibility: hidden;
  }
  .np__toolbar__drop-down--active {
    font-size: 11px;
    line-height: 20px;
    height: 100%;
    visibility: visible;
    z-index: 1;
    background-color: #1660e8;
    position: relative;
  }
  .np__toolbar__drop-down__label {
    padding: 0 7px;
    color: #fff;
  }
  .np__toolbar__options {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    line-height: 100%;
    height: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    border-right: 1px solid rgba(0, 0, 0, 0.15);
  }
  .np__toolbar__option {
    font-size: 11px;
    line-height: 20px;
    height: 100%;
    padding: 0 7px;
    &:hover {
      background-color: #1660e8;
      color: #fff;
    }
  }
`;

const StyledTextarea = styled.textarea`
  flex: auto;
  box-sizing: border-box;
  font-family: 'Lucida Console', monospace;
  padding: 5px 2px;
  ${props => props.wordWrap ? '' : 'white-space: nowrap; overflow-x: scroll;'}
  overflow-y: scroll;
`;
