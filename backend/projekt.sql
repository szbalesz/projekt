-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 17. 18:08
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `projekt`
--
CREATE DATABASE IF NOT EXISTS `projekt` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `projekt`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `GUID` varchar(36) NOT NULL,
  `Felhasznalonev` varchar(50) NOT NULL,
  `Jelszo` varchar(50) NOT NULL,
  `Teljesnev` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Szuletesdatum` date DEFAULT NULL,
  `Profilkep` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`GUID`, `Felhasznalonev`, `Jelszo`, `Teljesnev`, `Email`, `Szuletesdatum`, `Profilkep`) VALUES
('2b9fb29b-73d8-4d48-b621-70dec6cecccc', 'Isti', 'bmaccoveney0', 'McIsti', 'fpearlman0@zimbio.com', '2024-06-18', 'https://i.scdn.co/image/ab6761610000e5eb647202030fc53a44ecea960d'),
('5c34221b-73d8-4d48-b621-70dec6cedddd', 'Józsi', 'bmaccoveney0313113', 'McIsti2311', 'fpearlman0@zimbio.com131313', '2024-06-18', 'https://i.scdn.co/image/ab6761610000e5eb647202030fc53a44ecea960d');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `lejátszasi_lista`
--

CREATE TABLE `lejátszasi_lista` (
  `GUID` varchar(36) NOT NULL,
  `FelhasznaloID` varchar(36) NOT NULL,
  `ListaNev` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `lejátszasi_lista`
--

INSERT INTO `lejátszasi_lista` (`GUID`, `FelhasznaloID`, `ListaNev`) VALUES
('33d4fa10-af41-11ef-8761-047c16bd83b3', '2b9fb29b-73d8-4d48-b621-70dec6cecccc', 'Kedvencek'),
('44d4fa10-af41-11ef-8761-047c16bd83b4', '2b9fb29b-73d8-4d48-b621-70dec6cecccc', 'Népszerű'),
('66d4fa10-af41-11ef-8761-047c16bd83b4', '2b9fb29b-73d8-4d48-b621-70dec6cecccc', 'Felkapott');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `lista_zene`
--

CREATE TABLE `lista_zene` (
  `ListaID` varchar(36) NOT NULL,
  `ZeneID` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `lista_zene`
--

INSERT INTO `lista_zene` (`ListaID`, `ZeneID`) VALUES
('33d4fa10-af41-11ef-8761-047c16bd83b3', '12ce675b-af41-11ef-8761-047c16bd83b3'),
('33d4fa10-af41-11ef-8761-047c16bd83b3', '5dc947c5-d196-11ef-a697-701ab8764395'),
('44d4fa10-af41-11ef-8761-047c16bd83b4', '1dc947c5-d196-11ef-a697-701ab8764391'),
('66d4fa10-af41-11ef-8761-047c16bd83b4', '10c947c5-d196-11ef-a697-701ab8764395');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `zene`
--

CREATE TABLE `zene` (
  `GUID` varchar(36) NOT NULL,
  `Eloado` varchar(50) DEFAULT NULL,
  `Cim` varchar(50) DEFAULT NULL,
  `Kep` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `zene`
--

INSERT INTO `zene` (`GUID`, `Eloado`, `Cim`, `Kep`) VALUES
('10c947c5-d196-11ef-a697-701ab8764395', 'MCISTI22', 'ASIDUIHASKDL', 'https://i.ytimg.com/vi/dVe6Tn4kV9s/hqdefault.jpg'),
('12ce675b-af41-11ef-8761-047c16bd83b3', 'Azahriah', 'SZIA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPmZClpmfPdwIXFF5b1S5UCaU-uY0xFXSd9w&s'),
('1dc947c5-d196-11ef-a697-701ab8764391', 'MCISTI', 'ASJDSAK', 'https://f4.bcbits.com/img/a0466831023_65'),
('5dc947c5-d196-11ef-a697-701ab8764395', 'MCISTI2', 'Fekália', 'https://f4.bcbits.com/img/a0466831023_65');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`GUID`);

--
-- A tábla indexei `lejátszasi_lista`
--
ALTER TABLE `lejátszasi_lista`
  ADD PRIMARY KEY (`GUID`),
  ADD KEY `FelhasznaloID` (`FelhasznaloID`);

--
-- A tábla indexei `lista_zene`
--
ALTER TABLE `lista_zene`
  ADD PRIMARY KEY (`ListaID`,`ZeneID`),
  ADD KEY `ZeneID` (`ZeneID`);

--
-- A tábla indexei `zene`
--
ALTER TABLE `zene`
  ADD PRIMARY KEY (`GUID`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `lejátszasi_lista`
--
ALTER TABLE `lejátszasi_lista`
  ADD CONSTRAINT `lejátszasi_lista_ibfk_1` FOREIGN KEY (`FelhasznaloID`) REFERENCES `felhasznalo` (`GUID`) ON DELETE CASCADE;

--
-- Megkötések a táblához `lista_zene`
--
ALTER TABLE `lista_zene`
  ADD CONSTRAINT `lista_zene_ibfk_1` FOREIGN KEY (`ListaID`) REFERENCES `lejátszasi_lista` (`GUID`) ON DELETE CASCADE,
  ADD CONSTRAINT `lista_zene_ibfk_2` FOREIGN KEY (`ZeneID`) REFERENCES `zene` (`GUID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
