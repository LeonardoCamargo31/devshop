-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema devshop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema devshop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `devshop` DEFAULT CHARACTER SET utf8 ;
USE `devshop` ;

-- -----------------------------------------------------
-- Table `devshop`.`produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devshop`.`produtos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(245) NULL,
  `descricao` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`produto_variacoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devshop`.`produto_variacoes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sku` VARCHAR(245) NULL,
  `estoque` INT NULL,
  `variacao_nome` VARCHAR(245) NULL,
  `preco` FLOAT NULL,
  `preco_fantasia` FLOAT NULL,
  `peso` INT NULL,
  `ordem` INT NULL,
  `produto_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_produto_variacoes_produtos_idx` (`produto_id` ASC),
  CONSTRAINT `fk_produto_variacoes_produtos`
    FOREIGN KEY (`produto_id`)
    REFERENCES `devshop`.`produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`produto_imagens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devshop`.`produto_imagens` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(245) NULL,
  `url` VARCHAR(245) NULL,
  `ordem` INT NULL,
  `produto_variacao_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_produto_imagens_produto_variacoes1_idx` (`produto_variacao_id` ASC),
  CONSTRAINT `fk_produto_imagens_produto_variacoes1`
    FOREIGN KEY (`produto_variacao_id`)
    REFERENCES `devshop`.`produto_variacoes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devshop`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `categoria` VARCHAR(245) NULL,
  `descricao` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`categorias_produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devshop`.`categorias_produtos` (
  `categoria_id` INT NOT NULL,
  `produto_id` INT NOT NULL,
  PRIMARY KEY (`categoria_id`, `produto_id`),
  INDEX `fk_categorias_has_produtos_produtos1_idx` (`produto_id` ASC),
  INDEX `fk_categorias_has_produtos_categorias1_idx` (`categoria_id` ASC),
  CONSTRAINT `fk_categorias_has_produtos_categorias1`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `devshop`.`categorias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_categorias_has_produtos_produtos1`
    FOREIGN KEY (`produto_id`)
    REFERENCES `devshop`.`produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`banner_tipos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devshop`.`banner_tipos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `banner_tipo` VARCHAR(245) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`banners`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devshop`.`banners` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(245) NULL,
  `url` VARCHAR(245) NULL,
  `imagem_url` VARCHAR(245) NULL,
  `ordem` INT NULL,
  `banner_tipo_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_banners_banner_tipos1_idx` (`banner_tipo_id` ASC),
  CONSTRAINT `fk_banners_banner_tipos1`
    FOREIGN KEY (`banner_tipo_id`)
    REFERENCES `devshop`.`banner_tipos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
