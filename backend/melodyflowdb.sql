-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 04. 13:02
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
-- Adatbázis: `melodyflowdb`
--
CREATE DATABASE IF NOT EXISTS `melodyflowdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `melodyflowdb`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetroleclaims`
--

CREATE TABLE `aspnetroleclaims` (
  `Id` int(11) NOT NULL,
  `RoleId` varchar(255) NOT NULL,
  `ClaimType` longtext DEFAULT NULL,
  `ClaimValue` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetroles`
--

CREATE TABLE `aspnetroles` (
  `Id` varchar(255) NOT NULL,
  `Name` varchar(256) DEFAULT NULL,
  `NormalizedName` varchar(256) DEFAULT NULL,
  `ConcurrencyStamp` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserclaims`
--

CREATE TABLE `aspnetuserclaims` (
  `Id` int(11) NOT NULL,
  `UserId` varchar(255) NOT NULL,
  `ClaimType` longtext DEFAULT NULL,
  `ClaimValue` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserlogins`
--

CREATE TABLE `aspnetuserlogins` (
  `LoginProvider` varchar(255) NOT NULL,
  `ProviderKey` varchar(255) NOT NULL,
  `ProviderDisplayName` longtext DEFAULT NULL,
  `UserId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserroles`
--

CREATE TABLE `aspnetuserroles` (
  `UserId` varchar(255) NOT NULL,
  `RoleId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetusers`
--

CREATE TABLE `aspnetusers` (
  `Id` varchar(255) NOT NULL,
  `Fullname` longtext DEFAULT NULL,
  `BirthDate` datetime(6) NOT NULL,
  `ProfilePictureURL` longtext DEFAULT NULL,
  `UserName` varchar(256) DEFAULT NULL,
  `NormalizedUserName` varchar(256) DEFAULT NULL,
  `Email` varchar(256) DEFAULT NULL,
  `NormalizedEmail` varchar(256) DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` longtext DEFAULT NULL,
  `SecurityStamp` longtext DEFAULT NULL,
  `ConcurrencyStamp` longtext DEFAULT NULL,
  `PhoneNumber` longtext DEFAULT NULL,
  `PhoneNumberConfirmed` tinyint(1) NOT NULL,
  `TwoFactorEnabled` tinyint(1) NOT NULL,
  `LockoutEnd` datetime DEFAULT NULL,
  `LockoutEnabled` tinyint(1) NOT NULL,
  `AccessFailedCount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `aspnetusers`
--

INSERT INTO `aspnetusers` (`Id`, `Fullname`, `BirthDate`, `ProfilePictureURL`, `UserName`, `NormalizedUserName`, `Email`, `NormalizedEmail`, `EmailConfirmed`, `PasswordHash`, `SecurityStamp`, `ConcurrencyStamp`, `PhoneNumber`, `PhoneNumberConfirmed`, `TwoFactorEnabled`, `LockoutEnd`, `LockoutEnabled`, `AccessFailedCount`) VALUES
('64db6df7-6cce-4ce9-85fd-f4bc0408cd6b', NULL, '2005-02-04 10:49:16.998000', NULL, 'valami', 'VALAMI', 'valami@gmail.com', 'VALAMI@GMAIL.COM', 0, 'AQAAAAIAAYagAAAAEAdU3dAIQMArCuRipO/x9ly+H9WED+58fCFR9aJ/VhXU8/aRadLvkr15VjwfZQWjlg==', 'TODNZTHGQEOKCION2BRQJ65RLM44LQ2P', '318ae2cd-5206-411f-97f1-57fd59757dc6', '06703870023', 0, 0, NULL, 1, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetusertokens`
--

CREATE TABLE `aspnetusertokens` (
  `UserId` varchar(255) NOT NULL,
  `LoginProvider` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Value` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `music`
--

CREATE TABLE `music` (
  `Id` varchar(36) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `Artist` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `Title` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `Image_URL` longtext COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `Music_URL` longtext COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `music`
--

INSERT INTO `music` (`Id`, `Artist`, `Title`, `Image_URL`, `Music_URL`) VALUES
('10c947c5-d196-11ef-a697-701ab8764395', 'Desh', 'Walkin\' A Street', 'https://i.scdn.co/image/ab67616d0000b2737ac1501b2c36c9b4e785f336', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlist`
--

CREATE TABLE `playlist` (
  `Id` varchar(36) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `PlaylistName` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `Image_URL` longtext COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `playlist`
--

INSERT INTO `playlist` (`Id`, `PlaylistName`, `Image_URL`) VALUES
('50c947c5-d196-11ef-a697-701ab8764395', 'Kedvencek', 'https://t3.ftcdn.net/jpg/04/62/60/80/360_F_462608080_J2AJrf8h0fmbFqnTVUQfza8JivYOfShz.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlist_music`
--

CREATE TABLE `playlist_music` (
  `PlaylistId` varchar(36) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `MusicId` varchar(36) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `playlist_music`
--

INSERT INTO `playlist_music` (`PlaylistId`, `MusicId`) VALUES
('50c947c5-d196-11ef-a697-701ab8764395', '10c947c5-d196-11ef-a697-701ab8764395');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_playlist`
--

CREATE TABLE `user_playlist` (
  `UserId` varchar(255) NOT NULL,
  `PlaylistId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20250204093340_CreateDb', '8.0.12');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_AspNetRoleClaims_RoleId` (`RoleId`);

--
-- A tábla indexei `aspnetroles`
--
ALTER TABLE `aspnetroles`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `RoleNameIndex` (`NormalizedName`);

--
-- A tábla indexei `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_AspNetUserClaims_UserId` (`UserId`);

--
-- A tábla indexei `aspnetuserlogins`
--
ALTER TABLE `aspnetuserlogins`
  ADD PRIMARY KEY (`LoginProvider`,`ProviderKey`),
  ADD KEY `IX_AspNetUserLogins_UserId` (`UserId`);

--
-- A tábla indexei `aspnetuserroles`
--
ALTER TABLE `aspnetuserroles`
  ADD PRIMARY KEY (`UserId`,`RoleId`),
  ADD KEY `IX_AspNetUserRoles_RoleId` (`RoleId`);

--
-- A tábla indexei `aspnetusers`
--
ALTER TABLE `aspnetusers`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `UserNameIndex` (`NormalizedUserName`),
  ADD KEY `EmailIndex` (`NormalizedEmail`),
  ADD KEY `Id` (`Id`);

--
-- A tábla indexei `aspnetusertokens`
--
ALTER TABLE `aspnetusertokens`
  ADD PRIMARY KEY (`UserId`,`LoginProvider`,`Name`);

--
-- A tábla indexei `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id` (`Id`);

--
-- A tábla indexei `playlist_music`
--
ALTER TABLE `playlist_music`
  ADD PRIMARY KEY (`PlaylistId`,`MusicId`),
  ADD KEY `MusicId` (`MusicId`);

--
-- A tábla indexei `user_playlist`
--
ALTER TABLE `user_playlist`
  ADD PRIMARY KEY (`UserId`,`PlaylistId`),
  ADD KEY `PlaylistId` (`PlaylistId`),
  ADD KEY `UserId` (`UserId`);

--
-- A tábla indexei `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  ADD CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  ADD CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetuserlogins`
--
ALTER TABLE `aspnetuserlogins`
  ADD CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetuserroles`
--
ALTER TABLE `aspnetuserroles`
  ADD CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetusertokens`
--
ALTER TABLE `aspnetusertokens`
  ADD CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `playlist_music`
--
ALTER TABLE `playlist_music`
  ADD CONSTRAINT `playlist_music_ibfk_1` FOREIGN KEY (`MusicId`) REFERENCES `music` (`Id`),
  ADD CONSTRAINT `playlist_music_ibfk_2` FOREIGN KEY (`PlaylistId`) REFERENCES `playlist` (`Id`);

--
-- Megkötések a táblához `user_playlist`
--
ALTER TABLE `user_playlist`
  ADD CONSTRAINT `user_playlist_ibfk_1` FOREIGN KEY (`PlaylistId`) REFERENCES `playlist` (`Id`),
  ADD CONSTRAINT `user_playlist_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
