// src/components/ui/FormModal.tsx
// (Substitui)

import React from 'react';
import './FormModal.css'; // (CSS Novo)

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function FormModal({ isOpen, onClose, children }: Props) {
    if (!isOpen) {
        return null;
    }

    return (
        // O "backdrop" (fundo)
        <div className="modal-backdrop" onClick={onClose}>
            {/* O "content" (caixa) */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="modal-close-btn">&times;</button>
                {children}
            </div>
        </div>
    );
}