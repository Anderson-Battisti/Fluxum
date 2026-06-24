create table refresh_tokens
(
    id         bigint       auto_increment primary key,
    user_id    bigint       not null,
    token_hash varchar(255) not null,
    expiry_date datetime    not null,
    revoked    boolean      not null default false,
    
    foreign key (user_id) references users (id)
);

create index idx_refresh_tokens_user_id on refresh_tokens (user_id);
create unique index idx_refresh_tokens_hash on refresh_tokens (token_hash);