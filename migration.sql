DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    content TEXT
);

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    passkey text
);