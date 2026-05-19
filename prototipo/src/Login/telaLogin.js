import React, { useState, useEffect, useRef } from 'react';
import logo from './img/logo192.png'; 
import './telaLogin.css';

function Login() {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [credenciais, setCredenciais] = useState({ usuario: '', senha: '' });
    const [erro, setErro] = useState('');
    const inputUsuarioRef = useRef(null);

    // Foco automático ao carregar a tela (História 23)
    useEffect(() => {
        if (inputUsuarioRef.current) {
            inputUsuarioRef.current.focus();
        }
    }, []);

    // Lista de usuários sincronizada com o banco de testes do FortalMed
    const usuariosPermitidos = [
        { usuario: 'gabriel', senha: '123', perfil: 'Admin', nome: 'Gabriel Damasceno' },
        { usuario: 'sarah', senha: '123', perfil: 'Recepção', nome: 'Sarah Costa' },
        { usuario: 'carlos', senha: '123', perfil: 'Médico', nome: 'Dr. Carlos' },
        { usuario: 'mariana', senha: '123', perfil: 'Enfermagem', nome: 'Enfa. Mariana' },
        { usuario: 'farmacia', senha: '123', perfil: 'Farmacêutico', nome: 'Farm. Silva' }
    ];

    const lidarComMudanca = (e) => {
        const { name, value } = e.target;
        setCredenciais(prev => ({ ...prev, [name]: value }));
        setErro('');
    };

    const lidarComLogin = (e) => {
        e.preventDefault();
        
        const usuarioValidado = usuariosPermitidos.find(
            u => u.usuario === credenciais.usuario.toLowerCase() && u.senha === credenciais.senha
        );

        if (usuarioValidado) {
            // Salva a sessão no navegador para uso em outras telas
            localStorage.setItem('fortalmed_user', JSON.stringify(usuarioValidado));
            
            // REDIRECIONAMENTO POR PERFIL
            switch (usuarioValidado.perfil) {
                case 'Recepção':
                    window.location.href = '/cadastro-pacientes'; // Direciona para TelaPacientes.js
                    break;
                case 'Médico':
                    window.location.href = '/fila-atendimento'; // Direciona para FilaAtendimento.js
                    break;
                case 'Enfermagem':
                    window.location.href = '/triagem'; // Direciona para PainelTriagem.js
                    break;
                case 'Admin':
                    window.location.href = '/configuracoes';
                    break;
                case 'Farmacêutico':
                    window.location.href = '/farmacia';
                    break;
                default:
                    window.location.href = '/';
            }
        } else {
            setErro('Usuário ou senha incorretos.');
        }
    };

    return (
        <div className="login-page">
            <div className="logo-container">
                <img src={logo} alt="FortalMed Logo" className="logo-image" />
            </div>

            <div className="login-card">
                <h1 className="card-title">Faça seu Login!</h1>
                <hr className="divider" />

                <form className="form-container" onSubmit={lidarComLogin}>
                    <div className="input-container">
                        <input 
                            type="text" 
                            name="usuario"
                            className="input-field" 
                            placeholder="Digite seu usuário" 
                            value={credenciais.usuario}
                            onChange={lidarComMudanca}
                            ref={inputUsuarioRef}
                            required
                        />
                    </div>
                    
                    <div className="input-container">
                        <input 
                            type={mostrarSenha ? "text" : "password"} 
                            name="senha"
                            className="input-field password-field" 
                            placeholder="Digite sua senha" 
                            value={credenciais.senha}
                            onChange={lidarComMudanca}
                            required
                        />
                        <span 
                            className="password-icon" 
                            onClick={() => setMostrarSenha(!mostrarSenha)}
                            style={{ cursor: 'pointer' }}
                        >
                            {mostrarSenha ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                </svg>
                            )}
                        </span>
                    </div>
                    
                    {erro && <div style={{ color: '#d93025', fontSize: '13px', textAlign: 'center', marginBottom: '10px', fontWeight: '500' }}>{erro}</div>}

                    <div className="links-container">
                        <a href="#">Esqueceu a senha?</a>
                        <span className="pipe">|</span>
                        <a href="#">Esqueceu a matrícula?</a>
                    </div>

                    <div className="action-buttons">
                        <button type="submit" className="btn-primary">Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;