import React, { useState } from 'react';
import styled from 'styled-components';

const items = ['Themes', 'desktop', 'Screen Saver', 'Appearance', 'Settings'];

function Properties() {
  const [ActiveTab, setActiveTab] = useState(0);
  console.log('ActiveTab', ActiveTab);

  return (
    <TabMenu>
      <Tabs>
        {items.map((item, index) => (
          <TabFunc
            key={index}
            item={item}
            ActiveTab={ActiveTab}
            index={index}
            setActiveTab={setActiveTab}
          />
        ))}
      </Tabs>
      <Content>
        <ThemesPage>
          <div className={'description'}>
            <p>
              A theme is a background plus a set of sounds, icons and other
              elements
            </p>
            <p> to help you personalize your computer with one click.</p>
          </div>
          <div className={'theme'}>
            <div className={'options'}>
              <label className={'label'} for="theme">
                Theme:
              </label>
              <select className={'select'} id="theme">
                <option value="Windows-xp">Windows XP</option>
                <option value="pink">Pink</option>
              </select>
            </div>
            <div className={'buttons'}>
              <button>Save As...</button>
              <button>Delete</button>
            </div>
          </div>
          <div className={'sample'}>
            <p>Sample:</p>
            <div className={'preview'}></div>
          </div>
        </ThemesPage>
      </Content>
      <Buttons />
    </TabMenu>
  );
}

function TabFunc({ item, ActiveTab, index, setActiveTab }) {
  return (
    <Tab
      onClick={() => setActiveTab(index)}
      className={ActiveTab === index ? 'active' : ''}
    >
      {item}
    </Tab>
  );
}

const TabMenu = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: rgb(236, 233, 218);
  padding: 10px;
`;

const Tabs = styled.div`
  display: flex;
  width: 100%;
  height: 18px;
  font-size: 11px;
`;

const Tab = styled.div`
  position: relative;
  padding: 2px 4px;
  border-top: 0.5px solid gray;
  margin-right: 1px;
  border-right: 0.5px solid gray;
  border-left: 0.5px solid gray;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  background-color: #fff;

  &.active {
    z-index: 100;
    height: 19px;
    border-bottom: none;

    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: orange;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      border-top: 0.5px solid grey;
    }
  }
`;

const Content = styled.div`
  height: 100%;
  background-color: #fff;
  border: 0.5px solid gray;
  box-shadow: 2px 2px 4px rgb(180, 180, 180);
  padding: 12px;
`;

const Buttons = styled.div`
  width: 100%;
  height: 50px;
`;

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

  .buttons {
    & button {
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
      width: 100%;
      height: 300px;
      background-color: red;
    }
  }
`;

export default Properties;
