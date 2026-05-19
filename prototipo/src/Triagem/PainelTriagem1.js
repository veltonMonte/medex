import React, { useState } from 'react';
import logo from "../TelaPaciente/img/logo192.png"; // Ajuste o caminho da logo se necessário
import './Triagem.css';
// 1ª Alteração: LuClipboardSignature trocado por LuClipboardPen
import { LuActivity, LuThermometer, LuHeartPulse, LuClipboardPen } from "react-icons/lu";
import SearchBar from '../components/SearchBar';

export default function Triagem() {
    // Simulando pacientes enviados pela Recepção
    const [filaTriagem, setFilaTriagem] = useState([
        { id: '06300200123456', nome: 'Enzo Linhares Brasil', chegada: '10:15', idade: 26 },
        { id: '06300200987654', nome: 'Julio Vinicius', chegada: '10:22', idade: 34 }
    ]);

    const [pacienteEmAvaliacao, setPacienteEmAvaliacao] = useState(null);
    const [dadosVitais, setDadosVitais] = useState({
        pa: '', fc: '', temp: '', spo2: '', sintomas: '', classificacao: ''
    });

    const iniciarTriagem = (paciente) => {
        setPacienteEmAvaliacao(paciente);
        setDadosVitais({ pa: '', fc: '', temp: '', spo2: '', sintomas: '', classificacao: '' });
    };

    const finalizarTriagem = (e) => {
        e.preventDefault();
        
        if(!dadosVitais.classificacao) {
            alert("Por favor, selecione uma cor de classificação de risco!");
            return;
        }

        if (window.confirm(`Confirmar classificação ${dadosVitais.classificacao.toUpperCase()} para ${pacienteEmAvaliacao.nome}?`)) {
            // Remove da fila de triagem (simulando o envio para a Fila do Médico)
            setFilaTriagem(filaTriagem.filter(p => p.id !== pacienteEmAvaliacao.id));
            setPacienteEmAvaliacao(null);
            alert("Paciente classificado e enviado para a fila médica com sucesso!");
        }
    };

    return (
        <div className="layout-container">
            {/* Sidebar - Perfil Enfermagem */}
            <aside className="sidebar">
                <div className="logo-container">
                    <img src={logo} alt="FortalMed" width="180" />
                </div>
                <nav className="menu-nav">
                    <a href="#" className="menu-item">Fila de Atendimento</a>
                    <a href="#" className="menu-item active">Triagem (Enfermagem)</a>
                    {/* A Enfermagem não tem o menu 'Cadastro de Pacientes' aqui */}
                    <a href="#" className="menu-item">Prontuário (Thread)</a>
                    <a href="#" className="menu-item">Configurações</a>
                </nav>
            </aside>

            <main className="main-content">
                <header className="top-bar">
                    <SearchBar />
                </header>

                <div className="content">
                    <div className="content-header">
                        <div className="text-group">
                            <h1>Fila de Atendimento Triagem</h1>
                            <p className="sub-header">Pacientes encaminhados pela recepção</p>
                        </div>
                    </div>

                    {/* Tabela de Aguardando Triagem */}
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Horário</th>
                                    <th>Paciente</th>
                                    <th>Idade</th>
                                    <th className="text-right">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filaTriagem.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" style={{textAlign: 'center', padding: '30px', color: '#5f6368'}}>
                                            Nenhum paciente aguardando triagem.
                                        </td>
                                    </tr>
                                ) : (
                                    filaTriagem.map((p) => (
                                        <tr key={p.id} className="row-hover">
                                            <td style={{fontWeight: 'bold', color: '#1a73e8'}}>{p.chegada}</td>
                                            <td>
                                                <div className="nome-paciente">{p.nome}</div>
                                                <div className="id-text">Cart: {p.id}</div>
                                            </td>
                                            <td>{p.idade} anos</td>
                                            <td className="action-cell" style={{width: '120px'}}>
                                                <button className="btn-avaliar" onClick={() => iniciarTriagem(p)}>
                                                    <LuActivity style={{marginRight: '6px'}}/> Avaliar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Modal de Triagem e Sinais Vitais */}
            {pacienteEmAvaliacao && (
                <div className="modal-overlay">
                    <div className="modal-container modal-lg">
                        <header className="modal-header">
                            <div>
                                <h2>Avaliação Clínica (Triagem)</h2>
                                <p className="sub-header" style={{margin:0}}>Paciente: <strong>{pacienteEmAvaliacao.nome}</strong></p>
                            </div>
                            <button className="close-btn" onClick={() => setPacienteEmAvaliacao(null)}>✕</button>
                        </header>
                        
                        <form className="modal-body" onSubmit={finalizarTriagem}>
                            <h3 className="section-title">Sinais Vitais</h3>
                            <div className="grid-vitais">
                                <div className="form-group">
                                    <label><LuHeartPulse /> P.A. (mmHg)</label>
                                    <input type="text" placeholder="120/80" value={dadosVitais.pa} onChange={e => setDadosVitais({...dadosVitais, pa: e.target.value})} required/>
                                </div>
                                <div className="form-group">
                                    <label><LuActivity /> F.C. (bpm)</label>
                                    <input type="number" placeholder="80" value={dadosVitais.fc} onChange={e => setDadosVitais({...dadosVitais, fc: e.target.value})} required/>
                                </div>
                                <div className="form-group">
                                    <label><LuThermometer /> Temp (°C)</label>
                                    <input type="number" step="0.1" placeholder="36.5" value={dadosVitais.temp} onChange={e => setDadosVitais({...dadosVitais, temp: e.target.value})} required/>
                                </div>
                                <div className="form-group">
                                    <label>SpO2 (%)</label>
                                    <input type="number" placeholder="98" value={dadosVitais.spo2} onChange={e => setDadosVitais({...dadosVitais, spo2: e.target.value})} required/>
                                </div>
                            </div>

                            <h3 className="section-title">Queixa Principal</h3>
                            <div className="form-group">
                                <textarea rows="3" placeholder="Descreva os sintomas relatados pelo paciente..." value={dadosVitais.sintomas} onChange={e => setDadosVitais({...dadosVitais, sintomas: e.target.value})} required></textarea>
                            </div>

                            <h3 className="section-title">Classificação de Risco</h3>
                            <div className="grid-manchester">
                                {['Emergencia', 'Muito-Urgente', 'Urgente', 'Pouco-Urgente', 'Não-urgente'].map(cor => (
                                    <div 
                                        key={cor}
                                        className={`card-cor cor-${cor} ${dadosVitais.classificacao === cor ? 'selecionado' : ''}`}
                                        onClick={() => setDadosVitais({...dadosVitais, classificacao: cor})}
                                    >
                                        {cor.toUpperCase()}
                                    </div>
                                ))}
                            </div>

                            <button type="submit" className="btn-submit-modal" style={{marginTop: '24px'}}>
                                {/* 2ª Alteração: Ícone trocado no botão */}
                                <LuClipboardPen style={{marginRight: '8px'}}/>
                                Finalizar Triagem e Enviar ao Médico
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}