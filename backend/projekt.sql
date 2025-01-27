-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 27. 14:08
-- Kiszolgáló verziója: 10.4.20-MariaDB
-- PHP verzió: 7.3.29

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
  `GUID` varchar(36) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `Felhasznalonev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `Jelszo` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `Teljesnev` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `Email` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `Szuletesdatum` date DEFAULT NULL,
  `Profilkep` longtext COLLATE utf8mb4_hungarian_ci DEFAULT NULL
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
  `GUID` varchar(36) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `FelhasznaloID` varchar(36) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `ListaNev` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL
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
  `ListaID` varchar(36) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `ZeneID` varchar(36) COLLATE utf8mb4_hungarian_ci NOT NULL
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
  `GUID` varchar(36) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `Eloado` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `Cim` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `Kep` longtext COLLATE utf8mb4_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `zene`
--

INSERT INTO `zene` (`GUID`, `Eloado`, `Cim`, `Kep`) VALUES
('10c947c5-d196-11ef-a697-701ab8764395', 'Desh', 'Walkin\' a street', 'https://i.scdn.co/image/ab67616d0000b2737ac1501b2c36c9b4e785f336'),
('12ce675b-af41-11ef-8761-047c16bd83b3', 'Azahriah', 'Cipoe', 'https://img.projektn.sk/wp-static/2024/04/872A49711.jpg'),
('1dc947c5-d196-11ef-a697-701ab8764391', 'KKevin', 'Prosecco', 'https://i.ytimg.com/vi/1uu-TUeNtbk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB4EXHbBMMcvuwi8B6LF1t3jCZa3w'),
('5dc947c5-d196-11ef-a697-701ab8764395', 'Mc Isti', 'A 66 OS ÚT', 'https://i.scdn.co/image/ab67616d0000b273cd78bbcd5556df0518b56749'),
('8492f71a-ee1a-447b-8347-24d0f8adef3e', 'Ariana Grande', '7 Rings', 'https://compote.slate.com/images/6d00a1ad-6b1e-46ec-a06f-f1b3d759f134.jpeg'),
('9ed0973f-536b-4134-8844-16b1cd4efd72', 'Katy Perry', 'Firework', 'https://static.stereogum.com/uploads/2023/08/Katy-Perry-Firework-1692215086.jpeg');

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
