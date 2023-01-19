BEGIN;

CREATE SCHEMA counterdb;

CREATE TYPE VISIBILITY_TYPE AS ENUM ('PRIVATE', 'UNLISTED', 'PUBLIC');

CREATE TABLE counterdb.counter (
    id                          UUID             NOT NULL   DEFAULT GEN_RANDOM_UUID(),
    name                        VARCHAR(150)     NOT NULL,
    description                 VARCHAR(5000),
    visibility                  VISIBILITY_TYPE  NOT NULL   DEFAULT 'PRIVATE',
    enter_timestamp             TIMESTAMPTZ      NOT NULL   DEFAULT NOW(),
    last_modified_timestamp     TIMESTAMPTZ      NOT NULL   DEFAULT NOW(),

    CONSTRAINT counter_pk PRIMARY KEY(id)
);

CREATE TABLE counterdb.counter_addition (
    counter_id          UUID            NOT NULL,
    id                  BIGSERIAL       NOT NULL,
    enter_timestamp     TIMESTAMPTZ     NOT NULL    DEFAULT NOW(),

    CONSTRAINT counteraddition_pk PRIMARY KEY(counter_id, id),
    CONSTRAINT counteraddition_counter_fk FOREIGN KEY(counter_id) REFERENCES counterdb.counter(id)
);

INSERT INTO counterdb.counter (id, name, description, visibility, enter_timestamp, last_modified_timestamp) VALUES
    ('2d2d1405-356a-41ed-8b51-366ee860453d', 'Days Alive', 'The number of days I have survived!', 'PUBLIC', '1999-01-26', '1999-01-27'),
    ('b90e7d62-4d17-424e-ba55-b304d366dd4b', 'Things', 'Thingy things', 'PRIVATE', '2020-01-01', '2020-02-01'),
    ('1aaed48f-1d5f-4474-a1b6-b559a1d58229', 'Counter Counter', 'The number of counters that exist', 'UNLISTED', '2023-01-17', '2023-01-17');

INSERT INTO counterdb.counter_addition (counter_id, id, enter_timestamp) VALUES 
    ('2d2d1405-356a-41ed-8b51-366ee860453d', 0, '1999-01-26'),
    ('2d2d1405-356a-41ed-8b51-366ee860453d', 1, '1999-01-27'),
    ('2d2d1405-356a-41ed-8b51-366ee860453d', 2, '1999-01-30'),
    ('1aaed48f-1d5f-4474-a1b6-b559a1d58229', 3, '1999-01-26'),
    ('1aaed48f-1d5f-4474-a1b6-b559a1d58229', 4, '2020-01-01'),
    ('1aaed48f-1d5f-4474-a1b6-b559a1d58229', 5, '2023-01-17');

COMMIT;

ANALYZE counterdb.counter;
ANALYZE counterdb.counter_addition;
