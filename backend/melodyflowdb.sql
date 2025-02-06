-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 06. 21:13
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetroles`
--

CREATE TABLE `aspnetroles` (
  `Id` varchar(255) NOT NULL,
  `Name` varchar(256) DEFAULT NULL,
  `NormalizedName` varchar(256) DEFAULT NULL,
  `ConcurrencyStamp` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserclaims`
--

CREATE TABLE `aspnetuserclaims` (
  `Id` int(11) NOT NULL,
  `UserId` varchar(255) NOT NULL,
  `ClaimType` longtext DEFAULT NULL,
  `ClaimValue` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserlogins`
--

CREATE TABLE `aspnetuserlogins` (
  `LoginProvider` varchar(255) NOT NULL,
  `ProviderKey` varchar(255) NOT NULL,
  `ProviderDisplayName` longtext DEFAULT NULL,
  `UserId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserroles`
--

CREATE TABLE `aspnetuserroles` (
  `UserId` varchar(255) NOT NULL,
  `RoleId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `music`
--

CREATE TABLE `music` (
  `Id` varchar(36) NOT NULL,
  `Artist` varchar(50) DEFAULT NULL,
  `Title` varchar(50) DEFAULT NULL,
  `Image_URL` longtext DEFAULT NULL,
  `Music_URL` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `music`
--

INSERT INTO `music` (`Id`, `Artist`, `Title`, `Image_URL`, `Music_URL`) VALUES
('0e418a2c-bab4-4549-9d4f-7839aa9a9460', 'Ariana Grande', '7 rings', 'https://pyxis.nymag.com/v1/imgs/a61/af6/3fd12792da57d7f85b8fe655c78b7cd76c-23-ariana-grande.rsquare.w400.jpg', '/music/2d98ee0e-baf9-441e-abb5-abc0ac9516a6_Ariana Grande - 7 rings (Official Video).mp3'),
('395bf642-c850-463d-8171-fe129f062275', 'Azahriah', 'cipoe', 'https://i.ytimg.com/vi/d7judDbrovM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB7AxNhC9bF2b6mOll7UhR2xNVNGg', '/music/e50cf012-93be-4df5-8a53-3e9800f1fd29_Azahriah - cipoe.mp3'),
('4d121dca-b04f-4189-a948-6ebb56b0d30b', 'LMEN PRALA', 'A KARRIEREM LESZ*ROM', 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/475429595_1196463745169885_7514113168078260845_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=rDD0JnQiMgwQ7kNvgFYlp_s&_nc_oc=Adgdteh2BOFGOV6CA3OtVOFMhGhDbdSYV6Bf363H_gptWY-3rUooKakDenIdCpnUEZ2HMInRmSthYAOILkYi6NAR&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=AX3kghcoLnACjkxe7DyObzZ&oh=00_AYB3xwIBQbqzr_rOhgDTQQXlKshyxtFajZEl09_w4nFm6Q&oe=67AAD2FA', '/music/83add612-6180-4c49-af2f-84918412c551_LMEN PRALA - A KARRIEREM LESZROM OFFICIAL MUSIC VIDEO  PROD. BY SMITHMUSIX.mp3'),
('507d3e28-551d-43fb-97eb-574b4911c2c7', 'Kkevin', 'Prosecco', 'https://i.ytimg.com/vi/1uu-TUeNtbk/maxresdefault.jpg', '/music/cf7d8fbd-2072-4ed1-8fe8-ef7b6733fddc_KKevin - PROSECCO ft. Bruno (Official Music Video).mp3'),
('a6fee57b-8ac3-4ea1-a036-8714925b4f3a', 'Jaber', 'Milliók', 'https://i.ytimg.com/vi/GVJ6PY2e0fY/maxresdefault.jpg', '/music/cde7a600-37c6-4332-a889-ef4811b6e7e0_JABER X T. Danny - MILLIÓK (Official Music Video).mp3'),
('cc7568b6-f58e-4ab2-aa33-e94bcba38c8f', 'Katy Perry', 'Firework', 'https://static.stereogum.com/uploads/2023/08/Katy-Perry-Firework-1692215086.jpeg', '/music/8e589e6a-881f-4df4-996d-597482f6e185_Katy Perry - Firework (Official Music Video).mp3'),
('f4aa3d71-2a90-4d39-ab08-223f3f4f0fe5', 'Desh', 'Walkin\' A Street', 'https://i.scdn.co/image/ab67616d0000b2737ac1501b2c36c9b4e785f336', '/music/4c74b7c9-ced4-4bc4-9ff0-b43506ae448c_deshwalkinastreet.mp3');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlist`
--

CREATE TABLE `playlist` (
  `Id` varchar(36) NOT NULL,
  `PlaylistName` varchar(50) DEFAULT NULL,
  `Image_URL` longtext NOT NULL
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
  `PlaylistId` varchar(36) NOT NULL,
  `MusicId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `playlist_music`
--

INSERT INTO `playlist_music` (`PlaylistId`, `MusicId`) VALUES
('50c947c5-d196-11ef-a697-701ab8764395', 'f4aa3d71-2a90-4d39-ab08-223f3f4f0fe5');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_playlist`
--

CREATE TABLE `user_playlist` (
  `UserId` varchar(255) NOT NULL,
  `PlaylistId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user_playlist`
--

INSERT INTO `user_playlist` (`UserId`, `PlaylistId`) VALUES
('64db6df7-6cce-4ce9-85fd-f4bc0408cd6b', '50c947c5-d196-11ef-a697-701ab8764395');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
