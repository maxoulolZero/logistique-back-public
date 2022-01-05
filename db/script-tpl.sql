----------------------
--- Table Creation ---
----------------------
CREATE TABLE IF NOT EXISTS init (
    id                  serial primary key NOT NULL
    author              varchar(40),
    description         varchar(100),
    date_of_creation    varchar(40),
    date_of_edition     varchar(40)
);

CREATE TABLE IF NOT EXISTS stock (
    id                  serial primary key NOT NULL
    code_produit:       varchar(100),
    famille_produit:    varchar(100),
    description_produit:varchar(100),
    quantite_min:       float,
    packaging:          float,
    prix:               float,
    stock_disponible:   float     
);

-------------------------------
--- DATA insertion in table ---
-------------------------------
INSERT  INTO movies (title, origin_country)
        VALUES  ('Harry Potter', 'Great Britain'),
                ('Intouchable', 'France');