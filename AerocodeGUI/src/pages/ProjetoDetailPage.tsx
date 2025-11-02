// src/pages/ProjetoDetailPage.tsx
// (Substitui com o novo layout de Abas)

import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../contexts/StoreContext";
import { Relatorio } from "../domain/models"; 

// 1. Importar os NOVOS componentes e UI
import { TabSystem } from "../components/ui/TabSystem";
import { ComponentesManager } from "../components/ComponentesManager";
import { FasesManager } from "../components/FasesManager";
import { TestesManager } from "../components/TestesManager";
import './DashboardPage.css'; // Reutiliza o .page-header

export function ProjetoDetailPage() {
    const { codigo } = useParams<{ codigo: string }>();
    const navigate = useNavigate();
    const { projetos } = useStore();

    // Encontra o projeto com o código na URL
    const projeto = projetos.find(p => p.codigo === codigo);

    if (!projeto) {
        return (
            <div className="page-container">
                <h2 className="page-header">Projeto não encontrado</h2>
                <button onClick={() => navigate("/dashboard")} className="btn-secondary">
                    Voltar para o Painel
                </button>
            </div>
        );
    }

    // Lógica para Gerar Relatório (RF-06)
    const handleGerarRelatorio = () => {
        const relatorio = new Relatorio();
        const conteudo = relatorio.gerarRelatorio(projeto);
        relatorio.salvarEmArquivoWeb(conteudo, projeto.codigo);
        console.log("Relatório gerado e enviado para download.");
    };

    // Estrutura das Abas (WF-4)
    const projectTabs = [
        { 
            id: 'componentes', 
            label: 'Componentes (Peças)', 
            content: <ComponentesManager projeto={projeto} /> // RF-04
        },
        { 
            id: 'fases', 
            label: 'Fases (Etapas)', 
            content: <FasesManager projeto={projeto} /> // RF-05
        },
        { 
            id: 'testes', 
            label: 'Testes de Qualidade', 
            content: <TestesManager projeto={projeto} /> // RF-06
        },
    ];

    return (
        <div className="page-container">
            <div className="page-header">
                {/* Título e Botão Voltar */}
                <h2 style={{ fontSize: '1.8rem' }}>
                    <button onClick={() => navigate("/dashboard")} className="btn-link" style={{ marginRight: '10px', color: '#64748b', fontSize: '1.2rem', textDecoration: 'none' }}>&larr; </button>
                    Gerenciando Projeto: {projeto.modelo} ({projeto.codigo})
                </h2>
                
                {/* Botão Gerar Relatório (RF-06) */}
                <button className="btn-primary" onClick={handleGerarRelatorio} style={{ backgroundColor: '#3226dcff', border: 'none' }}>
                    Gerar Relatório Final
                </button>
            </div>

            {/* O NOVO SISTEMA DE ABAS (WF-4) */}
            <TabSystem tabs={projectTabs} />
        </div>
    );
}