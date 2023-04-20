-- Deploy batala:init_tables to pg

BEGIN;



CREATE DOMAIN "postal_code_fr" AS text
CHECK(
      value ~ '^\d{5}$' -- code postaux metropole de 01 a 09
    /*value ~ '^0[1-9]\d{3}$' -- code postaux metropole de 01 a 09
    OR value ~ '^20[1-2]\d{2}$|^20300$' -- code postaux de la Corse
    OR value ~ '^[13-8]\d{4}$' -- code postaux les plus génériques
    OR value ~ '^9[0-6]\d{3}$' -- code postaux metropole commencant par 9
    OR value ~ '^97[1-6]\d{2}$' -- code postaux DOM
    OR value ~ '^98[4678]\d{2}$' -- code postaux TOM
    OR value ~ '^9{5}$' -- code postal de la poste
    */
);

CREATE DOMAIN "email" AS text
CHECK(
     value ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
);



CREATE TYPE "gender" AS ENUM('F', 'M', 'Mixte');
CREATE TYPE "size" AS ENUM('S','M','L','XL','XXL','XXXL');
CREATE TYPE "pupitre" AS ENUM('Basse1', 'Basse2', 'Dobra', 'Repinique', 'Caixa');
CREATE TYPE "role" AS ENUM('member', 'board', 'admin');

CREATE TABLE "user"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "url_img" TEXT,
    "lastname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "nickname" TEXT,
    "email" email NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "birthdate" DATE,
    "phone" TEXT,
    "address" TEXT,
    "address_2" TEXT,
    "zip_code" postal_code_fr,
    "city" TEXT,
    "gender" gender,
    "top_size" size,
    "bottom_size" size,
    "subscription" BOOLEAN,
    "deposit" BOOLEAN,
    "role" role,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "instrument"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "code" TEXT NOT NULL,
    "pupitre" pupitre,
    "observation" TEXT,
    "depth" INT,
    "rods" INT,
    "weight" FLOAT,
    "sticker" BOOLEAN,
    "user_id" INT REFERENCES "user" ("id") ON DELETE SET NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "suit"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL,
    "gender" gender,
    "observation" TEXT,
    "quantity_s" INT,
    "quantity_m" INT,
    "quantity_l" INT,
    "quantity_xl" INT,
    "quantity_xxl" INT,
    "quantity_xxxl" INT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_has_suit" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INT REFERENCES "user"("id") ON DELETE SET NULL,
    "suit_id" INT REFERENCES "suit"("id") ON DELETE SET NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;

