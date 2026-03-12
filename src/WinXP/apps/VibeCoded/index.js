import React from 'react';
import styled from 'styled-components';
import FolderExplorer from '../shared/FolderExplorer';
import projects from '../../../data/projects.json';

function VibeCoded() {
  return (
    <FolderExplorer
      sidebarTitle="Vibecoded Projects"
      sidebarDescription="Things I have built"
    >
      <SectionHeader>Projects</SectionHeader>
      {projects.map((project) => (
        <ProjectTile key={project.id}>
          <ProjectName>
            {project.url ? (
              <Link href={project.url} target="_blank" rel="noopener noreferrer">
                {project.name}
              </Link>
            ) : (
              project.name
            )}
          </ProjectName>
          <ProjectDescription>{project.description}</ProjectDescription>
        </ProjectTile>
      ))}
    </FolderExplorer>
  );
}

const SectionHeader = styled.div`
  font-weight: 700;
  padding-bottom: 3px;
  margin-bottom: 10px;
  position: relative;

  &:after {
    content: '';
    display: block;
    background: linear-gradient(to right, #70bfff 0, #fff 100%);
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 300px;
  }
`;

const ProjectTile = styled.div`
  margin-bottom: 12px;
`;

const ProjectName = styled.div`
  font-weight: 700;
  font-size: 11px;
  margin-bottom: 2px;
`;

const Link = styled.a`
  color: #0000ee;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #551a8b;
  }
`;

const ProjectDescription = styled.div`
  font-size: 11px;
  color: #444;
  line-height: 1.4;
`;

export default VibeCoded;
