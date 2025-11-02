// src/components/ComponentesManager.tsx
// (Substitui PecasManagerModal.tsx)

import { useState } from 'react';
import { ProjetoAeronave, Componente, StatusComponente } from '../domain/models';
import { FormModal } from './ui/FormModal';
import { AddComponenteForm } from './forms/AddComponenteForm';
import { UpdateComponenteStatusForm } from './forms/UpdateComponenteStatusForm'; 
import '../components/ManagerStyles.css'; 

interface Props {
    projeto: ProjetoAeronave;
}

// Função para mapear status para classes CSS
const getStatusClass = (status: StatusComponente) => {
    switch(status) {
        case StatusComponente.PRONTA: return 'status-pronta';
        case StatusComponente.EM_PRODUCAO: return 'status-em-produção';
        case StatusComponente.EM_TRANSPORTE: return 'status-em-transporte';
        default: return '';
    }
}

export function ComponentesManager({ projeto }: Props) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    // Novo estado para controlar qual componente estamos editando
    const [componenteParaEditar, setComponenteParaEditar] = useState<Componente | null>(null);

    const handleUpdateStatus = (componente: Componente) => {
        setComponenteParaEditar(componente);
    }

    return (
        <div className="manager-tab-content">
            <h2>Gerenciar Componentes: {projeto.codigo}</h2>
            
            <div className="manager-actions">
                <button onClick={() => setIsAddModalOpen(true)} className="btn-primary">
                    + Adicionar Componente
                </button>
            </div>

            <div className="manager-list">
                {projeto.componentes.length === 0 ? (
                    <p className="empty-state-message">Nenhum componente cadastrado para este projeto.</p>
                ) : (
                    // Usa a nova tabela de manager
                    <table className="manager-data-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Fornecedor</th>
                                <th>Tipo</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projeto.componentes.map((componente, index) => (
                                <tr key={index}>
                                    <td>{componente.nome}</td>
                                    <td>{componente.fornecedor}</td>
                                    <td>{componente.tipo}</td>
                                    {/* Aplica as NOVAS classes de status */}
                                    <td className={getStatusClass(componente.status)}>{componente.status}</td>
                                    <td>
                                        <button 
                                            onClick={() => handleUpdateStatus(componente)} 
                                            className="btn-secondary btn-small"
                                        >
                                            Atualizar Status
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal para Adicionar Componente */}
            <FormModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
                <AddComponenteForm 
                    projeto={projeto} 
                    onClose={() => setIsAddModalOpen(false)} 
                />
            </FormModal>

            {/* Modal para Atualizar Status */}
            <FormModal isOpen={!!componenteParaEditar} onClose={() => setComponenteParaEditar(null)}>
                {componenteParaEditar && ( 
                    <UpdateComponenteStatusForm
                        projeto={projeto}
                        componente={componenteParaEditar}
                        onClose={() => setComponenteParaEditar(null)}
                    />
                )}
            </FormModal>
        </div>
    );
}