CREATE TABLE `felhasznalo` (
  `GUID` varchar(36) PRIMARY KEY NOT NULL,
  `Felhasznalonev` varchar(50) NOT NULL,
  `Jelszo` varchar(50) NOT NULL,
  `Teljesnev` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Lejatszasilistak` varchar(36) NOT NULL,
  `Szuletesidatum` date NOT NULL,
  `Profilkep` longtext NOT NULL
);

CREATE TABLE `tartalom` (
  `GUID` varchar(36) PRIMARY KEY NOT NULL,
  `Eloado` varchar(50) NOT NULL,
  `Cim` varchar(50) NOT NULL,
  `Kep` longtext NOT NULL
);

CREATE TABLE `lista` (
  `GUID` varchar(36) PRIMARY KEY NOT NULL,
  `ZeneId` varchar(36) NOT NULL
);

ALTER TABLE `felhasznalo` ADD FOREIGN KEY (`Lejatszasilistak`) REFERENCES `lista` (`GUID`);

ALTER TABLE `lista` ADD FOREIGN KEY (`ZeneId`) REFERENCES `tartalom` (`GUID`);
