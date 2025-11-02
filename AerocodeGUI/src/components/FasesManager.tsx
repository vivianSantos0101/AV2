// src/components/FasesManager.tsx
// (Substitui EtapasManagerModal.tsx)

import { useState } from 'react';
// 1. Importar os NOVOS modelos e Enum
import { ProjetoAeronave, Colaborador, FaseProducao, StatusFase } from '../domain/models';
import { useStore } from '../contexts/StoreContext';
// 2. Importar os NOVOS componentes
import { FormModal } from './ui/FormModal';
import { AddFaseForm } from './forms/AddFaseForm';
import { AssociarColaboradorForm } from './forms/AssociarColaboradorForm'; 
import '../components/ManagerStyles.css'; // (Novo CSS para Managers)

interface Props {
    // 3. Mudar de Aeronave para ProjetoAeronave
    projeto: ProjetoAeronave;
}

// 4. Mudar o nome do componente
export function FasesManager({ projeto }: Props) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    // 5. Mudar para o novo estado de associação
    const [faseParaAssociar, setFaseParaAssociar] = useState<FaseProducao | null>(null);
    const { updateProjeto } = useStore(); 

    // 6. Mudar os nomes das funções (Lógica idêntica)
    const handleIniciarProxima = () => {
        // Usa o NOVO método da classe ProjetoAeronave
        const mensagem = projeto.iniciarProximaFase(); 
        alert(mensagem); 
        updateProjeto(projeto); // Atualiza o estado
    }
    
    const handleFinalizarAtual = () => {
        // Usa o NOVO método da classe ProjetoAeronave
        const mensagem = projeto.finalizarFaseAtual();
        alert(mensagem);
        updateProjeto(projeto); // Atualiza o estado
    }

    // 7. Mudar o nome da função e do parâmetro
    const handleAssociarColaborador = (fase: FaseProducao) => {
        setFaseParaAssociar(fase);
    }
    
    // 8. Função para mapear status para classes CSS
    const getStatusClass = (status: StatusFase) => {
        switch(status) {
            case StatusFase.CONCLUIDA: return 'status-concluída';
            case StatusFase.ANDAMENTO: return 'status-em-andamento';
            case StatusFase.PENDENTE: return 'status-pendente';
            default: return '';
        }
    }


    return (
        <div className="manager-tab-content">
            <div className="manager-actions">
                <button onClick={() => setIsAddModalOpen(true)} className="btn-primary" style={{ marginRight: '10px' }}>
                    + Adicionar Fase
                </button>
                <button onClick={handleIniciarProxima} className="btn-secondary btn-small" style={{ marginRight: '10px' }}>
                    Iniciar Próxima Fase
                </button>
                <button onClick={handleFinalizarAtual} className="btn-secondary btn-small">
                    Finalizar Fase Atual
                </button>
            </div>

            <div className="manager-list">
                {projeto.fasesProducao.length === 0 ? (
                    <p className="empty-state-message">Nenhuma fase de produção cadastrada para este projeto.</p>
                ) : (
                    // 9. Mudar para a nova tabela de manager
                    <table className="manager-data-table">
                        <thead>
                            <tr>
                                <th>Ordem</th>
                                <th>Nome da Fase</th>
                                <th>Prazo</th>
                                <th>Status</th>
                                <th>Colaboradores</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 10. Mapear as NOVAS fasesProducao */}
                            {projeto.fasesProducao.map((fase, index) => {
                                // 11. Mudar de 'funcionarios' para 'colaboradores'
                                const nomesColaboradores = fase.colaboradores.map((f: Colaborador) => f.nome).join(', ');
                                
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{fase.nome}</td>
                                        <td>{fase.prazo}</td>
                                        {/* 12. Aplicar as NOVAS classes de status */}
                                        <td className={getStatusClass(fase.status)}>{fase.status}</td>
                                        <td>{nomesColaboradores || 'Nenhum'}</td>
                                        <td>
                                            <button 
                                                onClick={() => handleAssociarColaborador(fase)} 
                                                className="btn-secondary btn-small"
                                            >
                                                Associar Colaborador
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* 13. NOVO Modal: Para Adicionar Fase */}
            <FormModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
                <AddFaseForm 
                    projeto={projeto} 
                    onClose={() => setIsAddModalOpen(false)} 
                />
            </FormModal>

            {/* 14. NOVO Modal: Para Associar Colaborador */}
            <FormModal isOpen={!!faseParaAssociar} onClose={() => setFaseParaAssociar(null)}>
                {faseParaAssociar && ( 
                    <AssociarColaboradorForm
                        projeto={projeto}
                        fase={faseParaAssociar}
                        onClose={() => setFaseParaAssociar(null)}
                    />
                )}
            </FormModal>
        </div>
    );
}