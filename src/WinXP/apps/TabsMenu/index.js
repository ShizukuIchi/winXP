import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Tabs = {
//   title,
//   content,
//   defaultTab,
//   disabled?,
//   skip?,
// }

function TabsMenu({ tabs }) {
  const [activeTab, setActiveTab] = useState(-1);

  useEffect(() => {
    const fallbackTabIndex = tabs.findIndex(item => isValidTab(item));

    const defaultTabIndex = tabs.findIndex(
      item => item.defaultTab && isValidTab(item),
    );

    setActiveTab(defaultTabIndex !== -1 ? defaultTabIndex : fallbackTabIndex);
  }, [tabs]);

  function isValidTab(tab) {
    return !tab.disabled && !tab.skip;
  }

  function handleClick(item, index) {
    if (item.disabled) return;
    setActiveTab(index);
  }

  function GenerateContentTab(props) {
    const Content = props.content;
    return props.content ? <Content {...props} /> : null;
  }

  return (
    <TabMenu>
      <Tabs>
        {tabs.map((item, index) => {
          if (item.skip) {
            return null;
          } else {
            return (
              <Tab
                key={index}
                onClick={() => handleClick(item, index)}
                className={`${activeTab === index ? 'active' : ''}
              ${item.disabled ? 'disabled' : ''}`}
              >
                {item.title}
              </Tab>
            );
          }
        })}
      </Tabs>
      <Content>
        {tabs.map((item, index) => {
          if (index === activeTab) {
            return <GenerateContentTab content={item.content} index={index} />;
          }
          return null;
        })}
      </Content>
      <Buttons />
    </TabMenu>
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

  &.disabled {
    color: #aaa;
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

export default TabsMenu;
