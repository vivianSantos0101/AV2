// src/components/forms/AssociarColaboradorForm.tsx
// (Equivalente ao AssociarFuncionarioForm.tsx)

import React, { useState } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { ProjetoAeronave, FaseProducao, Colaborador } from '../../domain/models';
import './FormStyles.css'; 

interface Props {
    projeto: ProjetoAeronave; // Prop do projeto para update
    fase: FaseProducao; // Prop da fase para associar
    onClose: () => void;
}

export function AssociarColaboradorForm({ projeto, fase, onClose }: Props) {
    // Pega a lista de TODOS os colaboradores do "banco"
    const { colaboradores, updateProjeto } = useStore(); 
    
    const [selectedColaboradorId, setSelectedColaboradorId] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const colaboradorSelecionado = colaboradores.find(f => f.id === selectedColaboradorId);

        if (colaboradorSelecionado) {
            // Chama a lógica da classe FaseProducao
            fase.associarColaborador(colaboradorSelecionado);
            
            // Avisa o React que o projeto (e suas fases) mudou
            updateProjeto(projeto); 
            
            onClose();
        } else {
            setErro("Por favor, selecione um colaborador.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container" style={{ width: '350px' }}>
            <h2>Associar Colaborador à Fase</h2>
            <p style={{ textAlign: 'center', marginTop: '-10px', marginBottom: '20px' }}>
                <strong>Fase:</strong> {fase.nome}
            </p>
            
            <div className="form-group">
                <label htmlFor="colaborador">Colaborador</label>
                <select 
                    id="colaborador" 
                    value={selectedColaboradorId} 
                    onChange={e => setSelectedColaboradorId(e.target.value)}
                >
                    <option value="">-- Selecione um colaborador --</option>
                    {/* Mapeia a lista de colaboradores */}
                    {colaboradores.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.nome} ({c.nivelAcesso})
                        </option>
                    ))}
                </select>
            </div>

            {erro && <p className="form-error-message">{erro}</p>}

            <div className="form-actions">
                <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
                <button type="submit" className="btn-primary">Associar</button>
            </div>
        </form>
    );
}