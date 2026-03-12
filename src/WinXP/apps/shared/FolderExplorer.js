import React from 'react';
import styled from 'styled-components';

function FolderExplorer({ sidebarTitle, sidebarDescription, children }) {
  return (
    <Container>
      <Content>
        <Sidebar>
          <Card>
            <CardHeader>{sidebarTitle}</CardHeader>
            <CardBody>{sidebarDescription}</CardBody>
          </Card>
        </Sidebar>
        <MainArea>{children}</MainArea>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background: linear-gradient(to right, #edede5 0%, #ede8cd 100%);
`;

const Content = styled.div`
  flex: 1;
  border: 1px solid rgba(0, 0, 0, 0.4);
  background-color: #f1f1f1;
  overflow: auto;
  font-size: 11px;
  display: flex;
  height: 100%;
`;

const Sidebar = styled.div`
  width: 180px;
  min-width: 180px;
  height: 100%;
  background: linear-gradient(to bottom, #748aff 0%, #4057d3 100%);
  overflow: auto;
  padding: 10px;
`;

const Card = styled.div`
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  width: 100%;
  overflow: hidden;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  height: 23px;
  padding-left: 11px;
  padding-right: 2px;
  font-weight: 700;
  color: #0c327d;
  background: linear-gradient(
    to right,
    rgb(240, 240, 255) 0,
    rgb(240, 240, 255) 30%,
    rgb(168, 188, 255) 100%
  );
`;

const CardBody = styled.div`
  padding: 8px 10px;
  background: linear-gradient(
    to right,
    rgb(180, 200, 251) 0%,
    rgb(164, 185, 251) 50%,
    rgb(180, 200, 251) 100%
  );
  color: #0c327d;
  font-size: 10px;
  line-height: 1.4;
`;

const MainArea = styled.div`
  height: 100%;
  overflow: auto;
  background-color: #fff;
  flex: 1;
  padding: 12px 15px;
`;

export default FolderExplorer;
