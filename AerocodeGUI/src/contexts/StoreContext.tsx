// src/contexts/StoreContext.tsx
// (Baseado em)

import React, { createContext, useContext, useState } from "react";
// 1. Importar os NOVOS modelos
import { ProjetoAeronave, Colaborador } from "../domain/models";
// 2. Importar os NOVOS dados mock
import { db } from "../data/mockData";

// 3. Definir a NOVA interface
interface IStoreContext {
    projetos: ProjetoAeronave[];
    colaboradores: Colaborador[];
    addProjeto: (projeto: ProjetoAeronave) => void;
    addColaborador: (colaborador: Colaborador) => void;
    updateProjeto: (projeto: ProjetoAeronave) => void; // (Renomeado de updateAeronave)
    salvarDados: () => void;
}

const StoreContext = createContext<IStoreContext>(null!);

export function StoreProvider({ children }: { children: React.ReactNode }) {
    // 4. Usar os NOVOS nomes de estado e dados iniciais
    const [projetos, setProjetos] = useState<ProjetoAeronave[]>(db.projetos);
    const [colaboradores, setColaboradores] = useState<Colaborador[]>(db.colaboradores);

    // 5. Renomear as funções
    const addProjeto = (projeto: ProjetoAeronave) => {
        setProjetos(listaAtual => [...listaAtual, projeto]);
    };

    const addColaborador = (colaborador: Colaborador) => {
        setColaboradores(listaAtual => [...listaAtual, colaborador]);
    };

    const updateProjeto = (projeto: ProjetoAeronave) => {
        setProjetos(prevProjetos => 
            prevProjetos.map(p => p.codigo === projeto.codigo ? projeto : p)
        );
    };

    const salvarDados = () => {
        // Lógica de "salvar" (simulada)
        console.log("DADOS SALVOS (simulado):", { projetos, colaboradores });
    };

    return (
        <StoreContext.Provider 
            value={{ 
                projetos, 
                colaboradores, 
                addProjeto, 
                addColaborador, 
                updateProjeto,
                salvarDados 
            }}
        >
            {children}
        </StoreContext.Provider>
    );
}

// 6. Exportar o NOVO hook
export function useStore() {
    return useContext(StoreContext);
}