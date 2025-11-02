// src/pages/ColaboradoresPage.tsx
// (Substitui)

import { useState } from "react";
// 1. Importar os NOVOS hooks e modelos
import { useStore } from "../contexts/StoreContext";
import { useSession } from "../contexts/SessionContext";
import { NivelAcesso } from "../domain/models";
// 2. Importar os NOVOS componentes
import { FormModal } from "../components/ui/FormModal";
import { AddColaboradorForm } from "../components/forms/AddColaboradorForm";
// 3. Importar o NOVO CSS da página e da tabela
import './DashboardPage.css'; // (Reutiliza o .page-header)
import './ColaboradoresPage.css'; // (Usa o .admin-data-table)

export function ColaboradoresPage() {
    // 4. Usar os NOVOS hooks e nomes
    const { usuarioAtual } = useSession();
    const { colaboradores } = useStore();
    
    const [isModalAberto, setIsModalAberto] = useState(false);

    // 5. GUARDIÃO DE REQUISITOS (RF-02)
    // (Lógica idêntica, mas com os NOVOS nomes)
    if (usuarioAtual?.nivelAcesso !== NivelAcesso.ADMINISTRADOR) {
        return (
            <div className="page-container" style={{ textAlign: 'center' }}>
                <h2 style={{ color: '#dc2626' }}>[ ACESSO NEGADO ]</h2>
                <p>Você não tem permissão para aceder a esta página.</p>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Gestão de Colaboradores</h2>
                <button onClick={() => setIsModalAberto(true)} className="btn-primary">
                    + Cadastrar Novo Colaborador
                </button>
            </div>

            {/* 6. A NOVA tabela */}
            <table className="admin-data-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Usuário</th>
                        <th>Nível de Acesso</th>
                        <th>Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {colaboradores.length === 0 ? (
                        <tr>
                            <td colSpan={4}>Nenhum colaborador cadastrado.</td>
                        </tr>
                    ) : (
                        colaboradores.map(func => (
                            <tr key={func.id}>
                                <td>{func.nome}</td>
                                <td>{func.usuario}</td>
                                <td>{func.nivelAcesso}</td>
                                <td>{func.telefone}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* 7. O NOVO Modal e o NOVO Formulário */}
            <FormModal isOpen={isModalAberto} onClose={() => setIsModalAberto(false)}>
                <AddColaboradorForm onClose={() => setIsModalAberto(false)} />
            </FormModal>
        </div>
    );
}