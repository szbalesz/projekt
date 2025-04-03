-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 03. 07:48
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

--
-- A tábla adatainak kiíratása `aspnetroles`
--

INSERT INTO `aspnetroles` (`Id`, `Name`, `NormalizedName`, `ConcurrencyStamp`) VALUES
('04fb29d9-7876-44fa-98ba-361739e22551', 'Admin', 'ADMIN', NULL),
('54bad147-8c93-4ce2-aaa2-6f26142e293a', 'Prémium', 'PRÉMIUM', NULL);

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

--
-- A tábla adatainak kiíratása `aspnetuserroles`
--

INSERT INTO `aspnetuserroles` (`UserId`, `RoleId`) VALUES
('2337dcb3-fee0-4dfe-9c45-b2110a4b2bbe', '04fb29d9-7876-44fa-98ba-361739e22551'),
('64db6df7-6cce-4ce9-85fd-f4bc0408cd6b', '04fb29d9-7876-44fa-98ba-361739e22551'),
('e291ac04-dc42-43fb-872b-d7c50c53ea97', '54bad147-8c93-4ce2-aaa2-6f26142e293a');

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
('2337dcb3-fee0-4dfe-9c45-b2110a4b2bbe', NULL, '2025-02-04 13:22:44.891000', 'https://assistanteplus.fr/wp-content/uploads/2022/04/chat-midjourney.webp', 'szbalesz', 'SZBALESZ', 'baleszvagyok7000@gmail.com', 'BALESZVAGYOK7000@GMAIL.COM', 0, 'AQAAAAIAAYagAAAAEJIs2bZrslR8se0HnZieNzOWL+eRkk3H9aKczr5aZiKXllZolt5NxL4vkCL14OfQuA==', 'EUAON7JOZ7HWE7KRIU34NQS56P6P6CPF', 'ae26e96b-eb3e-44e0-8a0f-ae89bafef8c6', '06301234567', 0, 0, NULL, 1, 0),
('64db6df7-6cce-4ce9-85fd-f4bc0408cd6b', NULL, '2005-02-04 10:49:16.998000', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0a135511-f80b-402a-a20c-65ac4a4e04ae/d9zsqmu-3a80d38d-019b-4798-b6b2-35a507f1a146.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBhMTM1NTExLWY4MGItNDAyYS1hMjBjLTY1YWM0YTRlMDRhZVwvZDl6c3FtdS0zYTgwZDM4ZC0wMTliLTQ3OTgtYjZiMi0zNWE1MDdmMWExNDYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.CDXZOToellxEzIUmyfIrvdQ0RskboukkVMb65RYhJZA', 'adminuser', 'ADMINUSER', 'valami@gmail.com', 'VALAMI@GMAIL.COM', 0, 'AQAAAAIAAYagAAAAEAdU3dAIQMArCuRipO/x9ly+H9WED+58fCFR9aJ/VhXU8/aRadLvkr15VjwfZQWjlg==', 'TODNZTHGQEOKCION2BRQJ65RLM44LQ2P', '0a69e7de-6101-4105-ae3d-86875b40750b', '06703870023', 0, 0, NULL, 1, 0),
('e291ac04-dc42-43fb-872b-d7c50c53ea97', NULL, '2025-02-04 13:22:44.891000', 'https://media.port.hu/images/000/066/567.jpg', 'BidamBidam', 'BIDAMBIDAM', 'BidamBidam@gmail.com', 'BIDAMBIDAM@GMAIL.COM', 0, 'AQAAAAIAAYagAAAAEAXC2+24V4Hy6Rm9wT2xyoUwRikE27rVQ/ZwEBLwFCfZSL8zyoKMNtGp/eeZIIes/w==', '3ZXWSES5WYYDLIS3E22UGU4LHXEUTMAZ', '7367a81f-d003-45fb-bdf6-ca974e031039', '06301234567', 0, 0, NULL, 1, 0);

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
  `Music_URL` longtext COLLATE utf8mb4_hungarian_ci NOT NULL,
  `UploaderId` varchar(255) CHARACTER SET utf8mb4 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `music`
--

INSERT INTO `music` (`Id`, `Artist`, `Title`, `Image_URL`, `Music_URL`, `UploaderId`) VALUES
('1204303a-3d41-498d-8380-3b3d72590620', 'Benson Boone', 'Beautiful Things', 'https://i.ytimg.com/vi/Oa_RSwwpPaA/maxresdefault.jpg', '/music/81f743f6-a04e-4ccb-b525-c860e703cae9_Benson Boone - Beautiful Things (Official Music Video).mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('395bf642-c850-463d-8171-fe129f062275', 'Azahriah', 'cipoe', 'https://i.ytimg.com/vi/d7judDbrovM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB7AxNhC9bF2b6mOll7UhR2xNVNGg', '/music/e50cf012-93be-4df5-8a53-3e9800f1fd29_Azahriah - cipoe.mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('42b5b3b2-2bc1-43ad-bc31-78d6f2adc613', 'Farkas Pisti x Bódi Csabi ', 'SZERELEM', 'https://i.ytimg.com/vi/l-NMUDfX-7Q/maxresdefault.jpg', '/music/8995a895-76bb-4f85-8466-3ecb9f44ec04_Farkas Pisti x Bódi Csabi - SZERELEM  (hivatalos videoklip).mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('4d121dca-b04f-4189-a948-6ebb56b0d30b', 'LMEN PRALA', 'A KARRIEREM LESZ*ROM', 'https://i.ytimg.com/vi/YHc6lKogw7s/maxresdefault.jpg', '/music/83add612-6180-4c49-af2f-84918412c551_LMEN PRALA - A KARRIEREM LESZROM OFFICIAL MUSIC VIDEO  PROD. BY SMITHMUSIX.mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('507d3e28-551d-43fb-97eb-574b4911c2c7', 'Kkevin', 'Prosecco', 'https://i.ytimg.com/vi/1uu-TUeNtbk/maxresdefault.jpg', '/music/cf7d8fbd-2072-4ed1-8fe8-ef7b6733fddc_KKevin - PROSECCO ft. Bruno (Official Music Video).mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('53bb8b6d-ef7e-4413-b74b-cbe957d586eb', 'KKevin', 'PATKÁNY ', 'https://i.ytimg.com/vi/nbSpo4NPb_8/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGH8gSygrMA8=&rs=AOn4CLA0hRyxfjkfWsQd-zyYPWVi10uF8A', '/music/a16f4de7-8550-4df9-9845-9a1e36565dce_KKevin - PATKÁNY (OFFICIAL VISUALIZER).mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('5937082a-9bc7-42a7-8af5-54ef3be9f1f8', 'Fehér Krisztián', 'Így jártam', 'https://i.ytimg.com/vi/jTbgChibXgY/maxresdefault.jpg', '/music/7aa86b41-4d5a-40f8-a7e1-9978bfd11e7c_Feher Krisztian - Így jártam (Official Music Video).mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('7e691cc8-85f0-46f8-803c-c624058127c7', 'Billie Eilish ', 'BIRDS OF A FEATHER ', 'https://i.ytimg.com/vi/d5gf9dXbPi0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBQ2XWSoQs4bSVBZeF4-DPBrqHVbw', '/music/bfa2e020-3511-4e8c-9f84-9ab24cc687b4_Billie Eilish - BIRDS OF A FEATHER (Official Music Video).mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('8677ae83-03ff-4379-b0d3-f5b3aa0789f4', 'Manuel', 'Para ', 'https://images.genius.com/86d3976c320879d6d621c01f2deca318.1000x1000x1.jpg', '/music/1502cc33-971f-4ca8-a589-bf8efdbdd8ec_Manuel - Para (Official Lyrics Video).mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('a1bd955f-4e86-4ea8-a15a-fb135aaf9b09', 'Lady Gaga x Bruno Mars ', 'Die With A Smile', 'https://i.discogs.com/C7lXx2701Ma_N_-v9eHZazO0XKbl8cb1QomGrYifwqE/rs:fit/g:sm/q:90/h:596/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTMxNTI2/NTkxLTE3MjQyNzM3/NzctODQzNS5qcGVn.jpeg', '/music/d1d61de2-2462-443f-8c86-a0efc5dd4c65_Lady Gaga, Bruno Mars - Die With A Smile (Official Music Video) (1).mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('a6fee57b-8ac3-4ea1-a036-8714925b4f3a', 'Jaber', 'Milliók', 'https://i.ytimg.com/vi/GVJ6PY2e0fY/maxresdefault.jpg', '/music/cde7a600-37c6-4332-a889-ef4811b6e7e0_JABER X T. Danny - MILLIÓK (Official Music Video).mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('ab3cb451-56ec-4534-a57c-d99291b4089f', 'Burai x Fehér Krisztián x Mario feat. Essemm ', 'BarnaLány', 'https://i.ytimg.com/vi/sUI0OmhpCAA/sddefault.jpg?v=67a3496f', '/music/d48de4a3-13e9-43b5-be38-7e1e1b7d3fa3_Burai, Fehér Krisztián, Mario feat. Essemm - BarnaLány.mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('ac073a3b-1687-4d5b-a333-5c44b3242884', 'JABER ft. Sean Price', 'Isten Vezet', 'https://i.scdn.co/image/ab67616d0000b2732a78a25742297273aa73c35d', '/music/8eefcd7c-014c-47d5-9adf-6e2f222f8d1b_JABER - Isten Vezet (ft. Sean Price).mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('b329cd77-ffe7-4252-a82d-761a0b0391ae', 'The Weeknd', 'Save Your Tears', 'https://uproxx.com/wp-content/uploads/2021/01/the-weeknd-save-your-tears-video-grid-1.jpg?w=710', '/music/0859b03c-fb8b-419e-9d1e-a6f66332d07c_The Weeknd - Save Your Tears (Official Music Video).mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('c1563ca2-177b-4df1-9ea7-cbcabf572abb', 'Kendrick Lamar', 'Not Like Us', 'https://i.ytimg.com/vi/H58vbez_m4E/maxresdefault.jpg', '/music/0c3e50a4-6c2e-4c03-b795-b1fb797c7ddb_Kendrick Lamar - Not Like Us.mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('c965e8c2-4e89-4814-adf2-2eb7af633d6a', 'Kendrick Lamar', 'luther', 'https://i1.sndcdn.com/artworks-y6WaHzlvp7PbwkLT-JlZicw-t500x500.png', '/music/811d4a92-72bf-4ffc-a356-9c012d0dda7d_Kendrick Lamar - luther (Official Audio).mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('ca21bd7c-024b-44a7-8d7f-9c3c89dc5fad', 'Lady Gaga', 'Abracadabra', 'https://media.pitchfork.com/photos/67a0394758a145a55f221e18/4:3/w_2279,h_1710,c_limit/Lady-Gaga-Abracadabra.jpg', '/music/a5f28d33-4e77-4fca-b93e-c62c84f40607_Lady Gaga - Abracadabra (Official Music Video).mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('cc7568b6-f58e-4ab2-aa33-e94bcba38c8f', 'Katy Perry', 'Firework', 'https://static.stereogum.com/uploads/2023/08/Katy-Perry-Firework-1692215086.jpeg', '/music/8e589e6a-881f-4df4-996d-597482f6e185_Katy Perry - Firework (Official Music Video).mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('d1b1d957-d902-4b31-a540-8add2ed8369d', 'ROSÉ & Bruno Mars', 'APT.', 'https://assets.vogue.com/photos/6711add38aadbe35741c4051/master/w_2560%2Cc_limit/_APT._%2520main%2520image%2520-%2520credit%2520John%2520V.%2520Esparza%2520-%2520embargoed%2520until%252012A%2520EST%2520OCT%252018.jpg', '/music/c94b7531-9476-426f-9813-6f11d586c857_ROSE & Bruno Mars - APT. (Official Music Video).mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('e54e5b95-25a5-494e-8ebe-812fd26e07ed', 'L.L. Junior x Azahriah (feat. Farkas Pisti)', 'ZHA MAJ DUR', 'https://i.ytimg.com/vi/7Ju4V4xPXSs/sddefault.jpg?v=67af390e', '/music/d4f0cf18-5a86-4481-86c9-bc711d6519e7_L.L. Junior x Azahriah (feat. Farkas Pisti) - ZHA MAJ DUR (Official Music Video).mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('f4aa3d71-2a90-4d39-ab08-223f3f4f0fe5', 'Desh', 'Walkin\' A Street', 'https://i.scdn.co/image/ab67616d0000b2737ac1501b2c36c9b4e785f336', '/music/4c74b7c9-ced4-4bc4-9ff0-b43506ae448c_deshwalkinastreet.mp3', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlist`
--

CREATE TABLE `playlist` (
  `Id` varchar(36) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `PlaylistName` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `Image_URL` longtext COLLATE utf8mb4_hungarian_ci NOT NULL,
  `CreatorId` varchar(255) CHARACTER SET utf8mb4 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `playlist`
--

INSERT INTO `playlist` (`Id`, `PlaylistName`, `Image_URL`, `CreatorId`) VALUES
('743ec982-f0c9-4192-904f-085f4f3116ec', 'Magyar', 'https://images.saymedia-content.com/.image/t_share/MTc0OTkxNjA0ODg3NzI2MDQ4/the-changing-face-of-michael-jackson.jpg', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('91e4600b-d0ca-4314-8f38-00209a76a439', 'Külföldi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSumnVKDq0NjiijYRcMyUitJ9xPtWKc05hwyA&s', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('b4863cbf-0a6a-4051-a4db-2627c8541843', 'ASDSADsa', 'https://t3.ftcdn.net/jpg/04/62/60/80/360_F_462608080_J2AJrf8h0fmbFqnTVUQfza8JivYOfShz.jpg', '2337dcb3-fee0-4dfe-9c45-b2110a4b2bbe'),
('c091ac43-aa24-458a-91b6-455571f7b984', 'Kedvencek', 'https://t3.ftcdn.net/jpg/04/62/60/80/360_F_462608080_J2AJrf8h0fmbFqnTVUQfza8JivYOfShz.jpg', '2337dcb3-fee0-4dfe-9c45-b2110a4b2bbe'),
('d6322b24-6ca0-4976-9d4c-7a135f2ef3c6', 'Kedvencek', 'https://t3.ftcdn.net/jpg/04/62/60/80/360_F_462608080_J2AJrf8h0fmbFqnTVUQfza8JivYOfShz.jpg', '64db6df7-6cce-4ce9-85fd-f4bc0408cd6b'),
('df7414f2-978e-4b95-baf6-42e7911d9767', 'Kedvencek', 'https://t3.ftcdn.net/jpg/04/62/60/80/360_F_462608080_J2AJrf8h0fmbFqnTVUQfza8JivYOfShz.jpg', 'e291ac04-dc42-43fb-872b-d7c50c53ea97');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlistmusic`
--

CREATE TABLE `playlistmusic` (
  `PlaylistId` varchar(36) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `MusicId` varchar(36) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `playlistmusic`
--

INSERT INTO `playlistmusic` (`PlaylistId`, `MusicId`) VALUES
('743ec982-f0c9-4192-904f-085f4f3116ec', '395bf642-c850-463d-8171-fe129f062275'),
('743ec982-f0c9-4192-904f-085f4f3116ec', '42b5b3b2-2bc1-43ad-bc31-78d6f2adc613'),
('743ec982-f0c9-4192-904f-085f4f3116ec', '4d121dca-b04f-4189-a948-6ebb56b0d30b'),
('743ec982-f0c9-4192-904f-085f4f3116ec', '507d3e28-551d-43fb-97eb-574b4911c2c7'),
('743ec982-f0c9-4192-904f-085f4f3116ec', '53bb8b6d-ef7e-4413-b74b-cbe957d586eb'),
('743ec982-f0c9-4192-904f-085f4f3116ec', '5937082a-9bc7-42a7-8af5-54ef3be9f1f8'),
('743ec982-f0c9-4192-904f-085f4f3116ec', '8677ae83-03ff-4379-b0d3-f5b3aa0789f4'),
('743ec982-f0c9-4192-904f-085f4f3116ec', 'a6fee57b-8ac3-4ea1-a036-8714925b4f3a'),
('743ec982-f0c9-4192-904f-085f4f3116ec', 'ab3cb451-56ec-4534-a57c-d99291b4089f'),
('743ec982-f0c9-4192-904f-085f4f3116ec', 'ac073a3b-1687-4d5b-a333-5c44b3242884'),
('743ec982-f0c9-4192-904f-085f4f3116ec', 'e54e5b95-25a5-494e-8ebe-812fd26e07ed'),
('743ec982-f0c9-4192-904f-085f4f3116ec', 'f4aa3d71-2a90-4d39-ab08-223f3f4f0fe5'),
('91e4600b-d0ca-4314-8f38-00209a76a439', '1204303a-3d41-498d-8380-3b3d72590620'),
('91e4600b-d0ca-4314-8f38-00209a76a439', '7e691cc8-85f0-46f8-803c-c624058127c7'),
('91e4600b-d0ca-4314-8f38-00209a76a439', 'a1bd955f-4e86-4ea8-a15a-fb135aaf9b09'),
('91e4600b-d0ca-4314-8f38-00209a76a439', 'b329cd77-ffe7-4252-a82d-761a0b0391ae'),
('91e4600b-d0ca-4314-8f38-00209a76a439', 'c1563ca2-177b-4df1-9ea7-cbcabf572abb'),
('91e4600b-d0ca-4314-8f38-00209a76a439', 'c965e8c2-4e89-4814-adf2-2eb7af633d6a'),
('91e4600b-d0ca-4314-8f38-00209a76a439', 'ca21bd7c-024b-44a7-8d7f-9c3c89dc5fad'),
('91e4600b-d0ca-4314-8f38-00209a76a439', 'cc7568b6-f58e-4ab2-aa33-e94bcba38c8f'),
('91e4600b-d0ca-4314-8f38-00209a76a439', 'd1b1d957-d902-4b31-a540-8add2ed8369d'),
('c091ac43-aa24-458a-91b6-455571f7b984', '507d3e28-551d-43fb-97eb-574b4911c2c7'),
('d6322b24-6ca0-4976-9d4c-7a135f2ef3c6', '507d3e28-551d-43fb-97eb-574b4911c2c7'),
('d6322b24-6ca0-4976-9d4c-7a135f2ef3c6', '53bb8b6d-ef7e-4413-b74b-cbe957d586eb'),
('d6322b24-6ca0-4976-9d4c-7a135f2ef3c6', 'ab3cb451-56ec-4534-a57c-d99291b4089f'),
('df7414f2-978e-4b95-baf6-42e7911d9767', '4d121dca-b04f-4189-a948-6ebb56b0d30b');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `userplaylist`
--

CREATE TABLE `userplaylist` (
  `UserId` varchar(255) NOT NULL,
  `PlaylistId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `userplaylist`
--

INSERT INTO `userplaylist` (`UserId`, `PlaylistId`) VALUES
('2337dcb3-fee0-4dfe-9c45-b2110a4b2bbe', 'b4863cbf-0a6a-4051-a4db-2627c8541843'),
('2337dcb3-fee0-4dfe-9c45-b2110a4b2bbe', 'c091ac43-aa24-458a-91b6-455571f7b984'),
('64db6df7-6cce-4ce9-85fd-f4bc0408cd6b', '743ec982-f0c9-4192-904f-085f4f3116ec'),
('64db6df7-6cce-4ce9-85fd-f4bc0408cd6b', '91e4600b-d0ca-4314-8f38-00209a76a439'),
('64db6df7-6cce-4ce9-85fd-f4bc0408cd6b', 'd6322b24-6ca0-4976-9d4c-7a135f2ef3c6'),
('e291ac04-dc42-43fb-872b-d7c50c53ea97', 'df7414f2-978e-4b95-baf6-42e7911d9767');

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
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UploaderId` (`UploaderId`);

--
-- A tábla indexei `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id` (`Id`),
  ADD KEY `CreatorId` (`CreatorId`);

--
-- A tábla indexei `playlistmusic`
--
ALTER TABLE `playlistmusic`
  ADD PRIMARY KEY (`PlaylistId`,`MusicId`),
  ADD KEY `PlaylistId` (`PlaylistId`,`MusicId`),
  ADD KEY `MusicId` (`MusicId`);

--
-- A tábla indexei `userplaylist`
--
ALTER TABLE `userplaylist`
  ADD PRIMARY KEY (`UserId`,`PlaylistId`),
  ADD KEY `UserId` (`UserId`,`PlaylistId`),
  ADD KEY `PlaylistId` (`PlaylistId`);

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
-- Megkötések a táblához `music`
--
ALTER TABLE `music`
  ADD CONSTRAINT `music_ibfk_1` FOREIGN KEY (`UploaderId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `playlist`
--
ALTER TABLE `playlist`
  ADD CONSTRAINT `playlist_ibfk_1` FOREIGN KEY (`CreatorId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `playlistmusic`
--
ALTER TABLE `playlistmusic`
  ADD CONSTRAINT `playlistmusic_ibfk_1` FOREIGN KEY (`MusicId`) REFERENCES `music` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `playlistmusic_ibfk_2` FOREIGN KEY (`PlaylistId`) REFERENCES `playlist` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `userplaylist`
--
ALTER TABLE `userplaylist`
  ADD CONSTRAINT `userplaylist_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `userplaylist_ibfk_2` FOREIGN KEY (`PlaylistId`) REFERENCES `playlist` (`Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
