import React, { useState, useEffect } from 'react';
import { LuX, LuClipboardCheck } from "react-icons/lu";
import './ModalChecklistAlta.css';

export default function ModalChecklistAlta({ isOpen, onClose, leito, onConfirmarAlta }) {
    const estadoInicial = {
        acessoRemovido: false,
        sinaisVitais: false,
        orientado: false,
        receitaEntregue: false,
        liberacaoConvenio: false
    };

    const [checks, setChecks] = useState(estadoInicial);

    useEffect(() => {
        if (isOpen) setChecks(estadoInicial);
    }, [isOpen]);

    if (!isOpen || !leito) return null;

    const totalItens = Object.keys(checks).length;
    const itensMarcados = Object.values(checks).filter(Boolean).length;
    const progresso = (itensMarcados / totalItens) * 100;
    const isCompleto = progresso === 100;

    const toggleCheck = (campo) => {
        setChecks(prev => ({ ...prev, [campo]: !prev[campo] }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content checklist-modal">
                <div className="modal-header">
                    <h2><LuClipboardCheck /> Checklist de Alta</h2>
                    <button className="btn-close-modal" onClick={onClose}><LuX /></button>
                </div>

                <div className="modal-body">
                    <div className="checklist-info-paciente">
                        <p>Paciente: <strong>{leito.paciente}</strong></p>
                        <span className="badge-leito">Leito: {leito.id}</span>
                    </div>

                    <div className="progresso-container">
                        <div className="progresso-textos">
                            <span>Status de Verificação</span>
                            <strong>{Math.round(progresso)}%</strong>
                        </div>
                        <div className="progresso-barra-fundo">
                            <div 
                                className={`progresso-barra-preenchimento ${isCompleto ? 'completo' : ''}`} 
                                style={{ width: `${progresso}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="checklist-grupos">
                        <div className="checklist-secao">
                            <h3>Clínico</h3>
                            <label className="check-item">
                                <input type="checkbox" checked={checks.acessoRemovido} onChange={() => toggleCheck('acessoRemovido')} />
                                <span>Remoção de acesso venoso</span>
                            </label>
                            <label className="check-item">
                                <input type="checkbox" checked={checks.sinaisVitais} onChange={() => toggleCheck('sinaisVitais')} />
                                <span>Registro de sinais vitais de saída</span>
                            </label>
                        </div>
                        <div className="checklist-secao">
                            <h3>Documentação</h3>
                            <label className="check-item">
                                <input type="checkbox" checked={checks.orientado} onChange={() => toggleCheck('orientado')} />
                                <span>Orientações de autocuidado entregues</span>
                            </label>
                            <label className="check-item">
                                <input type="checkbox" checked={checks.receitaEntregue} onChange={() => toggleCheck('receitaEntregue')} />
                                <span>Receituário médico entregue</span>
                            </label>
                            <label className="check-item">
                                <input type="checkbox" checked={checks.liberacaoConvenio} onChange={() => toggleCheck('liberacaoConvenio')} />
                                <span>Autorização administrativa/convênio</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
                    <button 
                        className={`btn-salvar-alta ${isCompleto ? 'btn-liberar' : ''}`} 
                        onClick={() => onConfirmarAlta(leito.id)}
                        disabled={!isCompleto}
                    >
                        Liberar Leito
                    </button>
                </div>
            </div>
        </div>
    );
}