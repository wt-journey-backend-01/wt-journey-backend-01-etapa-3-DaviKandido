/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('agentes').del()

  await knex("agentes").insert([
    {
      nome: "Rommel Carneiro",
      dataDeIncorporacao: "1992-10-04",
      cargo: "delegado",
    },
    {
      nome: "Larissa Souza",
      dataDeIncorporacao: "2005-06-12",
      cargo: "inspetor",
    },
    {
      nome: "Tiago Mendes",
      dataDeIncorporacao: "2010-03-22",
      cargo: "investigador",
    },
    {
      nome: "Patrícia Lima",
      dataDeIncorporacao: "2017-08-09",
      cargo: "escrivão",
    },
    {
      nome: "Carlos Henrique",
      dataDeIncorporacao: "2013-11-30",
      cargo: "perito",
    },
    {
      nome: "Juliana Prado",
      dataDeIncorporacao: "2008-01-12",
      cargo: "delegado",
    },
    {
      nome: "Eduardo Ramos",
      dataDeIncorporacao: "2011-05-20",
      cargo: "investigador",
    },
    {
      nome: "Fernanda Costa",
      dataDeIncorporacao: "2019-07-30",
      cargo: "inspetor",
    },
    {
      nome: "Marcelo Tavares",
      dataDeIncorporacao: "2003-04-02",
      cargo: "perito",
    },
    {
      nome: "Silvia Andrade",
      dataDeIncorporacao: "2020-12-05",
      cargo: "escrivão",
    },
    {
      nome: "André Fernandes",
      dataDeIncorporacao: "2016-09-18",
      cargo: "investigador",
    },
    {
      nome: "Letícia Moraes",
      dataDeIncorporacao: "2015-03-27",
      cargo: "delegado",
    },
    {
      nome: "Bruno Silva",
      dataDeIncorporacao: "2001-11-14",
      cargo: "perito",
    },
    {
      nome: "Tatiane Oliveira",
      dataDeIncorporacao: "2023-02-10",
      cargo: "inspetor",
    },
    {
      nome: "Rafael Martins",
      dataDeIncorporacao: "2018-06-01",
      cargo: "escrivão",
    },
  ]);
};
