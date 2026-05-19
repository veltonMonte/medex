import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Imports das Telas
import Login from './Login/telaLogin';
import TelaPacientes from './TelaPaciente/TelaPacientes';
import FilaAtendimento from './TelaFila/FilaAtendimento';
import Triagem from './Triagem/Triagem';
import PainelTriagem from './Triagem/Triagem';
import PainelTV from './TelaPainelTV/PainelTV'
import Prontuario from './TelaProntuario/Prontuario';
import PainelLeitos from './TelaEnfermagem/PainelLeitos';
import Farmacia from './TelaFarmacia/Farmacia';
import Configuracoes from './TelaConfiguracoes/Configuracoes';
import MapaLeitos from './TelaEnfermagem/MapaLeitos';

function App() {
  // 1. AJUSTE DA CHAVE: Agora ele verifica a chave correta que criamos no Login
  const isAuthenticated = !!localStorage.getItem('fortalmed_user'); 

  return (
    <Router>
      <Routes>
        {/* Rota de Login */}
        <Route path="/login" element={<Login />} />

        {/* Rotas de Triagem */}
        <Route path="/triagem" element={<Triagem />} />
        <Route path="/mapa-leitos" element={<MapaLeitos/>}/>

        {/* Rota de Enfermagem / Leitos */}
        <Route path="/tela-enfermagem" element={<PainelLeitos />} />
        
        {/* 2. AJUSTE DA ROTA: Agora bate exatamente com o redirecionamento do Login */}
        <Route 
          path="/cadastro-pacientes" 
          element={isAuthenticated ? <TelaPacientes /> : <Navigate to="/login" />} 
        />

        <Route path="/painel-tv" element={<PainelTV />} />
        <Route path="/configuracoes" element={<Configuracoes/>} />
        <Route path="/farmacia" element={<Farmacia/>}/>
        <Route path="/prontuario" element={<Prontuario />} />
        <Route path="/atendimento" element={<Prontuario />} />

        {/* Rota de Fila do Médico */}
        <Route 
          path="/fila-atendimento" 
          element={isAuthenticated ? <FilaAtendimento /> : <Navigate to="/login" />}
        />  

        {/* 3. AJUSTE DA RAIZ: Quando der npm start (localhost:3000/), vai direto para o Login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;