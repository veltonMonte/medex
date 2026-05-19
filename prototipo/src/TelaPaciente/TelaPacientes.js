import React, { useState, useEffect } from 'react';
import logo from "./img/logo192.png";
import './TelaPacientes.css';

// Componentes e Ícones
import SearchBar from '../components/SearchBar';
import ModalCadastroPaciente from '../components/ModalCadastroPaciente';
import ModalGerarAtendimento from '../components/ModalGerarAtendimento';
import { LuEllipsisVertical } from "react-icons/lu";

export default function TelaPacientes() {
    // 1. ESTADOS
    const [pacientes, setPacientes] = useState([
        { id: '06300200123456', nome: 'Enzo Linhares Brasil', cpf: '123.456.789-00', status: 'Ativo', alergias: 'Dipirona' },
        { id: '06300200987654', nome: 'Julio Vinicius', cpf: '987.654.321-11', status: 'Ativo', alergias: 'Nenhuma' }
    ]);

    const [modalAberto, setModalAberto] = useState(false);
    const [menuAbertoId, setMenuAbertoId] = useState(null);
    const [pacienteParaEditar, setPacienteParaEditar] = useState(null);

    // Novos estados para o Atendimento:
    const [modalAtendimentoAberto, setModalAtendimentoAberto] = useState(false);
    const [pacienteParaAtendimento, setPacienteParaAtendimento] = useState(null);

    // ==========================================
    // NOVA FUNÇÃO: Fechar popover ao clicar fora
    // ==========================================
    useEffect(() => {
        const lidarComCliqueFora = (event) => {
            if (!event.target.closest('.action-cell')) {
                setMenuAbertoId(null);
            }
        };

        document.addEventListener('mousedown', lidarComCliqueFora);
        return () => {
            document.removeEventListener('mousedown', lidarComCliqueFora);
        };
    }, []);

    // ==========================================
    // NOVA FUNÇÃO: Atalho de Teclado (Alt + N)
    // ==========================================
    useEffect(() => {
        const lidarComTeclado = (event) => {
            // Verifica se apertou Alt e a tecla N (ignorando maiúscula/minúscula)
            if (event.altKey && event.key.toLowerCase() === 'n') {
                event.preventDefault(); // Evita que o navegador tente fazer outra ação padrão
                setPacienteParaEditar(null); // Garante que o formulário venha limpo
                setModalAberto(true); // Dispara a abertura do modal instantaneamente
            }
        };

        window.addEventListener('keydown', lidarComTeclado);
        
        // Limpeza do evento quando a tela for fechada para evitar vazamento de memória
        return () => {
            window.removeEventListener('keydown', lidarComTeclado);
        };
    }, []);

    // 2. FUNÇÕES CRUD
    const abrirEdicao = (paciente) => {
        setPacienteParaEditar(paciente);
        setModalAberto(true);
        setMenuAbertoId(null);
    };

    const salvarPaciente = (dadosForm) => {
        if (pacienteParaEditar) {
            // Edição
            setPacientes(pacientes.map(p => 
                p.id === pacienteParaEditar.id ? { ...p, ...dadosForm } : p
            ));
        } else {
            // Novo
            const novoId = "06300" + Math.floor(100000000 + Math.random() * 900000000);
            setPacientes([{ ...dadosForm, id: novoId, status: 'Ativo' }, ...pacientes]);
        }
        setPacienteParaEditar(null);
    };

    // ==========================================
    // NOVA FUNÇÃO: Soft Delete (Desativar/Ativar)
    // ==========================================
    const alternarStatusPaciente = (id, statusAtual) => {
        const novoStatus = statusAtual.toLowerCase() === 'ativo' ? 'Desativo' : 'Ativo';
        const acao = novoStatus === 'Desativo' ? 'desativar' : 'reativar';

        if (window.confirm(`Deseja realmente ${acao} este cadastro?`)) {
            setPacientes(pacientes.map(p => 
                p.id === id ? { ...p, status: novoStatus } : p
            ));
            setMenuAbertoId(null);
        }
    };

    return (
        <div className="layout-container">
            <aside className="sidebar">
                <div className="logo-container">
                    <img src={logo} alt="FortalMed" width="180" />
                </div>
                <nav className="menu-nav">
                    <a href="#" className="menu-item active">Cadastro de Pacientes</a>
                </nav>
            </aside>

            <main className="main-content">
                <header className="top-bar">
                    <SearchBar />
                </header>

                <div className="content">
                    <div className="content-header">
                        <div className="text-group">
                            <h1>Cadastro de Pacientes</h1>
                            <p className="sub-header"></p>
                        </div>
                        <button className="btn-primary" onClick={() => { setPacienteParaEditar(null); setModalAberto(true); }}>
                            + Novo Paciente
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Paciente</th>
                                    <th>Carteira</th>
                                    <th>Status</th>
                                    <th className="text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pacientes.map((p) => {
                                    const statusClass = p.status.toLowerCase() === 'ativo' ? 'status-ativo' : 'status-desativo';
                                    
                                    return (
                                        <tr key={p.id} className="row-hover">
                                            <td className="nome-paciente" onClick={() => alert(`Abrindo prontuário de ${p.nome}...`)}>
                                                {p.nome}
                                            </td>
                                            
                                            <td>
                                                <div className="id-text">{p.id}</div>
                                            </td>
                                            
                                            <td>
                                                <span className={`badge-status ${statusClass}`}>
                                                    {p.status}
                                                </span>
                                            </td>
                                            
                                            <td className="action-cell">
                                                <button className="btn-dots" onClick={() => setMenuAbertoId(menuAbertoId === p.id ? null : p.id)}>
                                                    <LuEllipsisVertical />
                                                </button>
                                                
                                                {menuAbertoId === p.id && (
                                                    <div className="action-popover show">
                                                        <button 
                                                            className="text-primary" 
                                                            onClick={() => {
                                                                setPacienteParaAtendimento(p); // Salva qual paciente foi clicado
                                                                setModalAtendimentoAberto(true); // Abre o modal
                                                                setMenuAbertoId(null); // Fecha o menu de 3 pontinhos
                                                            }}
                                                            style={{ fontWeight: '600', color: '#1a73e8', borderBottom: '1px solid #f1f3f4' }}
                                                        >
                                                            Gerar Atendimento
                                                        </button>
                                                        
                                                        <button onClick={() => abrirEdicao(p)}>Editar Dados</button>
                                                        
                                                        {/* Lógica do botão Desativar / Reativar */}
                                                        <button 
                                                            className="text-warning" 
                                                            onClick={() => alternarStatusPaciente(p.id, p.status)}
                                                            style={{ color: p.status.toLowerCase() === 'ativo' ? '#e2711d' : '#1e8e3e' }}
                                                        >
                                                            {p.status.toLowerCase() === 'ativo' ? 'Desativar' : 'Reativar Cadastro'}
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {modalAberto && (
                <ModalCadastroPaciente 
                    aoFechar={() => { setModalAberto(false); setPacienteParaEditar(null); }} 
                    aoSalvar={salvarPaciente}
                    dadosIniciais={pacienteParaEditar} 
                />
            )}
            
            {modalAtendimentoAberto && pacienteParaAtendimento && (
                <ModalGerarAtendimento 
                    paciente={pacienteParaAtendimento}
                    aoFechar={() => {
                        setModalAtendimentoAberto(false);
                        setPacienteParaAtendimento(null);
                    }}
                    aoConfirmar={(dadosAtendimento) => {
                        // 1. Pega a fila de triagem que já existe (ou cria uma vazia se não existir)
                        const filaTriagemAtual = JSON.parse(localStorage.getItem('fila_triagem')) || [];
                        
                        // 2. Monta o "ticket" do paciente que vai para a enfermeira
                        const novoPacienteNaFila = {
                            idAtendimento: Date.now(), // Gera um ID único
                            pacienteId: pacienteParaAtendimento.id,
                            nome: pacienteParaAtendimento.nome,
                            queixa: dadosAtendimento.queixa,
                            prioridadeRecepcao: dadosAtendimento.prioridadeRecepcao,
                            horaChegada: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                            status: 'Aguardando Triagem'
                        };

                        // 3. Adiciona o paciente na fila e salva no navegador
                        filaTriagemAtual.push(novoPacienteNaFila);
                        localStorage.setItem('fila_triagem', JSON.stringify(filaTriagemAtual));

                        // 4. Avisa o recepcionista e fecha o modal
                        alert(`Sucesso! ${pacienteParaAtendimento.nome} foi enviado para a fila da Triagem.`);
                        setModalAtendimentoAberto(false);
                        setPacienteParaAtendimento(null);
                    }}
                />
            )}
        </div>
    );
}