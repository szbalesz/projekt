import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './menu/Navbar';
import SmallSidebar from './menu/SmallSidebar';
import Sidebar from './menu/Sidebar';
import { GridItem } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuHome, LuList, LuSearch, LuSettings, LuStar } from 'react-icons/lu';
import Search from './menu/Search';


export default function Menu({ handlePlay }) {
  const [selectedMenu, setSelectedMenu] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Felugró popup állapota
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState(""); // Aktuális popup típusa (pl. search)


  // Sidebar állapota
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Menü elemek
  const menuItems = useMemo(() => [
    { label: "Menü", icon: <LuList /> }, // Sidebar nem tartalmaz path-et
    { label: "Keresés", icon: <LuSearch />, path: "?popup=search" },
    { label: "Kezdőlap", icon: <LuHome />, path: "/" },
    { label: "Kedvencek", icon: <LuStar />, path: "/favorites" },
    { label: "Lejátszási listák", icon: <LuList />, path: "/playlists" },
  ], []);

  const footerItems = useMemo(() => [
    { label: "Beállítások", icon: <LuSettings />, path: "/settings" },
  ], []);

  // Felugró popup bezárása
  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setPopupType("");
    navigate(location.pathname.split('?')[0]); // Törli a query paramétert
  };

  // URL változás figyelése
  useEffect(() => {
    const currentPath = location.pathname + location.search;
    const popupParam = new URLSearchParams(location.search).get("popup");

    if (popupParam) {
      setIsPopupOpen(true);
      setPopupType(popupParam);
    } else {
      setIsPopupOpen(false);
      setPopupType("");
    }
  
    // Kijelölt menüpont beállítása
    const selectedMenuItem = menuItems.find(item => item.path === currentPath.split('?')[0]);
    const selectedFooterItem = footerItems.find(item => item.path === currentPath);
    if (selectedMenuItem) {
      setSelectedMenu(selectedMenuItem.label);
    }
    if (selectedFooterItem) {
      setSelectedMenu(selectedFooterItem.label);
    }
    if(currentPath.includes("search")){
      setSelectedMenu("Keresés");
    }
  }, [location, menuItems, footerItems]);

  return (
    <>
      {/* Sidebar megjelenítése függetlenül a popupoktól */}
      {isSidebarOpen && (
        <Sidebar
          menuItems={menuItems}
          footerItems={footerItems}
          selectedMenu={selectedMenu}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}

       {/* Felugró popupok */}
       {isPopupOpen && popupType === "search" && (
        <Search handlePlay={handlePlay} handlePopupClose={handlePopupClose}/>
      )}

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
          setIsSidebarOpen={()=> setIsSidebarOpen(true)}
          menuItems={menuItems}
          footerItems={footerItems}
        />
      </GridItem>
    </>
  );
}
