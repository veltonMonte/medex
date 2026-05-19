import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import logo from "../TelaPaciente/img/logo192.png";
import './FilaAtendimento.css';
import { LuUser, LuClock, LuMegaphone } from "react-icons/lu";
import { FiPlayCircle } from "react-icons/fi";
import SearchBar from '../components/SearchBar';

export default function FilaAtendimento() {
    const navigate = useNavigate();

    const labelManchester = {
        vermelho: "EMERGÊNCIA",
        laranja: "MUITO URGENTE",
        amarelo: "URGENTE",
        verde: "POUCO URGENTE",
        azul: "NÃO URGENTE"
    };

    const [pacientesNaAntecâmara] = useState([
        { id: 1, nome: "Evagno Maciel", risco: "vermelho", tempo: "5 min", motivo: "Dor Torácica" },
        { id: 2, nome: "Marcelo Rodrigues", risco: "laranja", tempo: "8 min", motivo: "Fratura Exposta" },
        { id: 3, nome: "Renan Oliveira", risco: "amarelo", tempo: "12 min", motivo: "Febre Alta" },
        { id: 4, nome: "Enzo Linhares", risco: "verde", tempo: "20 min", motivo: "Sintomas Gripais" },
        { id: 5, nome: "Gabriel Damasceno", risco: "azul", tempo: "25 min", motivo: "Retorno de Exames" }
    ]);

    const ordemRisco = { vermelho: 1, laranja: 2, amarelo: 3, verde: 4, azul: 5 };
    
    // Ordena por risco (Manchester) e desempata pelo tempo de espera (maior tempo primeiro)
    const filaOrdenada = [...pacientesNaAntecâmara].sort((a, b) => {
        if (ordemRisco[a.risco] !== ordemRisco[b.risco]) {
            return ordemRisco[a.risco] - ordemRisco[b.risco];
        }
        // Desempate: extrai apenas o número do texto "X min"
        const tempoA = parseInt(a.tempo.replace(/\D/g, ''));
        const tempoB = parseInt(b.tempo.replace(/\D/g, ''));
        return tempoB - tempoA; // Quem tem maior número (espera há mais tempo) sobe na fila
    });

    const iniciarAtendimento = (paciente) => {
        // Redireciona para o prontuário que construímos, passando os dados do paciente
        navigate('/prontuario', { state: { paciente } });
    };

    const chamarNoPainel = (paciente) => {
        const dadosChamada = {
            nome: paciente.nome,
            consultorio: "Consultório 01",
            medico: "Dr. Gabriel",
            timestamp: new Date().getTime() 
        };
        
        localStorage.setItem('chamadaPainelTV', JSON.stringify(dadosChamada));
        alert(`Paciente ${paciente.nome} (${labelManchester[paciente.risco]}) chamado no painel!`);
    };

    // NOVA FUNÇÃO: Puxa sempre o índice 0 da fila já ordenada
    const chamarProximoDaFila = () => {
        if (filaOrdenada.length > 0) {
            const proximoPaciente = filaOrdenada[0];
            chamarNoPainel(proximoPaciente);
        } else {
            alert("Não há pacientes na fila de espera.");
        }
    };

    return (
        <div className="layout-container">
            <aside className="sidebar">
                <div className="logo-container">
                    <img src={logo} alt="FortalMed" width="180" />
                </div>
                <nav className="menu-nav">
                    <a 
                        onClick={() => navigate('/fila-atendimento')} 
                        className="menu-item active"
                        style={{ cursor: 'pointer' }}
                    >
                        Fila Médica
                    </a>
                    
                    <a 
                        onClick={() => navigate('/prontuario')} 
                        className="menu-item"
                        style={{ cursor: 'pointer' }}
                    >
                        Prontuários
                    </a>
                </nav>
            </aside>

            <main className="main-content">
                <header className="top-bar">
                    <div className="top-bar-left">
                        <SearchBar />
                    </div>
                    <div className="top-bar-right">
                        <div className="status-medico">
                            <span className="dot-online"></span> Consultório 01 - Dr. Gabriel
                        </div>
                    </div>
                </header>

                <div className="content">
                    <div className="fila-header-main">
                        <div>
                            <h1>Fila de Espera</h1>
                            <p>Pacientes classificados aguardando atendimento médico</p>
                        </div>
                        {/* BOTÃO ATUALIZADO COM O EVENTO ONCLICK */}
                        <button className="btn-chamar-proximo" onClick={chamarProximoDaFila}>
                            <LuMegaphone /> Chamar Próximo
                        </button>
                    </div>

                    <div className="cards-fila-container">
                        {filaOrdenada.map((paciente) => (
                            <div key={paciente.id} className={`card-fila-medica b-color-${paciente.risco}`}>
                                <div className={`card-barra-lateral bg-color-${paciente.risco}`}></div>
                                
                                <div className="card-fila-info">
                                    <div className="info-topo">
                                        <h3 className="nome-paciente-fila">{paciente.nome}</h3>
                                        <span className={`tag-manchester tag-${paciente.risco}`}>
                                            {labelManchester[paciente.risco]}
                                        </span>
                                    </div>
                                    <p className="motivo-fila">{paciente.motivo}</p>
                                    <div className="meta-fila">
                                        <span><LuClock /> {paciente.tempo} de espera</span>
                                        <span><LuUser /> ID: #{paciente.id}</span>
                                    </div>
                                </div>

                                <div className="card-fila-acoes">
                                    <button className="btn-chamada" onClick={() => chamarNoPainel(paciente)}>
                                        <LuMegaphone /> Chamar
                                    </button>
                                    <button 
                                        className="btn-atendimento" 
                                        onClick={() => iniciarAtendimento(paciente)}
                                    >
                                        <FiPlayCircle /> Atender
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}