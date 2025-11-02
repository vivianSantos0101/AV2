// src/components/forms/AddFaseForm.tsx
// (Equivalente ao AddEtapaForm.tsx)

import React, { useState } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { ProjetoAeronave, FaseProducao } from '../../domain/models';
import './FormStyles.css'; 

interface Props {
    projeto: ProjetoAeronave;
    onClose: () => void;
}

export function AddFaseForm({ projeto, onClose }: Props) {
    const { updateProjeto } = useStore();

    const [nome, setNome] = useState('');
    const [prazo, setPrazo] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nome || !prazo) {
            setErro('Nome e Prazo são obrigatórios.');
            return;
        }

        const novaFase = new FaseProducao(nome, prazo); // Status 'Pendente' é automático
        projeto.adicionarFase(novaFase); // Usa o NOVO método
        updateProjeto(projeto); 
        
        console.log("Fase Adicionada!", novaFase);
        onClose(); 
    };

    return (
        <form onSubmit={handleSubmit} className="form-container" style={{ width: '350px' }}>
            <h2>Adicionar Nova Fase</h2>
            
            <div className="form-group">
                <label htmlFor="nome">Nome da Fase</label>
                <input type="text" id="nome" value={nome} onChange={e => setNome(e.target.value)} />
            </div>
            
            <div className="form-group">
                <label htmlFor="prazo">Prazo Estimado (ex: 5 dias)</label>
                <input type="text" id="prazo" value={prazo} onChange={e => setPrazo(e.target.value)} />
            </div>

            {erro && <p className="form-error-message">{erro}</p>}

            <div className="form-actions">
                <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
                <button type="submit" className="btn-primary">Salvar Fase</button>
            </div>
        </form>
    );
}