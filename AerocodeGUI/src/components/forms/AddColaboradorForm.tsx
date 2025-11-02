// src/components/forms/AddColaboradorForm.tsx
// (Substitui)

import React, { useState } from 'react';
// 1. Importar o NOVO hook e os NOVOS modelos
import { useStore } from '../../contexts/StoreContext';
import { Colaborador, NivelAcesso } from '../../domain/models';
import './FormStyles.css'; // (Reutiliza o nosso NOVO CSS de formulário)

interface Props {
    onClose: () => void;
}

export function AddColaboradorForm({ onClose }: Props) {
    // 2. Usar os NOVOS hooks e nomes
    const { colaboradores, addColaborador } = useStore();

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [nivelAcesso, setNivelAcesso] = useState(NivelAcesso.OPERADOR); // Padrão
    const [erro, setErro] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 3. Mesma lógica de validação, mas com a NOVA lista de 'colaboradores'
        if (colaboradores.find(f => f.usuario === usuario)) {
            setErro('Erro: Este nome de usuário já está em uso.');
            return;
        }

        if (!nome || !usuario || !senha) {
            setErro('Nome, Usuário e Senha são obrigatórios.');
            return;
        }
        
        // 4. Criar o NOVO Colaborador
        const id = self.crypto.randomUUID(); // (Mesma lógica de ID)
        const novoColaborador = new Colaborador(id, nome, telefone, endereco, usuario, senha, nivelAcesso);
        
        addColaborador(novoColaborador);
        
        console.log("Colaborador Adicionado!", novoColaborador);
        onClose(); // Fecha o modal
    };

    return (
        // 5. Usar as NOVAS classes CSS
        <form onSubmit={handleSubmit} className="form-container" style={{ width: '400px' }}>
            <h2>Cadastrar Novo Colaborador</h2>
            
            <div className="form-group">
                <label htmlFor="nome">Nome Completo</label>
                <input type="text" id="nome" value={nome} onChange={e => setNome(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="telefone">Telefone</label>
                <input type="text" id="telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="endereco">Endereço</label>
                <input type="text" id="endereco" value={endereco} onChange={e => setEndereco(e.target.value)} />
            </div>

            <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #eee' }} />

            <div className="form-group">
                <label htmlFor="usuario">Usuário (para login)</label>
                <input type="text" id="usuario" value={usuario} onChange={e => setUsuario(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" value={senha} onChange={e => setSenha(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="nivel">Nível de Acesso</label>
                <select id="nivel" value={nivelAcesso} onChange={e => setNivelAcesso(e.target.value as NivelAcesso)}>
                    {Object.values(NivelAcesso).map(nivel => (
                        <option key={nivel} value={nivel}>{nivel}</option>
                    ))}
                </select>
            </div>

            {erro && <p className="form-error-message">{erro}</p>}

            <div className="form-actions">
                <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
                <button type="submit" className="btn-primary">Salvar Colaborador</button>
            </div>
        </form>
    );
}