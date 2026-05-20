import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Users,
  Activity,
  FileText,
  Clock,
  Settings,
  ChevronRight,
  PlusCircle
} from 'lucide-react';

const Home = ({ userRole, userName }) => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Pacientes na Fila', value: '12', icon: <Clock className="text-orange-500" />, color: 'bg-orange-50' },
    { label: 'Atendimentos Hoje', value: '45', icon: <Activity className="text-emerald-500" />, color: 'bg-emerald-50' },
    { label: 'Pendências', value: '8', icon: <FileText className="text-blue-500" />, color: 'bg-blue-50' },
  ];

  const quickActions = [
    { label: 'Novo Atendimento', path: '/triage', icon: <PlusCircle size={20} />, color: 'bg-medical-600 text-white' },
    { label: 'Ver Fila', path: '/queue', icon: <Users size={20} />, color: 'bg-white text-slate-700 border border-slate-200' },
    { label: 'Prontuários', path: '/patients', icon: <User size={20} />, color: 'bg-white text-slate-700 border border-slate-200' },
  ];

  return (
    <div className="px-6 pt-8 pb-12 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <p className="text-slate-500 font-medium">Bom dia,</p>
          <h2 className="text-2xl font-bold text-slate-900">{userName || 'Usuário'}</h2>
        </div>
        <div className="w-12 h-12 bg-slate-200 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName || 'Default'}`} alt="User profile" />
        </div>
      </header>

      <section className="grid grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`p-4 rounded-3xl ${stat.color} flex flex-col items-center text-center transition-transform active:scale-95`}>
            <div className="p-2 bg-white rounded-xl shadow-sm mb-2">
              {stat.icon}
            </div>
            <span className="text-xl font-bold text-slate-900">{stat.value}</span>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 px-1">Ações Rápidas</h3>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => navigate(action.path)}
              className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all active:scale-95 ${action.color}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${action.color.includes('white') ? 'bg-slate-100' : 'bg-white/20'}`}>
                  {action.icon}
                </div>
                <span className="font-semibold">{action.label}</span>
              </div>
              <ChevronRight size={20} className={action.color.includes('white') ? 'text-slate-400' : 'text-white/80'} />
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 px-1">Agenda Recente</h3>
        <div className="space-y-3">
          {[
            { name: 'Ana Silva', time: '09:30', type: 'Consulta' },
            { name: 'João Souza', time: '10:15', type: 'Retorno' },
            { name: 'Maria Oliveira', time: '11:00', type: 'Triagem' },
          ].map((patient, idx) => (
            <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group active:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-medical-100 text-medical-600 rounded-full flex items-center justify-center font-bold text-sm">
                  {patient.name[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{patient.name}</p>
                  <p className="text-xs text-slate-500">{patient.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-700">{patient.time}</p>
                <button onClick={() => navigate(`/chart/${idx}`)} className="text-xs text-medical-600 font-semibold hover:underline">Ver Prontuário</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
