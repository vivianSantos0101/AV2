// src/data/mockData.ts
// (Baseado em)

// 1. Importar os NOVOS modelos
import { Colaborador, ProjetoAeronave, NivelAcesso } from "../domain/models";

// 2. Criar o utilizador admin com a NOVA classe
const adminUser = new Colaborador(
    "1",
    "Admin Principal",
    "99999-9999",
    "Sede do Sistema",
    "admin", // (login)
    "admin123", // (senha)
    NivelAcesso.ADMINISTRADOR
);

// 3. Exportar as "tabelas" com os NOVOS nomes
export const db = {
    colaboradores: [adminUser],
    projetos: [] as ProjetoAeronave[]
};