import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './menu/Navbar';
import { GridItem } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuHome, LuList, LuSearch, LuSettings, LuStar } from 'react-icons/lu';
import SmallSidebar from './menu/SmallSidebar';

export default function Menu() {
  const [selectedMenu, setSelectedMenu] = useState('');
  const location = useLocation();
  const navigate = useNavigate();


  // Menü elemek
  const menuItems = useMemo(() => [
    { label: "Menü", icon: <LuList /> },
    { label: "Keresés", icon: <LuSearch />, path: "?popup=search" },
    { label: "Kezdőlap", icon: <LuHome />, path: "/" },
    { label: "Kedvencek", icon: <LuStar />, path: "/favorites" },
    { label: "Lejátszási listák", icon: <LuList />, path: "/playlists" },
  ], []);

  const footerItems = useMemo(() => [
    { label: "Beállítások", icon: <LuSettings />, path: "/settings" },
  ], []);


  

  // URL változás figyelése
  useEffect(() => {
    const currentPath = location.pathname + location.search;

    // Kijelölt menüpont beállítása
    const selectedMenuItem = menuItems.find(item => item.path === currentPath.split('?')[0]);
    const selectedFooterItem = footerItems.find(item => item.path === currentPath);
    if (selectedMenuItem) {
      setSelectedMenu(selectedMenuItem.label);
    }
    if (selectedFooterItem) {
      setSelectedMenu(selectedFooterItem.label);
    }
  }, [location, menuItems, footerItems]);

  return (
    <>


      {/* Navbar */}
      <GridItem
        rowSpan={1}
        colSpan={2}
        position={{ base: "fixed", md: "relative" }}
        top={{ base: "0", md: "auto" }}
        left={{ base: "0", md: "auto" }}
        width={{ base: "100%", md: "auto" }}
        zIndex={12}
        bg="Background"
      >
        <Navbar />
      </GridItem>

      {/* Small Sidebar */}
      <GridItem
        rowSpan={0}
        colSpan={0}
        position={{ base: "fixed", md: "relative" }}
        bottom={{ base: "0", md: "auto" }}
        left={{ base: "0", md: "auto" }}
        marginTop={{ base: "0", md: "-100px" }}
        paddingTop={{ base: "0", md: "50px" }}
        width={{ base: "100%", md: "auto" }}
        borderRightWidth={{ base: "0px", md: "1px" }}
        borderTopWidth={{ base: "1px", md: "0px" }}
        h={{ base: "70px", md: "auto" }}
        zIndex="15"
        bg="Background"
      >
        <SmallSidebar
          selectedMenu={selectedMenu}
          menuItems={menuItems}
          footerItems={footerItems}
        />
      </GridItem>
    </>
  );
}
