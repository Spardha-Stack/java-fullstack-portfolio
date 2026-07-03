-- Reference schema for the portfolio_db database.
--
-- This is NOT auto-executed. In dev, Hibernate creates/updates these tables
-- automatically via `spring.jpa.hibernate.ddl-auto=update` (see application.properties).
-- Use this file if you'd rather provision the schema manually — e.g. on a managed
-- MySQL instance where you want full control before the app connects — or just to
-- review the shape of the data.
--
-- Run once against an empty database:
--   mysql -u root -p portfolio_db < docs/schema.sql

CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4;
USE portfolio_db;

-- ---------------------------------------------------------------------------
-- Projects
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    title         VARCHAR(255) NOT NULL,
    subtitle      VARCHAR(255),
    description   VARCHAR(1000),
    period        VARCHAR(100),
    github_url    VARCHAR(500),
    live_url      VARCHAR(500),
    sort_order    INT
);

CREATE TABLE IF NOT EXISTS project_features (
    project_id    BIGINT NOT NULL,
    feature       VARCHAR(255),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS project_tech (
    project_id    BIGINT NOT NULL,
    tech          VARCHAR(100),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------------
-- Skills
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS skills (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(100) NOT NULL,
    level         INT NOT NULL,
    category      VARCHAR(100),
    sort_order    INT
);

-- ---------------------------------------------------------------------------
-- Experience
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS experience (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    role          VARCHAR(150) NOT NULL,
    org           VARCHAR(200) NOT NULL,
    period        VARCHAR(100),
    location      VARCHAR(150),
    description   VARCHAR(1000),
    sort_order    INT
);

-- ---------------------------------------------------------------------------
-- Education
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS education (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    degree        VARCHAR(200) NOT NULL,
    institution   VARCHAR(200) NOT NULL,
    period        VARCHAR(100),
    location      VARCHAR(150),
    score         VARCHAR(50),
    sort_order    INT
);

-- ---------------------------------------------------------------------------
-- Certificates
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS certificates (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(200) NOT NULL,
    org           VARCHAR(200) NOT NULL,
    date          VARCHAR(50),
    sort_order    INT
);

-- ---------------------------------------------------------------------------
-- Achievements
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS achievements (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    title         VARCHAR(200) NOT NULL,
    category      VARCHAR(100) NOT NULL,
    description   VARCHAR(500),
    value         VARCHAR(50),
    sort_order    INT
);

-- ---------------------------------------------------------------------------
-- Messages (contact form submissions)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS messages (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(120) NOT NULL,
    email         VARCHAR(200) NOT NULL,
    subject       VARCHAR(150),
    message       VARCHAR(2000) NOT NULL,
    created_at    DATETIME,
    `read`        BOOLEAN DEFAULT FALSE
);

-- ---------------------------------------------------------------------------
-- Users (reserved for a future admin panel — not wired to a login flow yet)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    username       VARCHAR(100) NOT NULL UNIQUE,
    password_hash  VARCHAR(255) NOT NULL,
    role           VARCHAR(50) DEFAULT 'ADMIN'
);
