-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 12. 15:02
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
  `Teljesnev` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Lejatszasilistak` varchar(36) NOT NULL,
  `Szuletesidatum` date NOT NULL,
  `Profilkep` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`GUID`, `Felhasznalonev`, `Jelszo`, `Teljesnev`, `Email`, `Lejatszasilistak`, `Szuletesidatum`, `Profilkep`) VALUES
('2b9fb29b-73d8-4d48-b621-70dec6cecccc', 'vlapwood0', 'bmaccoveney0', 'McIsti', 'fpearlman0@zimbio.com', '33d4fa10-af41-11ef-8761-047c16bd83b3', '2024-06-18', '18X7iSnPrEAg6X56WBNAJ6BZRxN9kK9Uyn');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `lista`
--

CREATE TABLE `lista` (
  `GUID` varchar(36) NOT NULL,
  `ZeneId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `lista`
--

INSERT INTO `lista` (`GUID`, `ZeneId`) VALUES
('33d4fa10-af41-11ef-8761-047c16bd83b3', '12ce675b-af41-11ef-8761-047c16bd83b3');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tartalom`
--

CREATE TABLE `tartalom` (
  `GUID` varchar(36) NOT NULL,
  `Eloado` varchar(50) NOT NULL,
  `Cim` varchar(50) NOT NULL,
  `Kep` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `tartalom`
--

INSERT INTO `tartalom` (`GUID`, `Eloado`, `Cim`, `Kep`) VALUES
('12ce675b-af41-11ef-8761-047c16bd83b3', 'McIsti', 'Picsaszagvan', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPmZClpmfPdwIXFF5b1S5UCaU-uY0xFXSd9w&s');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`GUID`),
  ADD KEY `Lejatszasilistak` (`Lejatszasilistak`);

--
-- A tábla indexei `lista`
--
ALTER TABLE `lista`
  ADD PRIMARY KEY (`GUID`),
  ADD KEY `ZeneId` (`ZeneId`);

--
-- A tábla indexei `tartalom`
--
ALTER TABLE `tartalom`
  ADD PRIMARY KEY (`GUID`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD CONSTRAINT `felhasznalo_ibfk_1` FOREIGN KEY (`Lejatszasilistak`) REFERENCES `lista` (`GUID`);

--
-- Megkötések a táblához `lista`
--
ALTER TABLE `lista`
  ADD CONSTRAINT `lista_ibfk_1` FOREIGN KEY (`ZeneId`) REFERENCES `tartalom` (`GUID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
