import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from "../TelaPaciente/img/logo192.png";
import './Prontuario.css';
import { LuSend, LuClock, LuStethoscope, LuFileText, LuCalendarDays, LuPlus } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";
import SearchBar from '../components/SearchBar';
import ModalPrescricao from '../components/ModalPrescricao';
import ModalResumoAlta from '../components/ModalResumoAlta'; // Nova importação

export default function Prontuario() {
    const location = useLocation();
    const navigate = useNavigate();

    const dadosVindosDaFila = location.state?.paciente;

    const paciente = { 
        id: dadosVindosDaFila?.id || '---', 
        nome: dadosVindosDaFila?.nome || 'Selecione um Paciente', 
        idade: dadosVindosDaFila?.idade || '26', 
        peso: '78kg', 
        alergias: 'Dipirona',
        risco: dadosVindosDaFila?.risco || 'azul' 
    };

    const historicoAtendimentos = [
        { 
            id: 'AT-9982', 
            dataInicio: new Date().toLocaleDateString('pt-BR'), horaInicio: '10:15', 
            dataFim: null, horaFim: null, 
            motivo: dadosVindosDaFila?.motivo || 'Consulta de Rotina', 
            status: 'Em Atendimento' 
        },
        { 
            id: 'AT-8104', 
            dataInicio: '11/03/2026', horaInicio: '22:30', 
            dataFim: '12/03/2026', horaFim: '11:30', 
            motivo: 'Crise de Enxaqueca', status: 'Alta Médica' 
        }
    ];

    const [atendimentoAtivo, setAtendimentoAtivo] = useState(historicoAtendimentos[0]);

    const [bancoDeEvolucoes, setBancoDeEvolucoes] = useState([
        { id: 1, atendimentoId: 'AT-8104', autor: 'Recepção', tipo: 'Admissão', data: '11/03/2026', hora: '22:30', texto: 'Paciente deu entrada com cefaleia intensa.' },
        { id: 2, atendimentoId: 'AT-9982', autor: 'Triagem', tipo: 'Manchester', data: new Date().toLocaleDateString('pt-BR'), hora: '10:15', texto: `Paciente classificado como ${paciente.risco.toUpperCase()}. Queixa: ${paciente.motivo}` },
    ]);

    const [novaEvolucao, setNovaEvolucao] = useState('');
    const textareaRef = useRef(null);
    
    const [modalPrescricaoAberto, setModalPrescricaoAberto] = useState(false);
    // Novo estado para controlar o Modal de Alta
    const [modalAltaAberto, setModalAltaAberto] = useState(false); 

    // HISTÓRIA 10: Foco Automático
    useEffect(() => {
        if (atendimentoAtivo.status === 'Em Atendimento' && textareaRef.current && !modalPrescricaoAberto && !modalAltaAberto) {
            textareaRef.current.focus();
        }
    }, [atendimentoAtivo, modalPrescricaoAberto, modalAltaAberto]);

    // HISTÓRIA 10: Lógica para fazer o campo de texto crescer dinamicamente
    const lidarComDigitacao = (e) => {
        setNovaEvolucao(e.target.value);
        e.target.style.height = 'auto'; // Reseta a altura
        e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta pro tamanho do texto
    };

    const threadFiltrada = bancoDeEvolucoes.filter(evo => evo.atendimentoId === atendimentoAtivo.id);

    const salvarEvolucao = () => {
        if (!novaEvolucao.trim()) return;
        const dataHoje = new Date().toLocaleDateString('pt-BR');
        const horaAgora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const novaEntrada = {
            id: bancoDeEvolucoes.length + 1,
            atendimentoId: atendimentoAtivo.id,
            autor: 'Médico',
            tipo: 'Evolução',
            data: dataHoje,
            hora: horaAgora,
            texto: novaEvolucao
        };

        setBancoDeEvolucoes([...bancoDeEvolucoes, novaEntrada]);
        setNovaEvolucao(''); 
        
        // Reseta o tamanho do campo visualmente após salvar
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.focus();
        }
    };

    const salvarPrescricaoNaThread = (medicamentos) => {
        const dataHoje = new Date().toLocaleDateString('pt-BR');
        const horaAgora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const textoPrescricao = `📄 PRESCRIÇÃO GERADA:\n${medicamentos.map(med => `• ${med}`).join('\n')}`;

        const novaEntrada = {
            id: bancoDeEvolucoes.length + 1,
            atendimentoId: atendimentoAtivo.id,
            autor: 'Sistema (Receituário)',
            tipo: 'Documento',
            data: dataHoje,
            hora: horaAgora,
            texto: textoPrescricao
        };

        setBancoDeEvolucoes([...bancoDeEvolucoes, novaEntrada]);
        setModalPrescricaoAberto(false);
    };

    // Função atualizada para receber os dados do Modal de Alta
    const encerrarAtendimento = (dadosAlta) => {
        // Em um cenário real, salvaria dadosAlta.diagnostico e dadosAlta.prescricaoCasa no back-end
        alert(`Atendimento finalizado com sucesso!\nDiagnóstico: ${dadosAlta.diagnostico}\nO paciente foi liberado.`);
        setModalAltaAberto(false);
        navigate('/fila-atendimento'); 
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            salvarEvolucao();
        }
    };

    return (
        <div className="layout-container">
            <aside className="sidebar">
                <div className="logo-container">
                    <img src={logo} alt="FortalMed" width="180" />
                </div>
                <nav className="menu-nav">
                    <a onClick={() => navigate('/fila-atendimento')} className="menu-item" style={{ cursor: 'pointer' }}>Fila Médica</a>
                    <a className="menu-item active">Prontuários</a>
                </nav>
            </aside>

            <main className="main-content">
                <header className="top-bar">
                    <SearchBar />
                </header>

                <div className="content prontuario-grid-3">
                    
                    <div className="resumo-clinico">
                        <div className="resumo-header">
                            <h2>{paciente.nome}</h2>
                            <p>ID: {paciente.id} • {paciente.idade} anos • {paciente.peso}</p>
                            <span className={`tag-manchester tag-${paciente.risco}`} style={{marginTop: '10px', display: 'inline-block'}}>
                                {paciente.risco.toUpperCase()}
                            </span>
                        </div>
                        
                        <div className="alerta-card">
                            <FiAlertTriangle className="alerta-icon" />
                            <div>
                                <strong>Alergias Relatadas</strong>
                                <p>{paciente.alergias}</p>
                            </div>
                        </div>

                        <div className="resumo-section">
                            <h3><LuStethoscope className="icon-resumo" /> Queixa Principal</h3>
                            <p>{atendimentoAtivo.motivo}</p>
                        </div>
                    </div>

                    <div className="thread-container">
                        <div className="thread-header">
                            <h2>Linha do Tempo Clínica</h2>
                            {atendimentoAtivo.status === 'Alta Médica' && (
                                <span className="badge-somente-leitura">ATENDIMENTO ENCERRADO</span>
                            )}
                        </div>

                        <div className="thread-historico">
                            {threadFiltrada.map((item, index) => {
                                const mostrarDivisor = index === 0 || threadFiltrada[index - 1].data !== item.data;
                                return (
                                    <React.Fragment key={item.id}>
                                        {mostrarDivisor && (
                                            <div className="divisor-data">
                                                <span>{item.data}</span>
                                            </div>
                                        )}
                                        <div className="thread-balao">
                                            <div className="balao-header">
                                                <strong>{item.autor}</strong>
                                                <span className="balao-tipo">{item.tipo}</span>
                                                <span className="balao-hora"><LuClock /> {item.hora}</span>
                                            </div>
                                            <div className="balao-corpo" style={{whiteSpace: 'pre-line'}}>
                                                {item.texto}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        {atendimentoAtivo.status === 'Em Atendimento' && (
                            <div className="thread-input-area">
                                
                                <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button 
                                        style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'white', border: '1px solid #dadce0', padding: '6px 12px', borderRadius: '16px', fontSize: '12px', cursor: 'pointer', color: '#1a73e8', fontWeight: '500' }}
                                        onClick={() => setModalPrescricaoAberto(true)}
                                    >
                                        <LuPlus /> Nova Prescrição
                                    </button>

                                    <button 
                                        style={{ background: '#d93025', color: 'white', border: 'none', padding: '6px 16px', borderRadius: '16px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s' }}
                                        onClick={() => setModalAltaAberto(true)} /* Alterado para abrir o modal */
                                        onMouseOver={(e) => e.target.style.background = '#b31412'}
                                        onMouseOut={(e) => e.target.style.background = '#d93025'}
                                    >
                                        Finalizar Atendimento
                                    </button>
                                </div>

                                <textarea 
                                    ref={textareaRef}
                                    className="input-evolucao"
                                    placeholder="Digite a evolução médica... (Enter para salvar)"
                                    value={novaEvolucao}
                                    onChange={lidarComDigitacao}
                                    onKeyDown={handleKeyDown}
                                    style={{ resize: 'none', overflow: 'hidden', minHeight: '60px' }}
                                />
                                <div className="input-actions">
                                    <span className="dica-atalho">Atalho: <strong>Enter</strong></span>
                                    <button className="btn-enviar" onClick={salvarEvolucao} disabled={!novaEvolucao.trim()}>
                                        <LuSend style={{marginRight: '6px'}}/> Salvar Evolução
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="historico-lateral">
                        <div className="historico-header">
                            <h3><LuCalendarDays className="icon-resumo"/> Atendimentos</h3>
                        </div>
                        <div className="lista-atendimentos">
                            {historicoAtendimentos.map(atd => (
                                <div 
                                    key={atd.id} 
                                    className={`card-atendimento ${atendimentoAtivo.id === atd.id ? 'ativo' : ''}`}
                                    onClick={() => setAtendimentoAtivo(atd)}
                                >
                                    <div className="atd-motivo">{atd.motivo}</div>
                                    <div className="atd-tempos">
                                        <div className="tempo-linha">{atd.dataInicio} às {atd.horaInicio}</div>
                                    </div>
                                    <div className={`atd-status ${atd.status === 'Alta Médica' ? 'status-fechado' : 'status-aberto'}`}>
                                        {atd.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <ModalPrescricao 
                    isOpen={modalPrescricaoAberto} 
                    onClose={() => setModalPrescricaoAberto(false)}
                    onSalvar={salvarPrescricaoNaThread}
                    alergias={paciente.alergias}
                />

                {/* Novo Modal de Alta Médica adicionado aqui */}
                <ModalResumoAlta 
                    isOpen={modalAltaAberto}
                    onClose={() => setModalAltaAberto(false)}
                    onConfirmarAlta={encerrarAtendimento}
                    paciente={paciente}
                />
            </main>
        </div>
    );
}