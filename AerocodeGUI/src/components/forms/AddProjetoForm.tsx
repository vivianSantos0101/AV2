// src/components/forms/AddProjetoForm.tsx
// (Substitui)

import React, { useState } from 'react';
// 1. Importar o NOVO hook e os NOVOS modelos
import { useStore } from '../../contexts/StoreContext';
import { ProjetoAeronave, TipoAeronave } from '../../domain/models';
import './FormStyles.css'; // (O NOVO CSS que acabámos de criar)

interface Props {
    onClose: () => void;
}

export function AddProjetoForm({ onClose }: Props) {
    // 2. Usar os NOVOS hooks e nomes
    const { projetos, addProjeto } = useStore();

    const [codigo, setCodigo] = useState('');
    const [modelo, setModelo] = useState('');
    const [tipo, setTipo] = useState(TipoAeronave.COMERCIAL); // Valor padrão
    const [capacidade, setCapacidade] = useState(0);
    const [alcance, setAlcance] = useState(0);
    const [erro, setErro] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 3. Mesma lógica de validação, mas com a NOVA lista de 'projetos'
        if (projetos.find(a => a.codigo === codigo)) {
            setErro('Erro: Já existe um projeto com este código.');
            return;
        }

        if (!codigo || !modelo) {
            setErro('Código e Modelo são obrigatórios.');
            return;
        }

        // 4. Criar a NOVA classe
        const novoProjeto = new ProjetoAeronave(codigo, modelo, tipo, capacidade, alcance);
        addProjeto(novoProjeto);
        
        console.log("Projeto Adicionado!", novoProjeto);
        onClose(); // Fecha o modal
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Cadastrar Novo Projeto</h2>
            
            <div className="form-group">
                <label htmlFor="codigo">Código Único</label>
                <input type="text" id="codigo" value={codigo} onChange={e => setCodigo(e.target.value)} />
            </div>
            
            <div className="form-group">
                <label htmlFor="modelo">Modelo</label>
                <input type="text" id="modelo" value={modelo} onChange={e => setModelo(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="tipo">Tipo de Aeronave</label>
                <select id="tipo" value={tipo} onChange={e => setTipo(e.target.value as TipoAeronave)}>
                    <option value={TipoAeronave.COMERCIAL}>Comercial</option>
                    <option value={TipoAeronave.MILITAR}>Militar</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="capacidade">Capacidade (Passageiros)</label>
                <input type="number" id="capacidade" value={capacidade} onChange={e => setCapacidade(Number(e.target.value))} />
            </div>
            
            <div className="form-group">
                <label htmlFor="alcance">Alcance (km)</label>
                <input type="number" id="alcance" value={alcance} onChange={e => setAlcance(Number(e.target.value))} />
            </div>

            {erro && <p className="form-error-message">{erro}</p>}

            <div className="form-actions">
                <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
                <button type="submit" className="btn-primary">Salvar Projeto</button>
            </div>
        </form>
    );
}