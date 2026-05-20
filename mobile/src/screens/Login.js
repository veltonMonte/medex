import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const usuariosPermitidos = [
    { usuario: 'gabriel', senha: '123', perfil: 'Admin', nome: 'Gabriel Damasceno' },
    { usuario: 'sarah', senha: '123', perfil: 'Recepção', nome: 'Sarah Costa' },
    { usuario: 'carlos', senha: '123', perfil: 'Médico', nome: 'Dr. Carlos' },
    { usuario: 'mariana', senha: '123', perfil: 'Enfermagem', nome: 'Enfa. Mariana' },
    { usuario: 'farmacia', senha: '123', perfil: 'Farmacêutico', nome: 'Farm. Silva' },
    { usuario: 'admin@fortalmed.com', senha: '123456', perfil: 'Admin', nome: 'Administrador' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuarioValidado = usuariosPermitidos.find(
      u => (u.usuario === email.toLowerCase()) && u.senha === password
    );

    if (usuarioValidado) {
      onLogin(usuarioValidado);
      navigate('/');
    } else {
      alert('Usuário ou senha incorretos. Use admin@fortalmed.com / 123456');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-8 py-12 bg-white">
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-medical-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-medical-200 rotate-12">
          <span className="text-white text-3xl font-bold -rotate-12">FM</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          FortalMed <span className="text-medical-600">Mobile</span>
        </h1>
        <p className="text-slate-500 font-medium">Acesse o sistema de gestão médica</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">E-mail</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Usuário ou E-mail"
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all outline-none placeholder:text-slate-400"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">Senha</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all outline-none placeholder:text-slate-400"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-medical-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-medical-200 hover:bg-medical-700 transition-all active:scale-95 flex items-center justify-center gap-2 group"
        >
          Entrar
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div className="mt-12 text-center">
        <a href="#" className="text-sm font-medium text-medical-600 hover:underline">Esqueceu a senha?</a>
      </div>
    </div>
  );
};

export default Login;
