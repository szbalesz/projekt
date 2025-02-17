import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './menu/Navbar';
import SmallSidebar from './menu/SmallSidebar';
import Sidebar from './menu/Sidebar';
import { GridItem } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuHouse, LuList, LuSearch, LuSettings, LuStar, LuUpload, LuUser, LuUsers, } from 'react-icons/lu';
import Search from './menu/Search';
import Cookies from "js-cookie";

export default function Menu({ themecolor, isLoggedIn, onLogout }) {
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
    { label: "Kezdőlap", icon: <LuHouse />, path: "/" },
    { label: "Kedvencek", icon: <LuStar />, path: "/playlist/Kedvencek" },
    { label: "Lejátszási listák", icon: <LuList />, path: "/playlists" },
    { label: "Zene feltöltés", icon: <LuUpload />, path: "/upload" },
    { label: "Rólunk", icon: <LuUsers />, path: "/about" },
  ], []);

  const [userid, setUserid] = useState("")
  useEffect(() => {
    setUserid(Cookies.get("userid"));
  }, [isLoggedIn])
  
  const profileMenuItems = useMemo(() => [
    { label: "Profil megtekintése", icon: <LuUser />, path: "/user/"+userid },
    { label: "Zene feltöltés", icon: <LuUpload />, path: "/upload" },
    { label: "Beállítások", icon: <LuSettings />, path: "/settings" },
  ], [userid]);

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
    if (selectedMenuItem) {
      setSelectedMenu(selectedMenuItem.label);
    }
    if(currentPath.includes("search")){
      setSelectedMenu("Keresés");
    }
  }, [location, menuItems]);

  return (
    <>
      {/* Sidebar megjelenítése függetlenül a popupoktól */}
      {isSidebarOpen && (
        <Sidebar
          menuItems={menuItems}
          selectedMenu={selectedMenu}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}

       {/* Felugró popupok */}
       {isPopupOpen && popupType === "search" && (
        <Search handlePopupClose={handlePopupClose}/>
      )}

      {/* Navbar */}
      <GridItem
        rowSpan={1}
        colSpan={2}
        position="fixed"
        top="0"
        left="0"
        width="100%"
        zIndex={12}
        bg="Background"
      >
        <Navbar themecolor={themecolor} profileMenuItems={profileMenuItems} setIsSidebarOpen={setIsSidebarOpen} isLoggedIn={isLoggedIn} onLogout={onLogout}/>
      </GridItem>

      {/* Small Sidebar */}
      <GridItem
        rowSpan={0}
        colSpan={0}
        position="fixed"
        bottom={{ base: "-1", md: "auto" }}
        left={{ base: "0", md: "auto" }}
        top={{ base: "auto", md: "0" }}
        width={{ base: "100%", md: "auto" }}
        borderRightWidth={{ base: "0px", md: "1px" }}
        borderTopWidth={{ base: "1px", md: "0px" }}
        h={{ base: "70px", md: "100%" }}
        zIndex={"11"}
        bg="Background"
      >
        <SmallSidebar
          selectedMenu={selectedMenu}
          setIsSidebarOpen={()=> setIsSidebarOpen(true)}
          menuItems={menuItems}
        />
      </GridItem>
    </>
  );
}
