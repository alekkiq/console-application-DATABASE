drop database if exists kirjatietokanta;
create database kirjatietokanta;
use kirjatietokanta;

create table kirja(
    kirjaID integer not null primary key,
    nimi varchar(46) not null,
    tekija varchar(29) not null,
    aihe varchar(31) not null,
    painovuosi integer not null
);

create user if not exists 'tomi'@'localhost' identified by 'soGR9DGp';
grant all privileges on kirjatietokanta.* to 'tomi'@'localhost';

insert into kirja values(1,"Maria ja My","Pirkko Puro","keksinnöt",2012);
insert into kirja values(7,"Tietokantojen nousu ja tuho", "Meri Ranta","tulevaisuuden koulu",2018);
insert into kirja values(3,"Pulpettien kapina", "Aapeli Aakkonen","tietokannat", 1995);
insert into kirja values(4,"Suku on paras", "Ella Hikkiö","pelaaminen",2015);
insert into kirja values(5,"SQL-mysteeri","Jesse Joki","mysteeri",1990);
insert into kirja values(2, "Numerohirmu", "Leila Hökki", "sukuhistoria", 2011);
insert into kirja values(6, "Uusi toivo", "Matti Puro", "tietokone", 2005);
