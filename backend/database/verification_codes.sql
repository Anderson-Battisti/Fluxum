create table verification_codes
(
    id bigint auto_increment primary key,
    email varchar(254) not null unique,
    code char(6) not null,
    expires_at datetime not null
)