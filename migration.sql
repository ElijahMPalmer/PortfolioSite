DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS admin;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    content TEXT
);

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    passkey TEXT
);