INSERT IGNORE INTO roles(name) VALUES('ROLE_USER');
INSERT IGNORE INTO roles(name) VALUES('ROLE_ADMIN');
INSERT IGNORE INTO roles(name) VALUES('ROLE_CHAIR');
alter table users convert to character set utf8 collate utf8_unicode_ci;
alter table presentations convert to character set utf8 collate utf8_unicode_ci;
-- ALTER TABLE users
-- MODIFY `name` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- ALTER TABLE presentations
-- MODIFY `paper_abstract` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- ALTER TABLE presentations
-- MODIFY `authors_string` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
