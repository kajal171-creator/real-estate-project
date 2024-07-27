import React from 'react';
import { Avatar, Menu } from '@mantine/core';

const ProfileMenu = ({ user, logout }) => {
  return (
    <Menu width={200} /* add a width to the menu dropdown */>
      <Menu.Target>
        <Avatar src={user?.picture} alt="user image" size="lg" /* changed size to lg */ />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>Favourites</Menu.Item>
        <Menu.Item>Bookings</Menu.Item>
        <Menu.Item
          onClick={() => {
            if (logout) {
              localStorage.clear();
              logout();
            }
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;