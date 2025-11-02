// src/contexts/SessionContext.tsx
// (Baseado em)

import React, { createContext, useContext, useState } from "react";
// 1. Importar o NOVO modelo
import { Colaborador } from "../domain/models";
// 2. Importar o NOVO hook da Store
import { useStore } from "./StoreContext"; 

// 3. Definir a NOVA interface
interface ISessionContext {
    usuarioAtual: Colaborador | null; // (Renomeado de usuarioLogado)
    login: (usuario: string, senha: string) => boolean;
    logout: () => void;
}

const SessionContext = createContext<ISessionContext>(null!);

export function SessionProvider({ children }: { children: React.ReactNode }) {
    // 4. Renomear o estado
    const [usuarioAtual, setUsuarioAtual] = useState<Colaborador | null>(null);
    
    // 5. Usar o NOVO hook da Store
    const { colaboradores, salvarDados } = useStore(); 

    const login = (usuario: string, senha: string): boolean => {
        
        // 6. Usar a NOVA lista de 'colaboradores'
        const colaborador = colaboradores.find(
            (f) => f.usuario === usuario
        );

        if (colaborador && colaborador.autenticar(usuario, senha)) {
            setUsuarioAtual(colaborador); // (Renomeado)
            console.log("Login BEM-SUCEDIDO!", colaborador);
            return true;
        }

        console.error("Login FALHOU!", { usuario, senha, listaChecada: colaboradores });
        setUsuarioAtual(null); // (Renomeado)
        return false;
    };

    const logout = () => {
        setUsuarioAtual(null); // (Renomeado)
        salvarDados(); // (Lógica mantida)
        console.log("Utilizador deslogado, dados salvos (simulado).");
    };

    return (
        <SessionContext.Provider value={{ usuarioAtual, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
}

// 7. Exportar o NOVO hook
export function useSession() {
    return useContext(SessionContext);
}