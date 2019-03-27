import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ga from 'react-ga';
import go from 'src/assets/internetExplorer/290.png';
import search from 'src/assets/internetExplorer/299(32x32).png';
import computer from 'src/assets/windowsIcons/676(16x16).png';
import back from 'src/assets/internetExplorer/back.png';
import forward from 'src/assets/internetExplorer/forward.png';
import up from 'src/assets/windowsIcons/up.png';
import viewInfo from 'src/assets/windowsIcons/view-info.ico';
import remove from 'src/assets/windowsIcons/302(16x16).png';
import control from 'src/assets/windowsIcons/300(16x16).png';
import network from 'src/assets/windowsIcons/693(16x16).png';
import document from 'src/assets/windowsIcons/308(16x16).png';
import folderSmall from 'src/assets/windowsIcons/318(16x16).png';
import menu from 'src/assets/windowsIcons/358(32x32).png';
import folder from 'src/assets/windowsIcons/318(48x48).png';
import folderOpen from 'src/assets/windowsIcons/337(32x32).png';
import disk from 'src/assets/windowsIcons/334(48x48).png';
import cd from 'src/assets/windowsIcons/111(48x48).png';
import dropdown from 'src/assets/windowsIcons/dropdown.png';
import pullup from 'src/assets/windowsIcons/pullup.png';
import logo from 'src/assets/github-logo.png';

import { WindowDropdown } from 'src/components';
import dropDownData from './dropDownData';

function MyComputer({ onClose }) {
  const dropDown = useRef(null);
  const [openOption, setOpenOption] = useState('');
  function hoverOption(option) {
    if (openOption) setOpenOption(option);
  }
  function onMouseUp(e) {
    if (!dropDown.current.contains(e.target)) setOpenOption('');
  }
  function onClickOptionItem(item) {
    switch (item) {
      case 'Close':
        onClose();
        break;
      default:
    }
    setOpenOption('');
  }
  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);
  return (
    <Div>
      <section className="com__toolbar">
        <div className="com__toolbar__drop-downs" ref={dropDown}>
          {'File,Edit,View,Favorites,Tools,Help'.split(',').map(name => (
            <div
              className={`com__toolbar__drop-down${
                openOption === name ? '--active' : ''
              }`}
              key={name}
            >
              <div className="com__toolbar__drop-down__label">{name}</div>
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
        <div className="com__toolbar__options">
          {'File,Edit,View,Favorites,Tools,Help'.split(',').map(name => (
            <div
              key={name}
              onMouseDown={() => {
                setOpenOption(name);
              }}
              onMouseEnter={() => hoverOption(name)}
              className="com__toolbar__option"
            >
              {name}
            </div>
          ))}
        </div>
      </section>
      <section className="com__function_bar">
        <div className="com__function_bar__button--disable">
          <img className="com__function_bar__icon" src={back} alt="" />
          <span className="com__function_bar__text">Back</span>
          <div className="com__function_bar__arrow" />
        </div>
        <div className="com__function_bar__button--disable">
          <img className="com__function_bar__icon" src={forward} alt="" />
          <div className="com__function_bar__arrow" />
        </div>
        <div className="com__function_bar__button">
          <img className="com__function_bar__icon--normalize" src={up} alt="" />
        </div>
        <div className="com__function_bar__separate" />
        <div className="com__function_bar__button">
          <img
            className="com__function_bar__icon--normalize "
            src={search}
            alt=""
          />
          <span className="com__function_bar__text">Search</span>
        </div>
        <div className="com__function_bar__button">
          <img
            className="com__function_bar__icon--normalize"
            src={folderOpen}
            alt=""
          />
          <span className="com__function_bar__text">Folders</span>
        </div>
        <div className="com__function_bar__separate" />
        <div className="com__function_bar__button">
          <img
            className="com__function_bar__icon--margin12"
            src={menu}
            alt=""
          />
          <div className="com__function_bar__arrow" />
        </div>
      </section>
      <section className="com__address_bar">
        <div className="com__address_bar__title">Address</div>
        <div className="com__address_bar__content">
          <img
            src={computer}
            alt="ie"
            className="com__address_bar__content__img"
          />
          <div className="com__address_bar__content__text">My Computer</div>
          <img
            src={dropdown}
            alt="dropdown"
            className="com__address_bar__content__img"
          />
        </div>
        <div className="com__address_bar__go">
          <img className="com__address_bar__go__img" src={go} alt="go" />
          <span className="com__address_bar__go__text">Go</span>
        </div>
      </section>
      <div className="com__content">
        <div className="com__content__inner">
          <div className="com__content__left">
            <div className="com__content__left__card">
              <div className="com__content__left__card__header">
                <div className="com__content__left__card__header__text">
                  System Tasks
                </div>
                <img
                  src={pullup}
                  alt=""
                  className="com__content__left__card__header__img"
                />
              </div>
              <div className="com__content__left__card__content">
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={viewInfo}
                    alt="view"
                  />
                  <div className="com__content__left__card__text link">
                    View system information
                  </div>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={remove}
                    alt="remove"
                  />
                  <div className="com__content__left__card__text link">
                    Add or remove programs
                  </div>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={control}
                    alt="control"
                  />
                  <div className="com__content__left__card__text link">
                    Change a setting
                  </div>
                </div>
              </div>
            </div>
            <div className="com__content__left__card">
              <div className="com__content__left__card__header">
                <div className="com__content__left__card__header__text">
                  Other Places
                </div>
                <img
                  src={pullup}
                  alt=""
                  className="com__content__left__card__header__img"
                />
              </div>
              <div className="com__content__left__card__content">
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={network}
                    alt="network"
                  />
                  <div className="com__content__left__card__text link">
                    My Network Places
                  </div>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={document}
                    alt="document"
                  />
                  <div className="com__content__left__card__text link">
                    My Documents
                  </div>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={folderSmall}
                    alt="folder"
                  />
                  <div className="com__content__left__card__text link">
                    Shared Documents
                  </div>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={control}
                    alt="control"
                  />
                  <div className="com__content__left__card__text link">
                    Control Panel
                  </div>
                </div>
              </div>
            </div>
            <div className="com__content__left__card">
              <div className="com__content__left__card__header">
                <div className="com__content__left__card__header__text">
                  Details
                </div>
                <img
                  src={pullup}
                  alt=""
                  className="com__content__left__card__header__img"
                />
              </div>
              <div className="com__content__left__card__content">
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src={logo}
                    alt="control"
                  />
                  <ga.OutboundLink
                    eventLabel="https://github.com/ShizukuIchi"
                    to="https://github.com/ShizukuIchi"
                    className="com__content__left__card__text link"
                    target="_blank"
                  >
                    Github
                  </ga.OutboundLink>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src="https://cdn.iconscout.com/icon/free/png-256/medium-1425876-1205067.png"
                    alt="control"
                  />
                  <ga.OutboundLink
                    eventLabel="https://medium.com/@ShizukuIchi"
                    to="https://medium.com/@ShizukuIchi"
                    className="com__content__left__card__text link"
                    target="_blank"
                  >
                    Medium
                  </ga.OutboundLink>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src="https://image.flaticon.com/icons/png/128/179/179312.png"
                    alt="control"
                  />
                  <ga.OutboundLink
                    eventLabel="https://sh1zuku.csie.io/blog"
                    to="https://sh1zuku.csie.io/blog"
                    className="com__content__left__card__text link"
                    target="_blank"
                  >
                    Blog
                  </ga.OutboundLink>
                </div>
              </div>
            </div>
          </div>
          <div className="com__content__right">
            <div className="com__content__right__card">
              <div className="com__content__right__card__header">
                Files Stored on This Computer
              </div>
              <div className="com__content__right__card__content">
                <div className="com__content__right__card__item">
                  <img
                    src={folder}
                    alt="folder"
                    className="com__content__right__card__img"
                  />
                  <div className="com__content__right__card__img-container">
                    <div className="com__content__right__card__text">
                      Shared Documents
                    </div>
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <img
                    src={folder}
                    alt="folder"
                    className="com__content__right__card__img"
                  />
                  <div className="com__content__right__card__img-container">
                    <div className="com__content__right__card__text">
                      User's Documents
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="com__content__right__card">
              <div className="com__content__right__card__header">
                Hard Disk Drives
              </div>
              <div className="com__content__right__card__content">
                <div className="com__content__right__card__item">
                  <img
                    src={disk}
                    alt="disk"
                    className="com__content__right__card__img"
                  />
                  <div className="com__content__right__card__img-container">
                    <div className="com__content__right__card__text">
                      Local Disk (C:)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="com__content__right__card">
              <div className="com__content__right__card__header">
                Devices with Removable Storage
              </div>
              <div className="com__content__right__card__content">
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__img-container">
                    <img
                      src={cd}
                      alt="cd"
                      className="com__content__right__card__img"
                    />
                  </div>
                  <div className="com__content__right__card__text">
                    CD Drive (D:)
                  </div>
                </div>
              </div>
            </div>
            <div className="com__content__right__card com__content__right__card--me">
              <div className="com__content__right__card__header">
                About Me :)
              </div>
              <div className="com__content__right__card__content">
                <ga.OutboundLink
                  eventLabel="https://github.com/ShizukuIchi/fake-screen"
                  to="https://github.com/ShizukuIchi/fake-screen"
                  className="com__content__right__card__item--me"
                  target="_blank"
                >
                  <img
                    className="com__content__right__card__img"
                    src={logo}
                    alt="control"
                  />
                  <div className="com__content__right__card__text">Github</div>
                </ga.OutboundLink>
                <ga.OutboundLink
                  eventLabel="https://sh1zuku.csie.io"
                  to="https://sh1zuku.csie.io"
                  className="com__content__right__card__item--me"
                  target="_blank"
                >
                  <img
                    className="com__content__right__card__img"
                    src="https://a.ppy.sh/2926513_1448497605.png"
                    alt="control"
                  />
                  <div className="com__content__right__card__text">
                    My Website
                  </div>
                </ga.OutboundLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background: linear-gradient(to right, #edede5 0%, #ede8cd 100%);

  .com__toolbar {
    position: relative;
    display: flex;
    align-items: center;
    line-height: 100%;
    height: 22px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    flex-shrink: 0;
  }
  .com__toolbar__drop-downs {
    display: flex;
    height: 100%;
    position: absolute;
    border-bottom: 1px solid transparent;
  }
  .com__toolbar__drop-down {
    font-size: 11px;
    line-height: 20px;
    height: 100%;
    background-color: #1660e8;
    position: relative;
    visibility: hidden;
  }
  .com__toolbar__drop-down--active {
    font-size: 11px;
    line-height: 20px;
    height: 100%;
    visibility: visible;
    z-index: 1;
    background-color: #1660e8;
    position: relative;
  }
  .com__toolbar__drop-down__label {
    padding: 0 7px;
    color: #fff;
  }
  .com__toolbar__options {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    line-height: 100%;
    height: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    border-right: 1px solid rgba(0, 0, 0, 0.15);
  }
  .com__toolbar__option {
    font-size: 11px;
    line-height: 20px;
    height: 100%;
    padding: 0 7px;
    &:hover {
      background-color: #1660e8;
      color: #fff;
    }
  }
  .com__toolbar__img {
    height: 100%;
    border-left: 1px solid white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .com__function_bar {
    height: 36px;
    display: flex;
    align-items: center;
    font-size: 11px;
    padding: 1px 3px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
  }
  .com__function_bar__button {
    display: flex;
    height: 100%;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 3px;
    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: inset 0 -1px 1px rgba(0, 0, 0, 0.1);
    }
    &:hover:active {
      border: 1px solid rgb(185, 185, 185);
      background-color: #dedede;
      box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.7);
      color: rgba(255, 255, 255, 0.7);
      & > * {
        transform: translate(1px, 1px);
      }
    }
  }
  .com__function_bar__button--disable {
    filter: grayscale(1);
    opacity: 0.7;
    display: flex;
    height: 100%;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0);
  }
  .com__function_bar__text {
    margin-right: 4px;
  }
  .com__function_bar__icon {
    height: 30px;
    width: 30px;
    &--normalize {
      height: 22px;
      width: 22px;
      margin: 0 4px 0 1px;
    }
    &--margin12 {
      height: 22px;
      width: 22px;
      margin: 0 1px 0 2px;
    }
    &--margin-1 {
      margin: 0 -1px;
      height: 30px;
      width: 30px;
    }
  }
  .com__function_bar__separate {
    height: 90%;
    width: 1px;
    background-color: rgba(0, 0, 0, 0.2);
    margin: 0 2px;
  }
  .com__function_bar__arrow {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 4px;
    &:before {
      content: '';
      display: block;
      border-width: 3px 3px 0;
      border-color: #000 transparent;
      border-style: solid;
    }
  }
  .com__function_bar__arrow--margin-11 {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 1px 0 -1px;
    &:before {
      content: '';
      display: block;
      border-width: 3px 3px 0;
      border-color: #000 transparent;
      border-style: solid;
    }
  }
  .com__address_bar {
    flex-shrink: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.7);
    height: 20px;
    font-size: 11px;
    display: flex;
    align-items: center;
    padding: 0 2px;
    box-shadow: inset 0 -2px 3px -1px #b0b0b0;
  }
  .com__address_bar__title {
    line-height: 100%;
    color: rgba(0, 0, 0, 0.5);
    padding: 5px;
  }
  .com__address_bar__content {
    border: rgba(122, 122, 255, 0.6) 1px solid;
    height: 100%;
    display: flex;
    flex: 1;
    font-size: 10;
    align-items: center;
    background-color: white;
    padding: 0 1px;
    &__img {
      width: 14px;
      height: 14px;
      margin-right: 2px;
    }
    &__img:last-child {
      width: 15px;
      height: 15px;
      margin: 0;
    }
    &__img:last-child:hover {
      filter: brightness(110%);
    }
    &__text {
      line-height: 100%;
      flex: 1;
      white-space: nowrap;
    }
  }

  .com__address_bar__go {
    display: flex;
    align-items: center;
    padding: 0 18px 0 5px;
    height: 100%;
    position: relative;
    &__img {
      height: 95%;
      border: 1px solid rgba(255, 255, 255, 0.2);
      margin-right: 3px;
    }
  }
  .com__address_bar__links {
    display: flex;
    align-items: center;
    padding: 0 18px 0 5px;
    height: 100%;
    position: relative;
    &__img {
      position: absolute;
      right: 2px;
      top: 3px;
      height: 5px;
      width: 8px;
    }
    &__text {
      color: rgba(0, 0, 0, 0.5);
    }
  }
  .com__address_bar__separate {
    height: 100%;
    width: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: 1px 0 rgba(255, 255, 255, 0.7);
  }
  .com__content {
    flex: 1;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-top-width: 0;
    background-color: #f1f1f1;
    overflow: auto;
    font-size: 11px;
    position: relative;
  }
  .com__content__inner {
    display: flex;
    height: 100%;
    overflow: auto;
  }
  .com__content__left {
    width: 180px;
    height: 100%;
    background: linear-gradient(to bottom, #748aff 0%, #4057d3 100%);
    overflow: auto;
    padding: 10px;
  }

  .com__content__left__card {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    width: 100%;
    overflow: hidden;
  }
  .com__content__left__card:not(:last-child) {
    margin-bottom: 12px;
  }
  .com__content__left__card__header {
    display: flex;
    align-items: center;
    height: 23px;
    padding-left: 11px;
    padding-right: 2px;
    cursor: pointer;
    background: linear-gradient(
      to right,
      rgb(240, 240, 255) 0,
      rgb(240, 240, 255) 30%,
      rgb(168, 188, 255) 100%
    );
  }
  .com__content__left__card__header:hover {
    & .com__content__left__card__header__text {
      color: #1c68ff;
    }
  }
  .com__content__left__card__header__text {
    font-weight: 700;
    color: #0c327d;
    flex: 1;
  }
  .com__content__left__card__header__img {
    width: 18px;
    height: 18px;
    filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
  }
  .com__content__left__card__content {
    padding: 5px 10px;
    background: linear-gradient(
      to right,
      rgb(180, 200, 251) 0%,
      rgb(164, 185, 251) 50%,
      rgb(180, 200, 251) 100%
    );
    background-color: rgba(198, 211, 255, 0.87);
  }
  .com__content__left__card__row {
    display: flex;
    margin-bottom: 2px;
  }

  .com__content__left__card__img {
    width: 14px;
    height: 14px;
    margin-right: 5px;
  }
  .com__content__left__card__text {
    font-size: 10px;
    line-height: 14px;
    color: #0c327d;
    &.black {
      color: #000;
    }
    &.bold {
      font-weight: bold;
    }

    &.link:hover {
      cursor: pointer;
      color: #2b72ff;
      text-decoration: underline;
    }
  }
  .com__content__right {
    height: 100%;
    overflow: auto;
    background-color: #fff;
    flex: 1;
  }
  .com__content__right__card__header {
    width: 300px;
    font-weight: 700;
    padding: 2px 0 3px 12px;
    position: relative;
    &:after {
      content: '';
      display: block;
      background: linear-gradient(to right, #70bfff 0, #fff 100%);
      position: absolute;
      bottom: 0;
      left: -12px;
      height: 1px;
      width: 100%;
    }
  }
  .com__content__right__card__content {
    display: flex;
    align-items: center;
    padding-right: 0;
    flex-wrap: wrap;
    padding: 15px 15px 0;
  }
  .com__content__right__card__item {
    display: flex;
    align-items: center;
    width: 200px;
    margin-bottom: 15px;
    height: auto;
  }
  .com__content__right__card__img {
    width: 45px;
    height: 45px;
    margin-right: 5px;
  }
  .com__content__right__card__text {
    white-space: nowrap;
    height: 100%;
  }
  .com__content__right__card--me {
    .com__content__right__card__header:after,
    .com__content__right__card__header {
      transition: 0.4s;
    }
    &:hover {
      .com__content__right__card__header:after {
        width: 0;
      }
      .com__content__right__card__header {
        transform: scale(1.2) translate(20px, 5px);
      }
    }
  }
  .com__content__right__card__item--me {
    display: flex;
    align-items: center;
    width: 200px;
    margin-bottom: 15px;
    height: auto;
    & > * {
      transition: transform 0.2s;
    }
    &:hover .com__content__right__card__img {
      transform: rotate(-10deg) scale(0.9);
    }
    &:hover .com__content__right__card__text {
      transform: scale(1.2);
      transition-timing-function: cubic-bezier(0.23, 1.93, 0.59, -0.15);
    }
  }
`;

export default MyComputer;
