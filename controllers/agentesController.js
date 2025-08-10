const agentesRepository = require("../repositories/agentesRepository");
const casosRepository = require("../repositories/casosRepository");
const ApiError = require("../utils/errorHandler");

const getAgentes = async (req, res, next) => {
  try {
    const { cargo = null, sort = null } = req.query;

    if (req.query.sort) {
      if (
        req.query.sort !== "dataDeIncorporacao" &&
        req.query.sort !== "-dataDeIncorporacao"
      ) {
        return next(
          new ApiError("Parâmetros inválidos", 400, [
            {
              status:
                "O campo 'sort' pode ser somente 'dataDeIncorporacao' ou '-dataDeIncorporacao' ",
            },
          ])
        );
      }
    }

    let agentes = await agentesRepository.findAll({ cargo, sort });

    if (req.query.cargo) {
      if (!agentes || agentes.length === 0) {
        return next(
          new ApiError("Agentes nao encontrados", 404, [
            {
              cargo: "O cargo informado nao corresponde a nenhum agente",
            },
          ])
        );
      }
    }

    // agente vem em formato de json, desfaça
    if (!agentes) {
      return next(new ApiError("Agentes nao encontrados", 404));
    }

    res.status(200).json(agentes);
  } catch (error) {
    next(new ApiError("Falha ao obter os agentes: " + error.message, 500));
  }
};

const getAgenteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const agente = await agentesRepository.findById(id);

    if (!agente) {
      return next(
        new ApiError("Agente não encontrado", 404, [
          {
            id: "O agente informado nao corresponde a nenhum agente",
          },
        ])
      );
    }

    res.status(200).json(agente);
  } catch (error) {
    next(new ApiError("Falha ao obter o agente: " + error.message, 500));
  }
};

const getCasosByAgenteId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const agente = await agentesRepository.findById(id);

    if (!agente) {
      return next(
        new ApiError("Agente não encontrado", 404, [
          {
            id: "O agente informado nao corresponde a nenhum agente",
          },
        ])
      );
    }

    const casos = await casosRepository.getCasosByAgenteId(id);
    agente.casos = casos;

    res.status(200).json(agente);
  } catch (error) {
    next(new ApiError("Falha ao obter o agente: " + error.message, 500));
  }
};

const createAgente = async (req, res, next) => {
  try {
    const agente = req.body;
    const agenteCreado = await agentesRepository.create(agente);
    res.status(201).json(agenteCreado);
  } catch (error) {
    next(new ApiError("Falha ao criar o agente: " + error.message, 500));
  }
};

const updateAgente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const agente = req.body;
    const agenteAtualizado = await agentesRepository.update(id, agente);

    if (!agenteAtualizado) {
      return next(
        new ApiError("Agente nao encontrado", 404, [
          {
            id: "O agente informado nao corresponde a nenhum agente",
          },
        ])
      );
    }

    res.status(200).json(agenteAtualizado);
  } catch (error) {
    next(new ApiError("Falha ao atualizar o agente: " + error.message, 500));
  }
};

const updateAgentePartial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const agentePartial = req.body;
    const agenteAtualizado = await agentesRepository.updatePartial(
      id,
      agentePartial
    );

    if (!agenteAtualizado) {
      return next(
        new ApiError("Agente nao encontrado", 404, [
          {
            id: "O agente informado nao corresponde a nenhum agente",
          },
        ])
      );
    }

    res.status(200).json(agenteAtualizado);
  } catch (error) {
    next(new ApiError("Falha ao atualizar o agente: " + error.message, 500));
  }
};

const deleteAgente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await agentesRepository.remove(id);

    if (!deleted) {
      return next(
        new ApiError("agente nao encontrado", 404, [
          {
            id: "O agente informado nao corresponde a nenhum agente",
          },
        ])
      );
    }

    res.status(204).send();
  } catch (error) {
    next(new ApiError("Falha ao deletar o agente: " + error.message, 500));
  }
};

module.exports = {
  getAgentes,
  getAgenteById,
  getCasosByAgenteId,
  createAgente,
  updateAgente,
  updateAgentePartial,
  deleteAgente,
};
