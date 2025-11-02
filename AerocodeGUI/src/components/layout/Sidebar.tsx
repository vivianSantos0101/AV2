// src/components/layout/Sidebar.tsx

import { NavLink } from "react-router-dom";
import { useSession } from "../../contexts/SessionContext";
import { NivelAcesso } from "../../domain/models";
import './Sidebar.css'; 

// 1. Importar o mesmo logo da tela de login
// (Ajuste o caminho se o seu logo da sidebar for diferente)
import AeroCodeLogo from '../../assets/images/logo-aerocode.png'; 

export function Sidebar() {
    const { usuarioAtual, logout } = useSession();

    if (!usuarioAtual) {
        return null; 
    }

    return (
        <aside className="sidebar-container">
            
            {/* 2. Garantir que o <img> e o <h2> estão aqui */}
            <div className="sidebar-logo">
                <img 
                    src={AeroCodeLogo} 
                    alt="AeroSys Logo" 
                    className="sidebar-logo-image" 
                />
                <h2>Aerocode</h2> 
            </div>
            
            <nav className="sidebar-nav">
                <NavLink to="/dashboard">Painel</NavLink>
                
                {usuarioAtual.nivelAcesso === NivelAcesso.ADMINISTRADOR && (
                    <NavLink to="/colaboradores">Colaboradores</NavLink>
                )}
            </nav>

            <div className="sidebar-user">
                <span>*** {usuarioAtual.nome} ***</span>
                <button onClick={logout} className="logout-button">
                    Sair
                </button>
            </div>
        </aside>
    );
}