// src/components/TestesManager.tsx
// (Componente para a Aba "Testes" - RF-06)

import { useState } from 'react';
// 1. Importar os NOVOS modelos
import { ProjetoAeronave, ResultadoTeste } from '../domain/models';
// 2. Importar os NOVOS componentes
import { FormModal } from './ui/FormModal';
import { RegistrarTesteForm } from './forms/RegistrarTesteForm'; // Dependência
import '../components/ManagerStyles.css'; // Reutiliza o CSS para Managers

interface Props {
    projeto: ProjetoAeronave;
}

// Função para mapear status para classes CSS (usadas no ManagerStyles.css)
const getStatusClass = (resultado: ResultadoTeste) => {
    switch(resultado) {
        case ResultadoTeste.APROVADO: return 'status-aprovado';
        case ResultadoTeste.REPROVADO: return 'status-reprovado';
        default: return '';
    }
}

export function TestesManager({ projeto }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="manager-tab-content">
            
            <div className="manager-actions">
                {/* Botão para abrir o modal de registro de teste (RF-06) */}
                <button onClick={() => setIsModalOpen(true)} className="btn-primary">
                    + Registrar Teste
                </button>
            </div>

            <div className="manager-list">
                {projeto.testes.length === 0 ? (
                    <p className="empty-state-message">Nenhum teste de qualidade registrado para este projeto.</p>
                ) : (
                    // Tabela de listagem dos testes (utiliza o novo estilo de tabela)
                    <table className="manager-data-table">
                        <thead>
                            <tr>
                                <th>Tipo de Teste</th>
                                <th>Resultado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projeto.testes.map((teste, index) => (
                                <tr key={index}>
                                    <td>{teste.tipo}</td>
                                    {/* Exibe o resultado com as classes CSS de diferenciação */}
                                    <td className={getStatusClass(teste.resultado)}>{teste.resultado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal para Registrar Teste */}
            <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <RegistrarTesteForm 
                    projeto={projeto} 
                    onClose={() => setIsModalOpen(false)} 
                />
            </FormModal>
        </div>
    );
}