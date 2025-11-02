// src/App.tsx
// (Baseado em)

import { Routes, Route, Navigate } from "react-router-dom";
// 1. Importar o NOVO hook de sessão
import { useSession } from "./contexts/SessionContext";
// 2. Importar o NOVO Layout (Sidebar)
import { MainLayout } from "./components/layout/MainLayout";

// 3. Importar a PÁGINA DE LOGIN que acabámos de criar
import { LoginPage } from "./pages/LoginPage";

// 4. Importar os PLACHOLDERS das páginas
import { DashboardPage } from "./pages/DashboardPage";
import { ProjetoDetailPage } from "./pages/ProjetoDetailPage";
import { ColaboradoresPage } from "./pages/ColaboradoresPage";


// 5. Esta é a função de "Guarda de Rota"
// (Renomeada de ProtectedLayout para ProtectedRoutes)
function ProtectedRoutes() {
    // 6. Usa o NOVO hook e o NOVO nome de estado
    const { usuarioAtual } = useSession();
    if (!usuarioAtual) {
        // Se não houver utilizador, volta para o login
        return <Navigate to="/login" replace />;
    }
    // Se houver, renderiza o NOVO layout (Sidebar + Área de Conteúdo)
    return <MainLayout />;
}

function App() {
    return (
        <Routes>
            {/* Rota Pública */}
            <Route path="/login" element={<LoginPage />} />

            {/* Rotas Protegidas */}
            <Route element={<ProtectedRoutes />}>
                
                {/* 7. Definir as NOVAS rotas (baseadas no WF-2) */}
                
                {/* A rota / (raiz) agora redireciona para o /dashboard */}
                <Route index element={<Navigate to="/dashboard" replace />} />
                
                {/* WF-3: O Painel de Cards */}
                <Route path="dashboard" element={<DashboardPage />} />
                
                {/* WF-4: A Página de Detalhes (Abas) */}
                <Route path="projeto/:codigo" element={<ProjetoDetailPage />} /> 

                {/* WF-5: A Página de Admin */}
                <Route path="colaboradores" element={<ColaboradoresPage />} />
                
            </Route>
        </Routes>
    )
}

export default App