// src/pages/DashboardPage.tsx
// (Substitui)

import { useState } from "react";
// 1. Importar os NOVOS hooks e componentes
import { useStore } from "../contexts/StoreContext";
import { FormModal } from "../components/ui/FormModal";
import { AddProjetoForm } from "../components/forms/AddProjetoForm";
import { ProjectCard } from "../components/ui/ProjectCard";
import './DashboardPage.css'; // (O NOVO CSS)

export function DashboardPage() {
    // 2. Usar o NOVO hook e nomes
    const { projetos } = useStore();
    const [isModalAberto, setIsModalAberto] = useState(false);

    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Painel de Projetos</h2>
                {/* 3. O botão de Add (RF-03) usa o NOVO CSS */}
                <button onClick={() => setIsModalAberto(true)} className="btn-primary">
                    + Cadastrar Novo Projeto
                </button>
            </div>

            {/* 4. A NOVA listagem em Grid (WF-3) */}
            <div className="projects-grid">
                {projetos.length === 0 ? (
                    <div className="no-projects-message">
                        Nenhum projeto cadastrado.
                    </div>
                ) : (
                    // 5. Mapeia para o NOVO componente ProjectCard
                    projetos.map(projeto => (
                        <ProjectCard key={projeto.codigo} projeto={projeto} />
                    ))
                )}
            </div>

            {/* 6. O NOVO modal e o NOVO formulário */}
            <FormModal isOpen={isModalAberto} onClose={() => setIsModalAberto(false)}>
                <AddProjetoForm onClose={() => setIsModalAberto(false)} />
            </FormModal>
        </div>
    );
}