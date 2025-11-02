// src/components/forms/AddComponenteForm.tsx
// (Equivalente ao AddPecaForm.tsx, mas com nomenclatura nova)

import React, { useState } from 'react';
// 1. Importar o NOVO hook da Store
import { useStore } from '../../contexts/StoreContext';
// 2. Importar os NOVOS modelos
import { ProjetoAeronave, Componente, TipoComponente } from '../../domain/models';
// 3. Reutilizar o NOVO CSS de formulário
import './FormStyles.css'; 

interface Props {
    // 4. Mudar de Aeronave para ProjetoAeronave
    projeto: ProjetoAeronave;
    onClose: () => void;
}

// 5. Mudar o nome do componente e da prop
export function AddComponenteForm({ projeto, onClose }: Props) {
    // 6. Mudar de useDatabase/updateAeronave para useStore/updateProjeto
    const { updateProjeto } = useStore(); 

    const [nome, setNome] = useState('');
    const [fornecedor, setFornecedor] = useState('');
    // 7. Mudar para o NOVO Enum
    const [tipo, setTipo] = useState(TipoComponente.NACIONAL); 
    const [erro, setErro] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nome || !fornecedor) {
            setErro('Nome e Fornecedor são obrigatórios.');
            return;
        }

        // 8. Criar a NOVA classe Componente
        const novoComponente = new Componente(nome, tipo, fornecedor);
        // 9. Chamar o NOVO método no objeto ProjetoAeronave
        projeto.adicionarComponente(novoComponente); 

        // 10. Atualizar a store com o novo projeto
        updateProjeto(projeto); 
        
        console.log("Componente Adicionado!", novoComponente);
        onClose(); 
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Adicionar Novo Componente</h2>
            
            <div className="form-group">
                <label htmlFor="nome">Nome do Componente</label>
                <input type="text" id="nome" value={nome} onChange={e => setNome(e.target.value)} />
            </div>
            
            <div className="form-group">
                <label htmlFor="fornecedor">Fornecedor</label>
                <input type="text" id="fornecedor" value={fornecedor} onChange={e => setFornecedor(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="tipo">Tipo do Componente</label>
                {/* 11. Usar o NOVO Enum para o select */}
                <select id="tipo" value={tipo} onChange={e => setTipo(e.target.value as TipoComponente)}>
                    <option value={TipoComponente.NACIONAL}>Nacional</option>
                    <option value={TipoComponente.IMPORTADA}>Importada</option>
                </select>
            </div>

            {erro && <p className="form-error-message">{erro}</p>}

            <div className="form-actions">
                <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
                <button type="submit" className="btn-primary">Salvar Componente</button>
            </div>
        </form>
    );
}