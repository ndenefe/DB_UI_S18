-- MySQL Script generated by MySQL Workbench
-- Mon 26 Mar 2018 11:02:37 AM CDT
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema DB_Lab
-- -----------------------------------------------------
-- This is a base mockup for sprint 1

-- -----------------------------------------------------
-- Schema DB_Lab
--
-- This is a base mockup for sprint 1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DB_Lab` DEFAULT CHARACTER SET utf8 ;
USE `DB_Lab` ;

-- -----------------------------------------------------
-- Table `DB_Lab`.`party`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DB_Lab`.`party` ;

CREATE TABLE IF NOT EXISTS `DB_Lab`.`party` (
  `partyId` INT NOT NULL,
  `partyName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`partyId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_Lab`.`platform`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DB_Lab`.`platform` ;

CREATE TABLE IF NOT EXISTS `DB_Lab`.`platform` (
  `platformId` INT NOT NULL,
  `platformName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`platformId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_Lab`.`politicians`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DB_Lab`.`politicians` ;

CREATE TABLE IF NOT EXISTS `DB_Lab`.`politicians` (
  `polId` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL,
  `picture` BLOB NULL,
  `firstName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `partyId` INT NOT NULL,
  `phone` VARCHAR(45) NULL,
  `website` VARCHAR(45) NULL,
  `platformId` INT NULL,
  PRIMARY KEY (`polId`),
  INDEX `partyId_idx` (`partyId` ASC),
  INDEX `platformId_idx` (`platformId` ASC),
  CONSTRAINT `partyId`
    FOREIGN KEY (`partyId`)
    REFERENCES `DB_Lab`.`party` (`partyId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `platformId`
    FOREIGN KEY (`platformId`)
    REFERENCES `DB_Lab`.`platform` (`platformId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_Lab`.`positions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DB_Lab`.`positions` ;

CREATE TABLE IF NOT EXISTS `DB_Lab`.`positions` (
  `positionId` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`positionId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_Lab`.`elections`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DB_Lab`.`elections` ;

CREATE TABLE IF NOT EXISTS `DB_Lab`.`elections` (
  `electionId` INT NOT NULL,
  `positionId` INT NOT NULL,
  `dateTime` DATETIME NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`electionId`),
  UNIQUE INDEX `electionId_UNIQUE` (`electionId` ASC),
  INDEX `positionId_idx` (`positionId` ASC),
  CONSTRAINT `positionId`
    FOREIGN KEY (`positionId`)
    REFERENCES `DB_Lab`.`positions` (`positionId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DB_Lab`.`candidates`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DB_Lab`.`candidates` ;

CREATE TABLE IF NOT EXISTS `DB_Lab`.`candidates` (
  `polId` INT NOT NULL,
  `electionId` INT NOT NULL,
  PRIMARY KEY (`polId`, `electionId`),
  INDEX `electionId_idx` (`electionId` ASC),
  CONSTRAINT `accountId`
    FOREIGN KEY (`polId`)
    REFERENCES `DB_Lab`.`politicians` (`polId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `electionId`
    FOREIGN KEY (`electionId`)
    REFERENCES `DB_Lab`.`elections` (`electionId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `DB_Lab`.`party`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_Lab`;
INSERT INTO `DB_Lab`.`party` (`partyId`, `partyName`) VALUES (0, 'Republican');
INSERT INTO `DB_Lab`.`party` (`partyId`, `partyName`) VALUES (1, 'Democrat');
INSERT INTO `DB_Lab`.`party` (`partyId`, `partyName`) VALUES (2, 'Libertarian');
INSERT INTO `DB_Lab`.`party` (`partyId`, `partyName`) VALUES (3, 'Tea Party');
INSERT INTO `DB_Lab`.`party` (`partyId`, `partyName`) VALUES (4, 'Illuminati');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_Lab`.`platform`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_Lab`;
INSERT INTO `DB_Lab`.`platform` (`platformId`, `platformName`) VALUES (0, 'Gun Control');
INSERT INTO `DB_Lab`.`platform` (`platformId`, `platformName`) VALUES (1, 'Immigration');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_Lab`.`politicians`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_Lab`;
INSERT INTO `DB_Lab`.`politicians` (`polId`, `username`, `password`, `email`, `picture`, `firstName`, `lastName`, `partyId`, `phone`, `website`, `platformId`) VALUES (0, 'Jsmith', 'smithy', 'jsmith@rep.gov', NULL, 'John', 'Smith', 0, NULL, NULL, NULL);
INSERT INTO `DB_Lab`.`politicians` (`polId`, `username`, `password`, `email`, `picture`, `firstName`, `lastName`, `partyId`, `phone`, `website`, `platformId`) VALUES (1, 'Rwilliams', 'freewilly', 'rwilliams@dem.gov', NULL, 'Rebeccah', 'Williams', 1, NULL, NULL, 0);
INSERT INTO `DB_Lab`.`politicians` (`polId`, `username`, `password`, `email`, `picture`, `firstName`, `lastName`, `partyId`, `phone`, `website`, `platformId`) VALUES (2, 'Broham', 'brosbeforehoes', 'broham@teaparty.org', NULL, 'Barry', 'Roham', 3, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_Lab`.`positions`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_Lab`;
INSERT INTO `DB_Lab`.`positions` (`positionId`, `name`) VALUES (0, 'Governor');
INSERT INTO `DB_Lab`.`positions` (`positionId`, `name`) VALUES (1, 'Senator');
INSERT INTO `DB_Lab`.`positions` (`positionId`, `name`) VALUES (2, 'Representative');
INSERT INTO `DB_Lab`.`positions` (`positionId`, `name`) VALUES (3, 'Judge');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_Lab`.`elections`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_Lab`;
INSERT INTO `DB_Lab`.`elections` (`electionId`, `positionId`, `dateTime`, `city`, `state`) VALUES (0, 0, '2018-10-12', 'Austin', 'TX');
INSERT INTO `DB_Lab`.`elections` (`electionId`, `positionId`, `dateTime`, `city`, `state`) VALUES (1, 1, '2020-02-24', 'Cincinnatti', 'CT');
INSERT INTO `DB_Lab`.`elections` (`electionId`, `positionId`, `dateTime`, `city`, `state`) VALUES (2, 2, '2020-03-23', 'Rhode Island', 'MA');

COMMIT;


-- -----------------------------------------------------
-- Data for table `DB_Lab`.`candidates`
-- -----------------------------------------------------
START TRANSACTION;
USE `DB_Lab`;
INSERT INTO `DB_Lab`.`candidates` (`polId`, `electionId`) VALUES (0, 0);
INSERT INTO `DB_Lab`.`candidates` (`polId`, `electionId`) VALUES (1, 2);
INSERT INTO `DB_Lab`.`candidates` (`polId`, `electionId`) VALUES (2, 1);

COMMIT;
