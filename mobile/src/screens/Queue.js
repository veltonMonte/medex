import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Clock, ChevronRight, Filter } from 'lucide-react';

const Queue = () => {
  const navigate = useNavigate();
  const patients = [
    { id: 1, name: 'Carlos Alberto', time: '08:15', priority: 'Emergência', wait: '10 min' },
    { id: 2, name: 'Beatriz Lima', time: '08:30', priority: 'Muito Urgente', wait: '25 min' },
    { id: 3, name: 'Fernando Costa', time: '08:45', priority: 'Urgente', wait: '40 min' },
    { id: 4, name: 'Juliana Meireles', time: '09:00', priority: 'Pouco Urgente', wait: '55 min' },
    { id: 5, name: 'Ricardo Santos', time: '09:10', priority: 'Não Urgente', wait: '65 min' },
  ];

  const priorityColors = {
    'Emergência': 'text-red-600 bg-red-50',
    'Muito Urgente': 'text-orange-600 bg-orange-50',
    'Urgente': 'text-amber-600 bg-amber-50',
    'Pouco Urgente': 'text-emerald-600 bg-emerald-50',
    'Não Urgente': 'text-blue-600 bg-blue-50',
  };

  return (
    <div className="px-6 pt-8 pb-12 space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Fila de Espera</h2>
          <p className="text-slate-500 text-sm font-medium">Pacientes aguardando atendimento</p>
        </div>
        <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 shadow-sm active:bg-slate-50">
          <Filter size={20} />
        </button>
      </header>

      <div className="space-y-3">
        {patients.map((patient) => (
          <div
            key={patient.id}
            onClick={() => navigate(`/chart/${patient.id}`)}
            className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between active:bg-slate-50 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">
                <User size={20} />
              </div>
              <div>
                <p className="font-bold text-slate-900">{patient.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${priorityColors[patient.priority]}`}>
                    {patient.priority}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} /> {patient.wait}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-700">{patient.time}</span>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-medical-600 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Queue;
