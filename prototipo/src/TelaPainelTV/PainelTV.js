import React, { useState, useEffect } from 'react';
import logo from "../TelaPaciente/img/logo192.png";
import './PainelTV.css';

export default function PainelTV() {
    const [chamadaAtual, setChamadaAtual] = useState(null);
    const [historico, setHistorico] = useState([]);
    const [piscando, setPiscando] = useState(false);

    useEffect(() => {
        const escutarChamada = (event) => {
            if (event.key === 'chamadaPainelTV' && event.newValue) {
                const novaChamada = JSON.parse(event.newValue);
                
                setChamadaAtual(novaChamada);
                setPiscando(true);
                
                // 1. Toca o 'Bip' de atenção inicial
                const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
                audio.play().catch(e => console.log("Áudio do bip bloqueado pelo navegador"));

                // 2. NOVO: A mágica da Voz (Text-to-Speech)
                // Usamos um pequeno atraso (setTimeout) para a voz não falar em cima do "Bip"
                setTimeout(() => {
                    // Monta a frase que será falada
                    const textoParaFalar = `Paciente ${novaChamada.nome}. Comparecer ao ${novaChamada.consultorio}.`;
                    const mensagemVoz = new SpeechSynthesisUtterance(textoParaFalar);
                    
                    mensagemVoz.lang = 'pt-BR'; // Idioma em Português do Brasil
                    mensagemVoz.rate = 0.85;    // Velocidade (1 é o normal, 0.85 fica mais claro/pausado)
                    mensagemVoz.pitch = 1;      // Tom da voz
                    
                    window.speechSynthesis.speak(mensagemVoz);
                }, 1000); // Espera 1 segundo após o bip para começar a falar

                setHistorico(prev => {
                    const novoHistorico = [novaChamada, ...prev];
                    return novoHistorico.slice(0, 4);
                });

                setTimeout(() => setPiscando(false), 3000);
            }
        };

        window.addEventListener('storage', escutarChamada);
        return () => window.removeEventListener('storage', escutarChamada);
    }, []);

    return (
        <div className="painel-tv-container">
            <aside className="tv-historico">
                <div className="tv-logo-area">
                    <img src={logo} alt="FortalMed" width="180" />
                </div>
                <h2>Últimas Chamadas</h2>
                <div className="lista-ultimas-chamadas">
                    {historico.slice(1).map((item, index) => (
                        <div key={index} className="item-historico">
                            <span className="hist-nome">{item.nome}</span>
                            <span className="hist-local">{item.consultorio}</span>
                        </div>
                    ))}
                    {historico.length <= 1 && (
                        <p className="hist-vazio">Aguardando chamadas...</p>
                    )}
                </div>
                <div className="tv-rodape-info">
                    <p>Mantenha seus documentos em mãos.</p>
                </div>
            </aside>

            <main className={`tv-chamada-principal ${piscando ? 'alerta-piscar' : ''}`}>
                {chamadaAtual ? (
                    <div className="chamada-destaque">
                        <h3 className="label-chamando">CHAMADA PARA ATENDIMENTO</h3>
                        <h1 className="nome-paciente-tv">{chamadaAtual.nome}</h1>
                        <div className="destino-tv">
                            <span className="sala-tv">{chamadaAtual.consultorio}</span>
                            <span className="medico-tv">{chamadaAtual.medico}</span>
                        </div>
                    </div>
                ) : (
                    <div className="chamada-destaque vazia">
                        <img src={logo} alt="FortalMed" width="300" />
                        <h1>Bem-vindo ao FortalMed</h1>
                        <p>Aguarde seu nome ser chamado no painel.</p>
                    </div>
                )}
            </main>
        </div>
    );
}