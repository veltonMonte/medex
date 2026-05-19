import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LuX, LuFileCheck } from "react-icons/lu";
import { FiHome } from "react-icons/fi";
import './ModalPrescricao.css'; 

export default function ModalResumoAlta({ isOpen, onClose, onConfirmarAlta, paciente }) {
    const [diagnostico, setDiagnostico] = useState('');
    const [prescricaoCasa, setPrescricaoCasa] = useState('');
    const inputRef = useRef(null);

    // CORREÇÃO: Envolvendo a função no useCallback para o ESLint
    const handleConfirmar = useCallback(() => {
        if (!diagnostico.trim()) {
            alert("Preencha o diagnóstico final para liberar a alta.");
            return;
        }
        onConfirmarAlta({ diagnostico, prescricaoCasa });
        setDiagnostico('');
        setPrescricaoCasa('');
    }, [diagnostico, prescricaoCasa, onConfirmarAlta]);

    // HISTÓRIAS 20, 27 e 28: Atalho Ctrl+Enter Global
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isOpen && e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                handleConfirmar();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleConfirmar]); // <-- handleConfirmar adicionado como dependência

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content prescricao-modal" style={{ width: '600px' }}>
                <div className="modal-header">
                    <h2 style={{ color: '#1e8e3e' }}><LuFileCheck /> Resumo de Alta Médica</h2>
                    <button className="btn-close-modal" onClick={onClose}><LuX /></button>
                </div>

                <div className="modal-body">
                    <div style={{ background: '#f1f3f4', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                        <strong>{paciente?.nome || 'Paciente'}</strong>
                        <span>ID: {paciente?.id || '---'}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#3c4043' }}>Diagnóstico Final (CID-10 ou Descrição)</label>
                        <input 
                            ref={inputRef}
                            type="text" 
                            className="input-busca-med"
                            style={{ border: '1px solid #dadce0', padding: '12px', borderRadius: '8px' }}
                            placeholder="Ex: J03.9 - Amigdalite aguda não especificada"
                            value={diagnostico}
                            onChange={(e) => setDiagnostico(e.target.value)}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#3c4043' }}>Evolução Resumida (Automático)</label>
                        <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '8px', fontSize: '13px', color: '#5f6368', border: '1px solid #e8eaed' }}>
                            Paciente evoluiu hemodinamicamente estável, sem queixas no momento. Boa aceitação da dieta e medicação. Condições de alta hospitalar.
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#3c4043', display: 'flex', alignItems: 'center', gap: '6px' }}><FiHome /> Prescrição Domiciliar</label>
                        <textarea 
                            rows="3"
                            className="input-busca-med"
                            style={{ border: '1px solid #dadce0', padding: '12px', borderRadius: '8px', resize: 'none' }}
                            placeholder="Orientações e medicamentos para uso em casa..."
                            value={prescricaoCasa}
                            onChange={(e) => setPrescricaoCasa(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <div className="modal-footer">
                    <span style={{ fontSize: '12px', color: '#80868b' }}>Atalho: <strong>Ctrl + Enter</strong></span>
                    <button 
                        className="btn-salvar-prescricao" 
                        style={{ background: '#1e8e3e' }}
                        onClick={handleConfirmar}
                    >
                        Confirmar Alta e Liberar
                    </button>
                </div>
            </div>
        </div>
    );
}