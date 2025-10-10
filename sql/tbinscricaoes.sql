create table tbinscricacoes (
    id serial primary key,
    nome varchar(150) not null,
    email varchar(100) not null,
    idatividade int not null,
    foreing key(idatividade) references tbatividades(id),
);
