// src/components/ui/ProjectCard.tsx
// (Componente 100% novo, substitui a linha da tabela <tr> da)

import { useNavigate } from 'react-router-dom';
import { ProjetoAeronave, StatusFase } from '../../domain/models';
import './ProjectCard.css'; // (Vamos criar este CSS)

interface Props {
    projeto: ProjetoAeronave;
}

// (Função helper copiada da sua AeronavesPage.tsx e adaptada)
function getStatusProducao(projeto: ProjetoAeronave): string {
    const faseEmAndamento = projeto.fasesProducao.find(e => e.status === StatusFase.ANDAMENTO);
    if (faseEmAndamento) {
        return `Em Andamento: ${faseEmAndamento.nome}`;
    }
    const proximaFase = projeto.fasesProducao.find(e => e.status === StatusFase.PENDENTE);
    if (proximaFase) {
        return `Pendente: ${proximaFase.nome}`;
    }
    if (projeto.fasesProducao.length > 0 && projeto.fasesProducao.every(e => e.status === StatusFase.CONCLUIDA)) {
        return "Produção Concluída";
    }
    return "Aguardando Planejamento";
}

export function ProjectCard({ projeto }: Props) {
    const navigate = useNavigate();

    const handleGerenciar = () => {
        // Navega para a NOVA rota de detalhes
        navigate(`/projeto/${projeto.codigo}`);
    };

    const statusTexto = getStatusProducao(projeto);

    return (
        <div className="project-card">
            <div className="card-header">
                <span className="card-codigo">{projeto.codigo}</span>
            </div>
            <div className="card-body">
                <h3 className="card-modelo">{projeto.modelo}</h3>
                <p className="card-tipo">{projeto.tipo}</p>
            </div>
            <div className="card-status">
                <strong>Status Atual:</strong>
                <p>{statusTexto}</p>
            </div>
            <div className="card-footer">
                <button onClick={handleGerenciar} className="card-button">
                    Gerenciar Projeto
                </button>
            </div>
        </div>
    );
}