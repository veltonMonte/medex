import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Search, Plus, ChevronRight } from 'lucide-react';

const Patients = () => {
  const navigate = useNavigate();
  const patients = [
    { id: 1, name: 'Ana Silva', age: 32, lastVisit: '2026-05-10' },
    { id: 2, name: 'Bruno Gomes', age: 45, lastVisit: '2026-05-12' },
    { id: 3, name: 'Carla Mendes', age: 28, lastVisit: '2026-05-15' },
    { id: 4, name: 'Daniel Oliveira', age: 60, lastVisit: '2026-05-18' },
    { id: 5, name: 'Elaine Costa', age: 39, lastVisit: '2026-05-19' },
  ];

  return (
    <div className="px-6 pt-8 pb-12 space-y-6">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Pacientes</h2>
        <button className="p-2 bg-medical-600 text-white rounded-xl shadow-md active:scale-95">
          <Plus size={20} />
        </button>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Buscar paciente..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-medical-500 transition-all outline-none placeholder:text-slate-400 shadow-sm"
        />
      </div>

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
              <div className="text-left">
                <p className="font-bold text-slate-900">{patient.name}</p>
                <p className="text-xs text-slate-500">{patient.age} anos • Última: {patient.lastVisit}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-medical-600 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patients;
