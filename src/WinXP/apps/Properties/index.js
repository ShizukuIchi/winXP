import React, { useState } from 'react';
import styled from 'styled-components';
import TabContents from './TabContents';

const tabs = ['Themes', 'Desktop', 'Screen Saver', 'Appearance', 'Settings'];

function Properties() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabMenu>
      <Tabs>
        {tabs.map((item, index) => (
          <Tab
            key={index}
            onClick={() => setActiveTab(index)}
            className={activeTab === index ? 'active' : ''}
          >
            {item}
          </Tab>
        ))}
      </Tabs>
      <Content>
        {tabs.map((item, index) => {
          if (index === activeTab) {
            return <GenerateContentTab type={item} />;
          }
          return null;
        })}
      </Content>
      <Buttons />
    </TabMenu>
  );
}

function GenerateContentTab(props) {
  const Content = TabContents[props.type];
  return TabContents[props.type] ? <Content {...props} /> : null;
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

export default Properties;
