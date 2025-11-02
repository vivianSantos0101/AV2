// src/components/forms/UpdateComponenteStatusForm.tsx
// (Equivalente ao UpdatePecaStatusForm.tsx)

import React, { useState } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { ProjetoAeronave, Componente, StatusComponente } from '../../domain/models';
import './FormStyles.css'; 

interface Props {
    projeto: ProjetoAeronave;
    componente: Componente; // Prop do componente para editar
    onClose: () => void;
}

export function UpdateComponenteStatusForm({ projeto, componente, onClose }: Props) {
    const { updateProjeto } = useStore(); 
    
    // O estado inicial do dropdown é o status ATUAL
    const [novoStatus, setNovoStatus] = useState(componente.status);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Chama a lógica da classe (modelo)
        componente.atualizarStatus(novoStatus);
        
        // Avisa o React que o projeto (e seus componentes) mudou
        updateProjeto(projeto); 
        
        onClose(); 
    };

    return (
        <form onSubmit={handleSubmit} className="form-container" style={{ width: '350px' }}> 
            <h2>Atualizar Status: {componente.nome}</h2>
            
            <div className="form-group">
                <label htmlFor="status">Novo Status</label>
                <select 
                    id="status" 
                    value={novoStatus} 
                    onChange={e => setNovoStatus(e.target.value as StatusComponente)}
                >
                    {/* Mapeia o NOVO Enum 'StatusComponente' */}
                    {Object.values(StatusComponente).map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>

            <div className="form-actions">
                <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
                <button type="submit" className="btn-primary">Salvar Status</button>
            </div>
        </form>
    );
}