// src/components/forms/RegistrarTesteForm.tsx
// (Equivalente ao RegistrarTesteForm.tsx original, mas adaptado para o novo projeto)

import React, { useState } from 'react';
import { useStore } from '../../contexts/StoreContext'; // NOVO hook
import { ProjetoAeronave, Teste, TipoTeste, ResultadoTeste } from '../../domain/models'; // NOVOS modelos
import './FormStyles.css'; // Reutilizando nosso CSS

interface Props {
    projeto: ProjetoAeronave; // NOVO nome de prop
    onClose: () => void;
}

export function RegistrarTesteForm({ projeto, onClose }: Props) {
    const { updateProjeto } = useStore();

    const [tipo, setTipo] = useState(TipoTeste.ELETRICO);
    const [resultado, setResultado] = useState(ResultadoTeste.APROVADO);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const novoTeste = new Teste(tipo, resultado);
        projeto.adicionarTeste(novoTeste); // Usa o método na classe ProjetoAeronave
        updateProjeto(projeto); // Avisa o React que o projeto mudou
        
        console.log("Teste Registrado!", novoTeste);
        onClose(); // Fecha o modal
    };

    return (
        <form onSubmit={handleSubmit} className="form-container" style={{ width: '350px' }}>
            <h2>Registrar Novo Teste</h2>
            
            <div className="form-group">
                <label htmlFor="tipo">Tipo de Teste</label>
                <select id="tipo" value={tipo} onChange={e => setTipo(e.target.value as TipoTeste)}>
                    {Object.values(TipoTeste).map(t => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>
            
            <div className="form-group">
                <label htmlFor="resultado">Resultado do Teste</label>
                <select id="resultado" value={resultado} onChange={e => setResultado(e.target.value as ResultadoTeste)}>
                    {Object.values(ResultadoTeste).map(r => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>
            </div>

            <div className="form-actions">
                <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
                <button type="submit" className="btn-primary">Salvar Teste</button>
            </div>
        </form>
    );
}