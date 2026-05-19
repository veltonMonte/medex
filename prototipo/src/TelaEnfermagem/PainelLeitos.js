import React, { useState } from 'react';
import logo from "../TelaPaciente/img/logo192.png";
import './PainelLeitos.css';
import { LuBedDouble, LuPill, LuUser, LuLogOut } from "react-icons/lu";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import SearchBar from '../components/SearchBar';
import ModalChecklistAlta from './ModalChecklistAlta';

export default function PainelLeitos() {
    // Banco de Dados Simulado dos Leitos
    const [leitos, setLeitos] = useState([
        { id: 'L-01', status: 'ocupado', paciente: 'João Almeida', idade: 45, medicacao: 'em-dia', alerta: null },
        { id: 'L-02', status: 'ocupado', paciente: 'Maria Souza', idade: 62, medicacao: 'atrasada', alerta: 'Antibiótico atrasado 30min' },
        { id: 'L-03', status: 'alta', paciente: 'Enzo Linhares Brasil', idade: 26, medicacao: 'em-dia', alerta: null },
        { id: 'L-04', status: 'livre', paciente: null, idade: null, medicacao: null, alerta: null },
        { id: 'L-05', status: 'ocupado', paciente: 'Carlos Gomes', idade: 50, medicacao: 'em-dia', alerta: null },
        { id: 'L-06', status: 'ocupado', paciente: 'Ana Paula', idade: 33, medicacao: 'pendente', alerta: 'Aguardando farmácia' },
    ]);

    const [filtroAtivo, setFiltroAtivo] = useState('todos');
    const [modalAltaAberto, setModalAltaAberto] = useState(false);
    const [leitoParaAlta, setLeitoParaAlta] = useState(null);

    // Função para abrir o checklist
    const abrirChecklist = (leito) => {
        setLeitoParaAlta(leito);
        setModalAltaAberto(true);
    };

    // Função que libera o leito de fato (Trava de Segurança)
    const confirmarLiberacaoLeito = (idLeito) => {
        const novosLeitos = leitos.map(leito => {
            if (leito.id === idLeito) {
                return { ...leito, status: 'livre', paciente: null, idade: null, medicacao: null, alerta: null };
            }
            return leito;
        });
        
        setLeitos(novosLeitos);
        setModalAltaAberto(false);
        setLeitoParaAlta(null);
        alert(`Sucesso! O leito ${idLeito} foi liberado e está pronto para higienização.`);
    };

    const leitosFiltrados = leitos.filter(leito => {
        if (filtroAtivo === 'alta') return leito.status === 'alta';
        if (filtroAtivo === 'alertas') return leito.medicacao === 'atrasada' || leito.medicacao === 'pendente';
        if (filtroAtivo === 'livres') return leito.status === 'livre';
        return true;
    });

    const getStatusInfo = (leito) => {
        if (leito.status === 'livre') return { cor: 'status-cinza', icone: <FiCheckCircle />, texto: 'Leito Disponível' };
        if (leito.status === 'alta') return { cor: 'status-verde', icone: <LuLogOut />, texto: 'Alta Liberada' };
        if (leito.medicacao === 'atrasada') return { cor: 'status-vermelho', icone: <FiAlertTriangle />, texto: 'Atenção Requerida' };
        return { cor: 'status-azul', icone: <LuBedDouble />, texto: 'Ocupado / Estável' };
    };

    return (
        <div className="layout-container">
            <aside className="sidebar">
                <div className="logo-container">
                    <img src={logo} alt="FortalMed" width="180" />
                </div>
                <nav className="menu-nav">
                    <a href="#" className="menu-item">Triagem</a>
                    <a href="#" className="menu-item active">Mapa de Leitos</a>
                </nav>
            </aside>

            <main className="main-content">
                <header className="top-bar">
                    <SearchBar />
                </header>

                <div className="content">
                    <div className="painel-header">
                        <div>
                            <h1>Ala Clínica Médica</h1>
                            <p className="sub-header">Gestão de Internação e Transição de Cuidado</p>
                        </div>
                        <div className="filtros-rapidos">
                            <button className={`btn-filtro ${filtroAtivo === 'todos' ? 'ativo' : ''}`} onClick={() => setFiltroAtivo('todos')}>
                            Todos ({leitos.length})
                            </button>
                            <button className={`btn-filtro filtro-alta ${filtroAtivo === 'alta' ? 'ativo' : ''}`} onClick={() => setFiltroAtivo('alta')}>
                            Altas ({leitos.filter(l => l.status === 'alta').length})
                            </button>
                            <button className={`btn-filtro filtro-alerta ${filtroAtivo === 'alertas' ? 'ativo' : ''}`} onClick={() => setFiltroAtivo('alertas')}>
                            Alertas ({leitos.filter(l => l.medicacao === 'atrasada' || l.medicacao === 'pendente').length})
                            </button>
                        </div>
                    </div>

                    <div className="leitos-grid">
                        {leitosFiltrados.map(leito => {
                            const info = getStatusInfo(leito);
                            return (
                                <div key={leito.id} className={`card-leito ${info.cor}`}>
                                    <div className="leito-header">
                                        <span className="leito-numero">{leito.id}</span>
                                        <span className="leito-badge">{info.icone} {info.texto}</span>
                                    </div>
                                    <div className="leito-body">
                                        {leito.status === 'livre' ? (
                                            <div className="leito-vazio">
                                                <LuBedDouble className="icone-vazio" />
                                                <p>Pronto para admissão</p>
                                            </div>
                                        ) : (
                                            <>
                                                <h3 className="paciente-nome"><LuUser /> {leito.paciente}</h3>
                                                <p className="paciente-info">{leito.idade} anos</p>
                                                <div className={`indicador-med ${leito.medicacao}`}>
                                                    <LuPill /> <span>{leito.medicacao === 'em-dia' ? 'Medicação em dia' : leito.alerta || 'Pendente'}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="leito-footer">
                                        {leito.status === 'alta' ? (
                                            <button className="btn-acao btn-alta" onClick={() => abrirChecklist(leito)}>
                                                Iniciar Checklist de Alta
                                            </button>
                                        ) : leito.status !== 'livre' ? (
                                            <button className="btn-acao">Ver Prontuário</button>
                                        ) : null}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <ModalChecklistAlta 
                    isOpen={modalAltaAberto}
                    onClose={() => setModalAltaAberto(false)}
                    leito={leitoParaAlta}
                    onConfirmarAlta={confirmarLiberacaoLeito}
                />
            </main>
        </div>
    );
}