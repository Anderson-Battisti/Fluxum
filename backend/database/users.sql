create table users
(
	id 						 bigint auto_increment primary key,
	name                     varchar(100),
	email                    varchar(254) not null unique,
	password                 varchar(255) not null,
	active                   boolean  not null default true,
	created_at				 datetime not null default current_timestamp,
	updated_at 				 datetime not null default current_timestamp on update current_timestamp,
	onboarding_stage         tinyint  not null default 0,
    email_verified           boolean  not null default false   
);