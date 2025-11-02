// src/pages/LoginPage.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import './LoginPage.css'; 
import AeroCodeLogo from '../assets/images/logo-aerocode.png'; // Verifique se o caminho está correto

export function LoginPage() {
    const { login } = useSession();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        
        const sucesso = login(usuario, senha);
        if (sucesso) {
            navigate("/dashboard"); 
        } else {
            setErro("Usuário ou senha inválidos.");
        }
    };

    return (
        <div className="login-page-container"> 
            <div className="login-form-container">

                <h2 className="login-logo"> 
                    <img 
                        src={AeroCodeLogo}  
                        alt="AeroCode Logo" 
                        className="login-logo-image" 
                    />
                    AeroCode
                </h2>
                
                {/* MUDANÇA ESTRUTURAL AQUI: 
                  O <form> agora tem a classe "login-form-body"
                  e dois divs filhos para criar as colunas.
                */}
                <form onSubmit={handleSubmit} className="login-form-body">
                    
                    {/* Coluna da Esquerda: Inputs */}
                    <div className="login-inputs-wrapper">
                        <div className="login-form-group">
                            <label htmlFor="usuario">Usuário</label>
                            <input
                                type="text"
                                id="usuario"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                            />
                        </div>
                        <div className="login-form-group">
                            <label htmlFor="senha">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Coluna da Direita: Botão */}
                    <div className="login-button-wrapper">
                        <button type="submit" className="login-submit-button">Entrar</button>
                    </div>

                </form>

                {/* Mensagem de erro fica fora do form-body para não quebrar o layout */ }
                {erro && <p className="login-error-message">{erro}</p>}

            </div>
        </div>
    );
}