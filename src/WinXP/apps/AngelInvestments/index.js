import React from 'react';
import styled from 'styled-components';
import FolderExplorer from '../shared/FolderExplorer';

function AngelInvestments() {
  return (
    <FolderExplorer
      sidebarTitle="Angel Investments"
      sidebarDescription="Seed, pre-seed, and advisory positions in early-stage projects."
    >
      <SectionHeader>Seed and Pre-seed Investments</SectionHeader>
      <LinkList>
        <div><Link href="https://aura.money/" target="_blank" rel="noopener noreferrer">Aura</Link></div>
        <div><Link href="https://beramonium.io/" target="_blank" rel="noopener noreferrer">Beramonium</Link></div>
        <div><Link href="https://www.bitsafe.finance/" target="_blank" rel="noopener noreferrer">BitSafe</Link></div>
        <div><Link href="https://creator.bid/agents" target="_blank" rel="noopener noreferrer">Creator Bid</Link></div>
        <div><Link href="https://www.inceptionlrt.com/" target="_blank" rel="noopener noreferrer">Inception LRT</Link></div>
        <div><Link href="https://nvg8.io/" target="_blank" rel="noopener noreferrer">Nvg8</Link></div>
        <div><Link href="https://www.oogabooga.io/" target="_blank" rel="noopener noreferrer">Ooga Booga</Link></div>
        <div><Link href="https://odx.so/" target="_blank" rel="noopener noreferrer">Ordinox</Link></div>
        <div><Link href="https://www.osito.finance/" target="_blank" rel="noopener noreferrer">Osito</Link></div>
        <div><Link href="https://www.raiku.com/" target="_blank" rel="noopener noreferrer">Raiku</Link></div>
      </LinkList>

      <SectionHeader>Advisory</SectionHeader>
      <LinkList>
        <div><Link href="https://www.bitsafe.finance/" target="_blank" rel="noopener noreferrer">BitSafe</Link></div>
        <div><Link href="https://creator.bid/agents" target="_blank" rel="noopener noreferrer">Creator Bid</Link></div>
      </LinkList>
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

const LinkList = styled.div`
  margin-bottom: 16px;
  line-height: 1.6;
`;

const Link = styled.a`
  color: #0000ee;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #551a8b;
  }
`;

export default AngelInvestments;
