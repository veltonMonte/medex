import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LuX, LuSearch, LuPlus, LuFileText } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";
import './ModalPrescricao.css';

export default function ModalPrescricao({ isOpen, onClose, onSalvar, alergias }) {
    const [busca, setBusca] = useState('');
    const [medicamentosSelecionados, setMedicamentosSelecionados] = useState([]);
    
    const inputRef = useRef(null);

    const bancoMedicamentos = [
        "Amoxicilina 875mg", "Ibuprofeno 600mg", "Ondansetrona 8mg",
        "Dipirona 500mg", "Paracetamol 750mg", "Omeprazol 20mg", "Ceftriaxona 1g"
    ];

    // CORREÇÃO: Envolvendo a função no useCallback para satisfazer o ESLint
    const handleSalvar = useCallback(() => {
        if (medicamentosSelecionados.length > 0) {
            onSalvar(medicamentosSelecionados);
            setMedicamentosSelecionados([]); 
            setBusca('');
        }
    }, [medicamentosSelecionados, onSalvar]);

    // HISTÓRIAS 20, 27 e 28: Atalho Ctrl+Enter Global no Modal
    useEffect(() => {
        const handleKeyDownGlobal = (e) => {
            if (isOpen && e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                handleSalvar();
            }
        };
        window.addEventListener('keydown', handleKeyDownGlobal);
        return () => window.removeEventListener('keydown', handleKeyDownGlobal);
    }, [isOpen, handleSalvar]); // <-- handleSalvar adicionado como dependência

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const sugestoes = busca.trim() === '' 
        ? [] 
        : bancoMedicamentos.filter(med => med.toLowerCase().includes(busca.toLowerCase()));

    const adicionarMedicamento = (medicamento) => {
        if (!medicamentosSelecionados.includes(medicamento)) {
            setMedicamentosSelecionados([...medicamentosSelecionados, medicamento]);
        }
        setBusca(''); 
        inputRef.current.focus(); 
    };

    const handleKeyDownInput = (e) => {
        if (e.key === 'Enter' && busca.trim() !== '') {
            e.preventDefault();
            const medParaAdicionar = sugestoes.length > 0 ? sugestoes[0] : busca.trim();
            adicionarMedicamento(medParaAdicionar);
        }
    };

    const removerMedicamento = (medicamentoParaRemover) => {
        setMedicamentosSelecionados(medicamentosSelecionados.filter(med => med !== medicamentoParaRemover));
    };

    const temAlertaAlergia = medicamentosSelecionados.some(med => 
        alergias.toLowerCase().includes(med.split(' ')[0].toLowerCase())
    );

    return (
        <div className="modal-overlay">
            <div className="modal-content prescricao-modal">
                <div className="modal-header">
                    <h2><LuFileText /> Nova Prescrição</h2>
                    <button className="btn-close-modal" onClick={onClose}><LuX /></button>
                </div>

                <div className="modal-body">
                    <div className="busca-container">
                        <LuSearch className="busca-icon" />
                        <input 
                            ref={inputRef}
                            type="text" 
                            className="input-busca-med"
                            placeholder="Busque o medicamento e pressione Enter..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            onKeyDown={handleKeyDownInput} 
                        />
                    </div>

                    {sugestoes.length > 0 && (
                        <div className="sugestoes-lista">
                            {sugestoes.map((med, index) => (
                                <div key={index} className="sugestao-item" onClick={() => adicionarMedicamento(med)}>
                                    <LuPlus /> {med}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="smart-chips-area">
                        {medicamentosSelecionados.length === 0 ? (
                            <p className="texto-vazio">Nenhum medicamento adicionado ainda.</p>
                        ) : (
                            medicamentosSelecionados.map((med, index) => (
                                <div key={index} className={`smart-chip ${alergias.toLowerCase().includes(med.split(' ')[0].toLowerCase()) ? 'chip-perigo' : ''}`}>
                                    <span>{med}</span>
                                    <button onClick={() => removerMedicamento(med)}><LuX /></button>
                                </div>
                            ))
                        )}
                    </div>

                    {temAlertaAlergia && (
                        <div className="alerta-bloqueio">
                            <FiAlertTriangle />
                            Atenção: O paciente possui alergia relatada a um dos medicamentos selecionados!
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <span style={{ fontSize: '12px', color: '#80868b' }}>Atalho: <strong>Ctrl + Enter</strong></span>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
                        <button 
                            className="btn-salvar-prescricao" 
                            onClick={handleSalvar}
                            disabled={medicamentosSelecionados.length === 0 || temAlertaAlergia} 
                        >
                            Gerar Prescrição
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}