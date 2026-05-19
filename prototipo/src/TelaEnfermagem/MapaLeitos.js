import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../TelaPaciente/img/logo192.png";
import './MapaLeitos.css';
import { FiUser, FiCheckSquare, FiClock, FiAlertCircle, FiCheck, FiXCircle } from "react-icons/fi";
import SearchBar from '../components/SearchBar';
import ModalChecklistAlta from './ModalChecklistAlta'; // Importação adicionada

export default function MapaLeitos() {
    const navigate = useNavigate();

    const [leitos, setLeitos] = useState([
        { id: 1, numero: '01', setor: 'Observação', status: 'ocupado', paciente: 'Marcos Oliveira', idade: '45 anos', risco: 'laranja' },
        { id: 2, numero: '02', setor: 'Observação', status: 'livre', paciente: null },
        { id: 3, numero: '03', setor: 'Emergência', status: 'ocupado', paciente: 'Roberto Alves', idade: '52 anos', risco: 'vermelho' },
        { id: 4, numero: '04', setor: 'Emergência', status: 'limpeza', paciente: null },
        { id: 5, numero: '05', setor: 'Pediatria', status: 'manutencao', paciente: null },
        { id: 6, numero: '06', setor: 'Observação', status: 'alta', paciente: 'Enzo Linhares Brasil', idade: '26 anos', risco: 'azul' }, // Sincronizado com PainelLeitos
    ]);

    const [prescricoes, setPrescricoes] = useState([
        { id: 101, leitoId: 1, medicamento: 'Cefazolina 1g IV', horario: '14:00', status: 'pendente' },
        { id: 102, leitoId: 1, medicamento: 'Cetoprofeno 100mg IV', horario: '14:00', status: 'pendente' },
        { id: 103, leitoId: 3, medicamento: 'Morfina 2mg IV', horario: 'Agora', status: 'pendente' },
        { id: 104, leitoId: 3, medicamento: 'AAS 100mg', horario: 'Agora', status: 'concluido' },
    ]);

    const [leitoSelecionado, setLeitoSelecionado] = useState(null);
    const [modalAltaAberto, setModalAltaAberto] = useState(false);

    const prescricoesDoLeito = prescricoes.filter(p => p.leitoId === leitoSelecionado?.id);

    const toggleMedicamento = (prescricaoId) => {
        setPrescricoes(prescricoes.map(p => {
            if (p.id === prescricaoId) {
                return { ...p, status: p.status === 'pendente' ? 'concluido' : 'pendente' };
            }
            return p;
        }));
    };

    // Função que conecta o mapa ao checklist de alta
    const handleLiberarLeito = () => {
        setModalAltaAberto(true);
    };

    const confirmarSaidaPaciente = (idLeito) => {
        setLeitos(leitos.map(l => l.id === idLeito ? { ...l, status: 'limpeza', paciente: null } : l));
        setModalAltaAberto(false);
        setLeitoSelecionado(null);
        alert("Paciente liberado! Leito enviado para Higienização.");
    };

    return (
        <div className="layout-container">
            <aside className="sidebar">
                <div className="logo-container">
                    <img src={logo} alt="FortalMed" width="180" />
                </div>
                <nav className="menu-nav">
                    <a onClick={() => navigate('/fila-atendimento')} className="menu-item" style={{ cursor: 'pointer' }}>Fila Médica</a>
                    <a onClick={() => navigate('/mapa-leitos')} className="menu-item active" style={{ cursor: 'pointer' }}>Mapa de Leitos</a>
                </nav>
            </aside>

            <main className="main-content">
                <header className="top-bar">
                    <SearchBar />
                    <div className="top-bar-right">
                        <div className="status-medico">
                            <span className="dot-online"></span> Enfermagem - Enf. Mariana
                        </div>
                    </div>
                </header>

                <div className={`content mapa-layout ${leitoSelecionado ? 'painel-aberto' : ''}`}>
                    <div className="area-mapa">
                        <div className="mapa-header-secao">
                            <div>
                                <h1>Painel de Internação</h1>
                                <p>Gestão visual de leitos e administração de medicamentos</p>
                            </div>
                            <div className="legenda-mapa">
                                <span className="legenda-item"><span className="dot livre"></span> Livre</span>
                                <span className="legenda-item"><span className="dot alta"></span> Alta</span>
                                <span className="legenda-item"><span className="dot ocupado"></span> Ocupado</span>
                                <span className="legenda-item"><span className="dot limpeza"></span> Higienização</span>
                            </div>
                        </div>

                        <div className="grid-leitos">
                            {leitos.map(leito => (
                                <div 
                                    key={leito.id} 
                                    className={`card-leito status-${leito.status} ${leitoSelecionado?.id === leito.id ? 'selecionado' : ''}`}
                                    onClick={() => (leito.status === 'ocupado' || leito.status === 'alta') ? setLeitoSelecionado(leito) : setLeitoSelecionado(null)}
                                >
                                    <div className="leito-header">
                                        <span className="leito-numero">Leito {leito.numero}</span>
                                        <span className="leito-setor">{leito.setor}</span>
                                    </div>
                                    <div className="leito-body">
                                        {(leito.status === 'ocupado' || leito.status === 'alta') ? (
                                            <>
                                                <div className="leito-paciente">
                                                    <FiUser className="icon-paciente" />
                                                    <div className="info-paciente-reduzida">
                                                        <strong>{leito.paciente}</strong>
                                                        <span>{leito.idade}</span>
                                                    </div>
                                                </div>
                                                <span className={`tag-risco tag-${leito.risco}`}>
                                                    {leito.status === 'alta' ? 'ALTA LIBERADA' : 'EM MONITORAMENTO'}
                                                </span>
                                            </>
                                        ) : (
                                            <div className="leito-vazio-msg">
                                                {leito.status === 'livre' && "Disponível"}
                                                {leito.status === 'limpeza' && "Higienização"}
                                                {leito.status === 'manutencao' && "Manutenção"}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {leitoSelecionado && (
                        <aside className="painel-enfermagem animacao-slide">
                            <div className="painel-enf-header">
                                <h2>Leito {leitoSelecionado.numero}</h2>
                                <button className="btn-fechar-painel" onClick={() => setLeitoSelecionado(null)}><FiXCircle /></button>
                            </div>
                            
                            <div className="painel-enf-paciente">
                                <h3>{leitoSelecionado.paciente}</h3>
                                <p>{leitoSelecionado.idade} • {leitoSelecionado.setor}</p>
                            </div>

                            <div className="painel-enf-checklist">
                                <h4><FiCheckSquare style={{marginRight: '8px'}}/> Prescrição Ativa</h4>
                                {prescricoesDoLeito.length > 0 ? (
                                    <div className="lista-checklist">
                                        {prescricoesDoLeito.map(med => (
                                            <div key={med.id} className={`item-checklist ${med.status === 'concluido' ? 'feito' : ''}`} onClick={() => toggleMedicamento(med.id)}>
                                                <div className="check-box">{med.status === 'concluido' && <FiCheck className="check-icon" />}</div>
                                                <div className="check-info">
                                                    <strong>{med.medicamento}</strong>
                                                    <span className="check-hora"><FiClock /> {med.horario}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="sem-prescricao"><FiAlertCircle size={24}/><p>Nenhuma medicação pendente.</p></div>
                                )}
                            </div>

                            <div className="painel-enf-acoes">
                                <button className="btn-registrar-sinais">Registrar Sinais Vitais</button>
                                {leitoSelecionado.status === 'alta' && (
                                    <button className="btn-liberar-leito" onClick={handleLiberarLeito}>Finalizar Alta Médica</button>
                                )}
                            </div>
                        </aside>
                    )}
                </div>

                <ModalChecklistAlta 
                    isOpen={modalAltaAberto}
                    onClose={() => setModalAltaAberto(false)}
                    leito={leitoSelecionado}
                    onConfirmarAlta={confirmarSaidaPaciente}
                />
            </main>
        </div>
    );
}