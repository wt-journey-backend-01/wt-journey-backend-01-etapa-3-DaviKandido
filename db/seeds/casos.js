/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("casos").del();
  const agentes = await knex("agentes").select("id");
  await knex("casos").insert([
    {
      titulo: "homicidio",
      descricao:
        "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
      status: "aberto",
      agente_id: agentes[0].id,
    },
    {
      titulo: "roubo a residência",
      descricao:
        "Na madrugada de 15/08/2023, uma residência no bairro Santa Luzia foi invadida por dois indivíduos armados. Objetos de valor foram levados.",
      status: "solucionado",
      agente_id: agentes[1].id,
    },
    {
      titulo: "tráfico de drogas",
      descricao:
        "Durante patrulhamento em 27/06/2024, foi interceptado um veículo no bairro São Jorge transportando substâncias ilícitas.",
      status: "solucionado",
      agente_id: agentes[2].id,
    },
    {
      titulo: "violência doméstica",
      descricao:
        "Ocorrência registrada no dia 02/03/2022 em um apartamento no centro da cidade. Vítima do sexo feminino, 32 anos, com marcas visíveis de agressão.",
      status: "aberto",
      agente_id: agentes[3].id,
    },
    {
      titulo: "desaparecimento",
      descricao:
        "Jovem de 17 anos foi dado como desaparecido no dia 05/05/2025 após sair para a escola no bairro Jardim das Palmeiras e não retornar.",
      status: "solucionado",
      agente_id: agentes[4].id,
    },
    {
      titulo: "furto de veículo",
      descricao:
        "Um carro modelo Gol 2012 foi furtado em frente ao shopping Vitória por volta das 13:45 do dia 03/04/2024.",
      status: "aberto",
      agente_id: agentes[5].id,
    },
    {
      titulo: "fraude bancária",
      descricao:
        "Vítima relatou movimentações financeiras indevidas em sua conta bancária no dia 12/03/2023.",
      status: "solucionado",
      agente_id: agentes[6].id,
    },
    {
      titulo: "vazamento de dados",
      descricao:
        "Servidores da prefeitura tiveram seus dados pessoais expostos em um fórum online.",
      status: "aberto",
      agente_id: agentes[7].id,
    },
    {
      titulo: "sequestro relâmpago",
      descricao:
        "Mulher foi rendida e obrigada a sacar dinheiro em caixas eletrônicos, no centro da cidade.",
      status: "solucionado",
      agente_id: agentes[8].id,
    },
    {
      titulo: "extorsão digital",
      descricao:
        "Criminosos exigem pagamento para não divulgar fotos íntimas da vítima obtidas por invasão de conta.",
      status: "aberto",
      agente_id: agentes[9].id,
    },
    {
      titulo: "acidente de trânsito com fuga",
      descricao:
        "Motociclista atingiu pedestre e fugiu sem prestar socorro na Av. das Américas, dia 01/06/2024.",
      status: "aberto",
      agente_id: agentes[10].id,
    },
    {
      titulo: "denúncia ambiental",
      descricao:
        "Despejo irregular de lixo industrial em área de preservação ambiental, próximo ao rio Serra Azul.",
      status: "aberto",
      agente_id: agentes[11].id,
    },
    {
      titulo: "violação de domicílio",
      descricao:
        "Indivíduo invadiu residência desocupada na rua Maranhão, causando danos ao imóvel.",
      status: "solucionado",
      agente_id: agentes[12].id,
    },
    {
      titulo: "furto em comércio",
      descricao:
        "Ladrão foi flagrado por câmeras furtando produtos eletrônicos em uma loja no centro.",
      status: "aberto",
      agente_id: agentes[13].id,
    },
    {
      titulo: "falsidade ideológica",
      descricao:
        "Homem foi preso tentando abrir conta bancária usando documentos falsos em nome de terceiro.",
      status: "solucionado",
      agente_id: agentes[14].id,
    },
  ]);
};
