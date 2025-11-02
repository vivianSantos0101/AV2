// src/components/layout/MainLayout.tsx
// NOVO LAYOUT: Sidebar Fixo na lateral e conteúdo à direita

import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar"; // Componente Sidebar (que vamos criar)
import './MainLayout.css'; // Novo CSS de Layout

export function MainLayout() {
    return (
        <div className="main-layout-container">
            {/* O Menu Lateral Fixo */}
            <Sidebar />
            
            {/* A área de conteúdo que ocupa o resto da tela */}
            <main className="content-area-full">
                <Outlet />
            </main>
        </div>
    );
}