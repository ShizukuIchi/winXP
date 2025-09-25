import React from 'react';
import Minesweeper from './index';

interface MinesweeperAppProps {
  onClose?: () => void;
}

const MinesweeperApp: React.FC<MinesweeperAppProps> = ({ onClose }) => {
  return <Minesweeper onClose={onClose} />;
};

export default MinesweeperApp;