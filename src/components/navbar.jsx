import React from 'react';
import { Menu } from 'semantic-ui-react';
import Location from './location';

const Navbar = ({ onLocationChange }) => {
  return (
    <Menu fixed="top" borderless>
      <Menu.Item header>TCM Weather</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          {/* <Input icon="search" placeholder="Search..." /> */}
          <Location onLocationChange={onLocationChange} />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
