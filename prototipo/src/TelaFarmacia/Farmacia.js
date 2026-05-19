import React, { useState } from 'react';
import logo from "../TelaPaciente/img/logo192.png";
import './Farmacia.css';
import { LuPill, LuClock, LuUser } from "react-icons/lu"; // Removemos o LuAlertCircle daqui
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi"; // Adicionamos os dois do Feather aqui
import SearchBar from '../components/SearchBar';

export default function Farmacia() {
    const [prescricoes, setPrescricoes] = useState([
        { 
            id: 'RX-9012', paciente: 'Roberto Alves', local: 'Consultório 01', medico: 'Dr. Gabriel', 
            tempo: '2 min', status: 'pendente', risco: 'vermelho', 
            medicamentos: ['AAS 100mg - 1 comp', 'Clopidogrel 75mg - 4 comp', 'Morfina 2mg IV'] 
        },
        { 
            id: 'RX-9011', paciente: 'Juliana Costa', local: 'Consultório 03', medico: 'Dra. Sarah', 
            tempo: '15 min', status: 'preparando', risco: 'amarelo', 
            medicamentos: ['Dipirona 1g IV', 'Plasil 10mg IV'] 
        },
        { 
            id: 'RX-9008', paciente: 'Marcos Oliveira', local: 'Leito Observação 02', medico: 'Dr. Gabriel', 
            tempo: '45 min', status: 'liberado', risco: 'laranja', 
            medicamentos: ['Cefazolina 1g IV', 'Cetoprofeno 100mg IV'] 
        }
    ]);

    const prescricoesAtivas = prescricoes.filter(p => p.status !== 'liberado');
    const historicoLiberadas = prescricoes.filter(p => p.status === 'liberado');

    const alterarStatus = (id, novoStatus) => {
        setPrescricoes(prescricoes.map(p => p.id === id ? { ...p, status: novoStatus } : p));
    };

    return (
        <div className="layout-container">
            <aside className="sidebar">
                <div className="logo-container">
                    <img src={logo} alt="FortalMed" width="180" />
                </div>
                <nav className="menu-nav">
                    <a href="/fila-atendimento" className="menu-item">Fila Médica</a>
                    <a href="/atendimento" className="menu-item">Prontuários</a>
                    <a href="/farmacia" className="menu-item active">Farmácia Central</a>
                </nav>
            </aside>

            <main className="main-content">
                <header className="top-bar">
                    <div className="top-bar-left">
                        <SearchBar />
                    </div>
                    <div className="top-bar-right">
                        <div className="status-medico">
                            <span className="dot-online"></span> Farmácia Central - Carlos (Farmacêutico)
                        </div>
                    </div>
                </header>

                <div className="content farmacia-grid">
                    
                    <div className="coluna-farmacia">
                        <div className="farmacia-header-secao">
                            <h2>Fila de Dispensação</h2>
                            <span className="badge-contador">{prescricoesAtivas.length} Pendentes</span>
                        </div>

                        <div className="cards-prescricao-container">
                            {prescricoesAtivas.map((rx) => (
                                <div key={rx.id} className={`card-prescricao b-color-${rx.risco}`}>
                                    <div className="prescricao-topo">
                                        <div>
                                            <h3 className="rx-paciente">{rx.paciente}</h3>
                                            <span className="rx-meta">{rx.local} • {rx.medico}</span>
                                        </div>
                                        <div className="rx-badges">
                                            <span className={`tag-manchester tag-${rx.risco}`}>{rx.risco.toUpperCase()}</span>
                                            {rx.status === 'pendente' && <span className="tag-status pendente">Pendente</span>}
                                            {rx.status === 'preparando' && <span className="tag-status preparando">Em Preparo</span>}
                                        </div>
                                    </div>

                                    <div className="prescricao-corpo">
                                        <div className="lista-medicamentos">
                                            {rx.medicamentos.map((med, i) => (
                                                <div key={i} className="item-medicamento">
                                                    <LuPill className="icone-pilula" /> {med}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="prescricao-acoes">
                                        <span className="tempo-espera"><LuClock /> {rx.tempo} aguardando</span>
                                        
                                        <div className="botoes-acao">
                                            {rx.status === 'pendente' ? (
                                                <button className="btn-preparar" onClick={() => alterarStatus(rx.id, 'preparando')}>
                                                    <FiAlertCircle /> Iniciar Preparo
                                                </button>
                                            ) : (
                                                <button className="btn-liberar" onClick={() => alterarStatus(rx.id, 'liberado')}>
                                                    <FiCheckCircle /> Liberar Medicação
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {prescricoesAtivas.length === 0 && (
                                <p className="mensagem-vazia">Nenhuma prescrição pendente no momento.</p>
                            )}
                        </div>
                    </div>

                    <div className="coluna-farmacia coluna-historico">
                        <div className="farmacia-header-secao">
                            <h2>Histórico de Liberação (Hoje)</h2>
                        </div>

                        <div className="lista-historico-farmacia">
                            {historicoLiberadas.map((rx) => (
                                <div key={rx.id} className="card-historico-rx">
                                    <div className="hist-rx-topo">
                                        <strong>{rx.paciente}</strong>
                                        <span className="tag-status liberado"><FiCheckCircle /> Liberado</span>
                                    </div>
                                    <p className="hist-rx-info">ID: {rx.id} • Entregue para: {rx.local}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}