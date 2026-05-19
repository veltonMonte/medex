import React, { useState } from 'react';
import logo from "../TelaPaciente/img/logo192.png";
import './Configuracoes.css';
import { FiUsers, FiLayout, FiSettings, FiEdit, FiTrash2, FiPlus, FiX, FiGrid, FiBriefcase } from "react-icons/fi";
import SearchBar from '../components/SearchBar';

// Importando os novos modais
import ModalCadastroLeito from '../components/ModalCadastroLeito';
import ModalCadastroConvenio from '../components/ModalCadastroConvenio';

export default function Configuracoes() {
    const [abaAtiva, setAbaAtiva] = useState('usuarios');

    // 1. ESTADOS - Bancos de Dados
    const [usuarios, setUsuarios] = useState([
        { id: 1, nome: "Gabriel Damasceno", perfil: "Administrador", crm: "32185248957", status: "Ativo" },
        { id: 2, nome: "Carlos Silva", perfil: "Médico(a)", crm: "CRM-CE 12345", status: "Ativo" },
        { id: 3, nome: "Sarah Costa", perfil: "Farmaceutico(a)", crm: "CRF-CE 9876", status: "Ativo" },
        { id: 4, nome: "Breno Bezerra", perfil: "Enfermeiro(a)", crm: "COREN-CE 6789", status: "Ativo" },
    ]);

    const [modulos, setModulos] = useState([
        { id: 'mod_triagem', nome: "Triagem Manchester", ativo: true, preco: "Incluso" },
        { id: 'mod_fila', nome: "Fila & Painel TV", ativo: true, preco: "Incluso" },
        { id: 'mod_farmacia', nome: "Farmácia Central", ativo: false, preco: "+ R$ 250/mês" },
        { id: 'mod_leitos', nome: "Mapa de Leitos", ativo: false, preco: "+ R$ 400/mês" },
    ]);

    const [leitos, setLeitos] = useState([
        { id: 1, numero: "01-A", setor: "Observação", tipo: "Maca", status: "Ativo" },
        { id: 2, numero: "02-B", setor: "Observação", tipo: "Maca", status: "Ativo" },
        { id: 3, numero: "UTI-01", setor: "UTI Adulto", tipo: "Cama Elétrica", status: "Manutenção" },
    ]);

    const [convenios, setConvenios] = useState([
        { id: 1, nome: "Unimed Ceará", codigoAns: "063", tipo: "Cooperativa", status: "Ativo" },
        { id: 2, nome: "Unimed Fortaleza", codigoAns: "055", tipo: "Cooperativa", status: "Ativo" },
        { id: 3, nome: "Bradesco Saúde", codigoAns: "005711", tipo: "Seguradora", status: "Ativo" },
        { id: 4, nome: "Particular", codigoAns: "-", tipo: "Particular", status: "Ativo" },
    ]);

    // 2. ESTADOS - Modais
    const [modalAberto, setModalAberto] = useState(false); // Modal Usuários Original
    const [usuarioEmEdicao, setUsuarioEmEdicao] = useState(null);
    const [formData, setFormData] = useState({ nome: '', perfil: 'Médico', crm: '', status: 'Ativo' });

    const [modalLeitoAberto, setModalLeitoAberto] = useState(false);
    const [modalConvenioAberto, setModalConvenioAberto] = useState(false);

    // 3. FUNÇÕES - Usuários e Módulos (Seu código original)
    const toggleModulo = (id) => {
        setModulos(modulos.map(m => m.id === id ? { ...m, ativo: !m.ativo } : m));
    };

    const deletarUsuario = (id, nome) => {
        if (window.confirm(`Tem certeza que deseja remover o acesso de ${nome}?`)) {
            setUsuarios(usuarios.filter(u => u.id !== id));
        }
    };

    const abrirModalNovo = () => {
        setFormData({ nome: '', perfil: 'Médico', crm: '', status: 'Ativo' });
        setUsuarioEmEdicao(null);
        setModalAberto(true);
    };

    const abrirModalEditar = (user) => {
        setFormData({ ...user });
        setUsuarioEmEdicao(user.id);
        setModalAberto(true);
    };

    const salvarUsuario = (e) => {
        e.preventDefault();
        if (usuarioEmEdicao) {
            setUsuarios(usuarios.map(u => u.id === usuarioEmEdicao ? { ...formData, id: usuarioEmEdicao } : u));
        } else {
            const novoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
            setUsuarios([...usuarios, { ...formData, id: novoId }]);
        }
        setModalAberto(false);
    };

    // 4. FUNÇÕES - Leitos e Convênios
    const salvarLeito = (dados) => {
        const novoLeito = { ...dados, id: Date.now() };
        setLeitos([...leitos, novoLeito]);
        setModalLeitoAberto(false);
    };

    const salvarConvenio = (dados) => {
        const novoConvenio = { ...dados, id: Date.now() };
        setConvenios([...convenios, novoConvenio]);
        setModalConvenioAberto(false);
    };

    return (
        <div className="layout-container">
            <aside className="sidebar">
                <div className="logo-container">
                    <img src={logo} alt="FortalMed" width="180" />
                </div>
                <nav className="menu-nav">
                    <a href="/fila-atendimento" className="menu-item">Fila de Atendimento</a>
                    <a href="/atendimento" className="menu-item">Prontuários</a>
                    <a href="/farmacia" className="menu-item">Farmácia Central</a>
                    <a href="/configuracoes" className="menu-item active">Configurações</a>
                </nav>
            </aside>

            <main className="main-content">
                <header className="top-bar">
                    <div className="top-bar-left">
                        <SearchBar />
                    </div>
                    <div className="top-bar-right">
                        <div className="status-medico">
                            <span className="dot-online"></span> Admin - Gabriel
                        </div>
                    </div>
                </header>

                <div className="content">
                    <div className="admin-header-secao">
                        <div>
                            <h1>Configurações do Sistema</h1>
                            <p>Gerencie usuários, estrutura e módulos da sua licença FortalMed</p>
                        </div>
                    </div>

                    <div className="admin-tabs">
                        <button className={`tab-btn ${abaAtiva === 'usuarios' ? 'active' : ''}`} onClick={() => setAbaAtiva('usuarios')}>
                            <FiUsers /> Usuários e Perfis
                        </button>
                        <button className={`tab-btn ${abaAtiva === 'estrutura' ? 'active' : ''}`} onClick={() => setAbaAtiva('estrutura')}>
                            <FiGrid /> Estrutura (Leitos)
                        </button>
                        <button className={`tab-btn ${abaAtiva === 'convenios' ? 'active' : ''}`} onClick={() => setAbaAtiva('convenios')}>
                            <FiBriefcase /> Convênios e ANS
                        </button>
                        <button className={`tab-btn ${abaAtiva === 'modulos' ? 'active' : ''}`} onClick={() => setAbaAtiva('modulos')}>
                            <FiLayout /> Módulos (SaaS)
                        </button>
                    </div>

                    <div className="admin-body">
                        
                        {/* ABA 1: USUÁRIOS (Seu código original) */}
                        {abaAtiva === 'usuarios' && (
                            <div className="tab-content animacao-fade">
                                <div className="acao-topo-tabela">
                                    <h3>Equipe Cadastrada</h3>
                                    <button className="btn-adicionar" onClick={abrirModalNovo}>
                                        <FiPlus /> Novo Usuário
                                    </button>
                                </div>
                                <table className="tabela-admin">
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Perfil</th>
                                            <th>Conselho</th>
                                            <th>Status</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usuarios.map(user => (
                                            <tr key={user.id}>
                                                <td className="fw-bold">{user.nome}</td>
                                                <td><span className={`badge-perfil p-${user.perfil.toLowerCase()}`}>{user.perfil}</span></td>
                                                <td>{user.crm}</td>
                                                <td>
                                                    <span className={`status-dot ${user.status === 'Ativo' ? 'on' : 'off'}`}></span> 
                                                    {user.status}
                                                </td>
                                                <td className="acoes-td">
                                                    <button className="btn-icon text-blue" onClick={() => abrirModalEditar(user)}>
                                                        <FiEdit />
                                                    </button>
                                                    <button className="btn-icon text-red" onClick={() => deletarUsuario(user.id, user.nome)}>
                                                        <FiTrash2 />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {usuarios.length === 0 && (
                                            <tr><td colSpan="5" style={{textAlign: 'center', color: '#5f6368', padding: '20px'}}>Nenhum usuário cadastrado.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* ABA 2: ESTRUTURA (LEITOS) */}
                        {abaAtiva === 'estrutura' && (
                            <div className="tab-content animacao-fade">
                                <div className="acao-topo-tabela">
                                    <div>
                                        <h3>Gestão de Leitos e Setores</h3>
                                        <p className="sub-texto">Estrutura física disponível para internação e observação.</p>
                                    </div>
                                    <button className="btn-adicionar" onClick={() => setModalLeitoAberto(true)}>
                                        <FiPlus /> Novo Leito
                                    </button>
                                </div>
                                <table className="tabela-admin">
                                    <thead>
                                        <tr>
                                            <th>Identificação (Leito)</th>
                                            <th>Setor/Ala</th>
                                            <th>Tipo</th>
                                            <th>Status Operacional</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leitos.map(leito => (
                                            <tr key={leito.id}>
                                                <td className="fw-bold">{leito.numero}</td>
                                                <td>{leito.setor}</td>
                                                <td>{leito.tipo}</td>
                                                <td>
                                                    <span className={`status-dot ${leito.status === 'Ativo' ? 'on' : 'off'}`}></span> 
                                                    {leito.status}
                                                </td>
                                                <td className="acoes-td">
                                                    <button className="btn-icon text-blue"><FiEdit /></button>
                                                    <button className="btn-icon text-red"><FiTrash2 /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* ABA 3: CONVÊNIOS */}
                        {abaAtiva === 'convenios' && (
                            <div className="tab-content animacao-fade">
                                <div className="acao-topo-tabela">
                                    <div>
                                        <h3>Operadoras de Saúde</h3>
                                        <p className="sub-texto">Cadastros utilizados para faturamento TISS/TUSS.</p>
                                    </div>
                                    <button className="btn-adicionar" onClick={() => setModalConvenioAberto(true)}>
                                        <FiPlus /> Nova Operadora
                                    </button>
                                </div>
                                <table className="tabela-admin">
                                    <thead>
                                        <tr>
                                            <th>Nome Comercial</th>
                                            <th>Código (Reg. ANS)</th>
                                            <th>Categoria</th>
                                            <th>Status</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {convenios.map(conv => (
                                            <tr key={conv.id}>
                                                <td className="fw-bold">{conv.nome}</td>
                                                <td>{conv.codigoAns}</td>
                                                <td><span className="badge-perfil p-recepção">{conv.tipo}</span></td>
                                                <td>
                                                    <span className={`status-dot ${conv.status === 'Ativo' ? 'on' : 'off'}`}></span> 
                                                    {conv.status}
                                                </td>
                                                <td className="acoes-td">
                                                    <button className="btn-icon text-blue"><FiEdit /></button>
                                                    <button className="btn-icon text-red"><FiTrash2 /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* ABA 4: MÓDULOS (Seu código original) */}
                        {abaAtiva === 'modulos' && (
                            <div className="tab-content animacao-fade">
                                <div className="acao-topo-tabela">
                                    <div>
                                        <h3>Módulos Contratados</h3>
                                        <p className="sub-texto">Ative ou desative recursos para esta clínica.</p>
                                    </div>
                                </div>
                                <div className="grid-modulos">
                                    {modulos.map(modulo => (
                                        <div key={modulo.id} className={`card-modulo ${modulo.ativo ? 'ativo' : ''}`}>
                                            <div className="modulo-info">
                                                <h4>{modulo.nome}</h4>
                                                <span>{modulo.preco}</span>
                                            </div>
                                            <div className="modulo-toggle">
                                                <label className="switch">
                                                    <input type="checkbox" checked={modulo.ativo} onChange={() => toggleModulo(modulo.id)} />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* =======================================
                    MODAIS
                    ======================================= */}
                
                {/* 1. MODAL DE USUÁRIOS (Seu original) */}
                {modalAberto && (
                    <div className="modal-overlay">
                        <div className="modal-form-container">
                            <div className="modal-form-header">
                                <h3>{usuarioEmEdicao ? 'Editar Usuário' : 'Novo Usuário'}</h3>
                                <button className="btn-fechar-modal" onClick={() => setModalAberto(false)}><FiX /></button>
                            </div>
                            <form onSubmit={salvarUsuario}>
                                <div className="form-group">
                                    <label>Nome Completo</label>
                                    <input 
                                        type="text" required 
                                        value={formData.nome} 
                                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                                        placeholder="Ex: Dra. Ana Souza"
                                    />
                                </div>
                                
                                <div className="form-row">
                                    <div className="form-group half">
                                        <label>Perfil de Acesso</label>
                                        <select value={formData.perfil} onChange={(e) => setFormData({...formData, perfil: e.target.value})}>
                                            <option value="Médico">Médico</option>
                                            <option value="Farmacêutico">Farmacêutico</option>
                                            <option value="Enfermagem">Enfermagem</option>
                                            <option value="Recepção">Recepção</option>
                                            <option value="Admin">Administrador</option>
                                        </select>
                                    </div>
                                    <div className="form-group half">
                                        <label>Registro (CRM/CRF/COREN)</label>
                                        <input 
                                            type="text" 
                                            value={formData.crm} 
                                            onChange={(e) => setFormData({...formData, crm: e.target.value})}
                                            placeholder="Opcional"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Status de Acesso</label>
                                    <div className="toggle-status-container">
                                        <label className="switch">
                                        <input 
                                            type="checkbox" checked={formData.status === 'Ativo'} onChange={() => setFormData({
                                            ...formData, status: formData.status === 'Ativo' ? 'Inativo' : 'Ativo'
                                            })} 
                                        />  
                                        <span className="slider round"></span>
                                        </label>
                                        <span className={`status-label-texto ${formData.status === 'Ativo' ? 'ativo' : 'inativo'}`}>
                                            {formData.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="modal-acoes">
                                    <button type="button" className="btn-cancelar" onClick={() => setModalAberto(false)}>Cancelar</button>
                                    <button type="submit" className="btn-salvar">Salvar Usuário</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* 2. MODAL DE LEITOS (Novo importado) */}
                {modalLeitoAberto && (
                    <ModalCadastroLeito 
                        aoFechar={() => setModalLeitoAberto(false)} 
                        aoSalvar={salvarLeito} 
                    />
                )}

                {/* 3. MODAL DE CONVÊNIOS (Novo importado) */}
                {modalConvenioAberto && (
                    <ModalCadastroConvenio 
                        aoFechar={() => setModalConvenioAberto(false)} 
                        aoSalvar={salvarConvenio} 
                    />
                )}

            </main>
        </div>
    );
}