import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
          const classes = {
            active: activeTab === index ? 'active' : '',
            disabled: item.disabled ? 'disabled' : '',
          };

          if (item.skip) {
            return null;
          } else {
            return (
              <Tab
                key={index}
                onClick={() => handleClick(item, index)}
                className={`${classes.active} ${classes.disabled}`}
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
    </TabMenu>
  );
}

const TabMenu = styled.div`
  flex-grow: 1;
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
  height: 93%;
  background-color: #fff;
  border: 0.5px solid gray;
  box-shadow: 2px 2px 4px rgb(180, 180, 180);
  padding: 12px;
`;

export default TabsMenu;
