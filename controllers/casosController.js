const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");
const ApiError = require("../utils/errorHandler");

const getCasos = async (req, res, next) => {
  try {
    const { agente_id = null, status = null } = req.query;

    if (req.query.status) {
      if (req.query.status !== "aberto" && req.query.status !== "solucionado") {
        return next(
          new ApiError("Parâmetros inválidos", 400, [
            {
              status:
                "O campo 'status' pode ser somente 'aberto' ou 'solucionado' ",
            },
          ])
        );
      }
    }

    const casos = await casosRepository.findAll({ agente_id, status });

    if (req.query.agente_id) {
      if (!casos || casos.length === 0) {
        return next(
          new ApiError("Casos nao encontrados", 404, [
            {
              agente_id:
                "Agente informado não possui casos correspondentes ou não existe",
            },
          ])
        );
      }
    }

    if (!casos || casos.length === 0) {
      return next(
        new ApiError("Casos nao encontrados", 404, [
          { status: "Nenhum caso encontrado" },
        ])
      );
    }

    res.status(200).json(casos);
  } catch (error) {
    next(new ApiError("Falha ao obter os casos:" + error.message, 500));
  }
};

const getSearch = async (req, res, next) => {
  try {
    const casos = await casosRepository.findAll({ q: req.query.q });

    if (req.query.q) {
      if (!casos || casos.length === 0) {
        return next(
          new ApiError("Casos nao encontrados", 404, [
            { q: "Nenhum caso encontrado" },
          ])
        );
      }
    } else {
      return next(
        new ApiError("Casos nao encontrados", 400, [
          { q: "Parâmetro 'q' é obrigatório para busca" },
        ])
      );
    }

    res.status(200).json(casos);
  } catch (error) {
    next(
      new ApiError("Falha ao obter os casos:" + error.message, 500, [
        {
          q: "Nenhum caso encontrado",
        },
      ])
    );
  }
};

const getCasoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const caso = await casosRepository.findById(id);

    if (!caso) {
      return next(
        new ApiError("Caso nao encontrado", 404, [
          {
            id: "O id informado nao corresponde a nenhum caso",
          },
        ])
      );
    }

    const agente = await agentesRepository.findById(caso.agente_id);
    if (!agente) {
      return next(
        new ApiError(
          "O agente informado não corresponde ao agente responsável pelo caso.",
          404,
          [
            {
              agente_id:
                "O agente informado nao corresponde ao agente responsavel pelo caso",
            },
          ]
        )
      );
    }
    caso.agente = agente;

    res.status(200).json(caso);
  } catch (error) {
    next(
      new ApiError("Falha ao obter o caso: " + error.message, 500, [
        {
          id: "O id informado nao corresponde a nenhum caso",
        },
      ])
    );
  }
};

const createCaso = async (req, res, next) => {
  try {
    const caso = req.body;

    const agente = await agentesRepository.findById(caso.agente_id);
    if (!agente) {
      return next(
        new ApiError("Agente referente ao caso nao encontrado", 404, [
          {
            agente_id: "O agente informado nao corresponde a nenhum agente",
          },
        ])
      );
    }

    const casoCreado = await casosRepository.create(caso);
    res.status(201).json(casoCreado);
  } catch (error) {
    next(new ApiError("Falha ao criar o caso: " + error.message, 500));
  }
};

const updateCaso = async (req, res, next) => {
  try {
    const { id } = req.params;
    const caso = req.body;

    const agente = await agentesRepository.findById(caso.agente_id);
    if (!agente) {
      return next(new ApiError("Agente referente ao caso nao encontrado", 404));
    }

    const casoAtualizado = await casosRepository.update(id, caso);

    if (!casoAtualizado) {
      return next(new ApiError("Caso nao encontrado", 404));
    }

    res.status(200).json(casoAtualizado);
  } catch (error) {
    next(new ApiError("Falha ao atualizar o caso: " + error.message, 500));
  }
};

const updateCasoPartial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const casoPartial = req.body;

    if (casoPartial.agente_id) {
      const agente = await agentesRepository.findById(casoPartial.agente_id);
      if (!agente) {
        return next(
          new ApiError("Agente referente ao caso nao encontrado", 404)
        );
      }
    }

    const casoAtualizado = await casosRepository.updatePartial(id, casoPartial);

    if (!casoAtualizado) {
      return next(new ApiError("Caso nao encontrado", 404));
    }

    res.status(200).json(casoAtualizado);
  } catch (error) {
    next(new ApiError("Falha ao atualizar o caso: " + error.message, 500));
  }
};

const deleteCaso = async (req, res, next) => {
  try {
    const deleted = await casosRepository.remove(req.params.id);

    if (!deleted) {
      return next(new ApiError("Caso nao encontrado", 404));
    }

    res.status(204).send();
  } catch (error) {
    next(new ApiError("Falha ao deletar o caso: " + error.message, 500));
  }
};

module.exports = {
  getCasos,
  getCasoById,
  getSearch,
  createCaso,
  updateCaso,
  updateCasoPartial,
  deleteCaso,
};
