import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importação adicionada
import logo from "../TelaPaciente/img/logo192.png";
import './Triagem.css';
import { LuActivity, LuThermometer, LuHeartPulse, LuWind, LuSave, LuClock, LuX } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";
import SearchBar from '../components/SearchBar';

export default function PainelTriagem() {
    const navigate = useNavigate(); // 2. Instância do navigate criada

    // Fila de pacientes vindos da Recepção
    const [filaEspera, setFilaEspera] = useState([
        { id: 'TR-101', nome: 'Roberto Alves', idade: 58, chegada: '10:45', motivo: 'Dor no peito irradiando para o braço' },
        { id: 'TR-102', nome: 'Juliana Costa', idade: 22, chegada: '11:05', motivo: 'Dor ao urinar e febre leve' },
        { id: 'TR-103', nome: 'Pedro Henrique', idade: 8, chegada: '11:15', motivo: 'Queda de bicicleta, corte no supercílio' },
    ]);

    const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
    const [classificacao, setClassificacao] = useState(null); // vermelho, laranja, amarelo, verde, azul

    // Estado do formulário de triagem
    const [sinaisVitais, setSinaisVitais] = useState({
        pressao: '', freqCardiaca: '', temperatura: '', saturacao: '', dor: '0', observacao: ''
    });

    const handleSelecionarPaciente = (paciente) => {
        setPacienteSelecionado(paciente);
        setClassificacao(null); // Reseta a cor ao trocar de paciente
        setSinaisVitais({ pressao: '', freqCardiaca: '', temperatura: '', saturacao: '', dor: '0', observacao: '' });
    };

    const handleSalvarTriagem = () => {
        if (!classificacao) {
            alert("Por favor, selecione uma cor de risco antes de salvar.");
            return;
        }

        // Simula o salvamento e remove o paciente da fila de triagem
        alert(`Triagem salva! Paciente classificado como Risco ${classificacao.toUpperCase()}. O paciente foi enviado para o Prontuário Médico.`);
        setFilaEspera(filaEspera.filter(p => p.id !== pacienteSelecionado.id));
        setPacienteSelecionado(null);
    };

    return (
        <div className="layout-container">
            <aside className="sidebar">
                <div className="logo-container">
                    <img src={logo} alt="FortalMed" width="180" />
                </div>
                {/* 3. Navegação do menu lateral corrigida */}
                <nav className="menu-nav">
                    <a 
                        onClick={() => navigate('/painel-triagem')} 
                        className="menu-item active"
                        style={{ cursor: 'pointer' }}
                    >
                        Fila de Triagem
                    </a>
                    <a 
                        onClick={() => navigate('/mapa-leitos')} 
                        className="menu-item"
                        style={{ cursor: 'pointer' }}
                    >
                        Mapa de Leitos
                    </a>
                </nav>
            </aside>

            <main className="main-content">
                <header className="top-bar">
                    <SearchBar />
                </header>

                <div className="content triagem-grid">
                    
                    {/* COLUNA ESQUERDA: Fila de Espera */}
                    <div className="fila-container">
                        <div className="fila-header">
                            <h2>Aguardando Triagem</h2>
                            <span className="badge-contador">{filaEspera.length} pacientes</span>
                        </div>
                        
                        <div className="lista-pacientes">
                            {filaEspera.length === 0 ? (
                                <p className="texto-vazio" style={{padding: '24px', textAlign: 'center'}}>Nenhum paciente aguardando.</p>
                            ) : (
                                filaEspera.map(paciente => (
                                    <div 
                                        key={paciente.id} 
                                        className={`card-paciente-fila ${pacienteSelecionado?.id === paciente.id ? 'selecionado' : ''}`}
                                        onClick={() => handleSelecionarPaciente(paciente)}
                                    >
                                        <div className="paciente-info-principal">
                                            <h3>{paciente.nome}</h3>
                                            <span>{paciente.idade} anos</span>
                                        </div>
                                        <div className="paciente-motivo">
                                            <FiAlertTriangle className="icon-motivo"/> 
                                            {paciente.motivo}
                                        </div>
                                        <div className="paciente-chegada">
                                            <LuClock /> Chegada: {paciente.chegada}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* COLUNA DIREITA: Formulário de Classificação */}
                    <div className="formulario-triagem-container">
                        {pacienteSelecionado ? (
                            <div className="form-conteudo">
                                {/* CABEÇALHO DO FORMULÁRIO COM O NOVO BOTÃO DE FECHAR */}
                                <div className="form-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h2>Classificação de Risco</h2>
                                        <p>Avaliando: <strong>{pacienteSelecionado.nome}</strong></p>
                                    </div>
                                    <button 
                                        className="btn-fechar-paciente" 
                                        onClick={() => setPacienteSelecionado(null)}
                                        title="Fechar avaliação"
                                    >
                                        <LuX />
                                    </button>
                                </div>

                                <div className="sinais-vitais-grid">
                                    <div className="input-group">
                                        <label><LuActivity /> P. Arterial (mmHg)</label>
                                        <input type="text" placeholder="120/80" value={sinaisVitais.pressao} onChange={e => setSinaisVitais({...sinaisVitais, pressao: e.target.value})} />
                                    </div>
                                    <div className="input-group">
                                        <label><LuHeartPulse /> F. Cardíaca (bpm)</label>
                                        <input type="number" placeholder="85" value={sinaisVitais.freqCardiaca} onChange={e => setSinaisVitais({...sinaisVitais, freqCardiaca: e.target.value})} />
                                    </div>
                                    <div className="input-group">
                                        <label><LuThermometer /> Temp. (°C)</label>
                                        <input type="number" placeholder="36.5" value={sinaisVitais.temperatura} onChange={e => setSinaisVitais({...sinaisVitais, temperatura: e.target.value})} />
                                    </div>
                                    <div className="input-group">
                                        <label><LuWind /> Sat. O² (%)</label>
                                        <input type="number" placeholder="98" value={sinaisVitais.saturacao} onChange={e => setSinaisVitais({...sinaisVitais, saturacao: e.target.value})} />
                                    </div>
                                </div>

                                <div className="input-group full-width">
                                    <label>Escala de Dor (0 a 10)</label>
                                    <input type="range" min="0" max="10" value={sinaisVitais.dor} onChange={e => setSinaisVitais({...sinaisVitais, dor: e.target.value})} />
                                    <div className="range-labels">
                                        <span>Sem dor (0)</span>
                                        <span style={{color: '#d93025', fontWeight: 'bold'}}>Dor Máxima (10): {sinaisVitais.dor}</span>
                                    </div>
                                </div>

                                <div className="input-group full-width" style={{marginTop: '16px'}}>
                                    <label>Observações Clínicas</label>
                                    <textarea 
                                        rows="3" 
                                        placeholder="Breve relato do estado geral do paciente..."
                                        value={sinaisVitais.observacao}
                                        onChange={e => setSinaisVitais({...sinaisVitais, observacao: e.target.value})}
                                    ></textarea>
                                </div>

                                {/* PROTOCOLO DE MANCHESTER */}
                                <div className="secao-manchester">
                                    <h3>Protocolo de Manchester</h3>
                                    <div className="paleta-cores">
                                        <button className={`cor-btn cor-vermelho ${classificacao === 'vermelho' ? 'ativo' : ''}`} onClick={() => setClassificacao('vermelho')}>Emergência</button>
                                        <button className={`cor-btn cor-laranja ${classificacao === 'laranja' ? 'ativo' : ''}`} onClick={() => setClassificacao('laranja')}>Muito Urgente</button>
                                        <button className={`cor-btn cor-amarelo ${classificacao === 'amarelo' ? 'ativo' : ''}`} onClick={() => setClassificacao('amarelo')}>Urgente</button>
                                        <button className={`cor-btn cor-verde ${classificacao === 'verde' ? 'ativo' : ''}`} onClick={() => setClassificacao('verde')}>Pouco Urgente</button>
                                        <button className={`cor-btn cor-azul ${classificacao === 'azul' ? 'ativo' : ''}`} onClick={() => setClassificacao('azul')}>Não Urgente</button>
                                    </div>
                                </div>

                                <div className="form-footer">
                                    <button className="btn-salvar-triagem" onClick={handleSalvarTriagem}>
                                        <LuSave /> Finalizar Triagem
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="estado-vazio-form">
                                <LuActivity className="icone-gigante" />
                                <h3>Nenhum paciente selecionado</h3>
                                <p>Selecione um paciente na fila à esquerda para iniciar a avaliação e classificação de risco.</p>
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}