import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bed, CheckCircle2, Circle, ChevronRight, Info } from 'lucide-react';

const Nursing = () => {
  const navigate = useNavigate();
  const [selectedBed, setSelectedBed] = useState(null);

  const beds = [
    { id: 101, status: 'Ocupado', patient: 'Ana Silva', color: 'bg-red-100 text-red-700' },
    { id: 102, status: 'Livre', patient: null, color: 'bg-green-100 text-green-700' },
    { id: 103, status: 'Ocupado', patient: 'João Souza', color: 'bg-red-100 text-red-700' },
    { id: 104, status: 'Limpeza', patient: null, color: 'bg-amber-100 text-amber-700' },
    { id: 201, status: 'Ocupado', patient: 'Maria Oliveira', color: 'bg-red-100 text-red-700' },
    { id: 202, status: 'Livre', patient: null, color: 'bg-green-100 text-green-700' },
  ];

  const checklist = [
    { id: 1, task: 'Verificação de Sinais Vitais', done: true },
    { id: 2, task: 'Administração de Medicamentos', done: false },
    { id: 3, task: 'Troca de Curativo', done: false },
    { id: 4, task: 'Higiene e Conforto', done: true },
  ];

  return (
    <div className="px-6 pt-8 pb-12 space-y-8">
      <header className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 shadow-sm active:bg-slate-50"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-slate-900">Mapa de Leitos</h2>
        <div className="w-10 h-10"></div>
      </header>

      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-bold text-slate-800">Ala A - Emergência</h3>
          <span className="text-xs font-bold text-slate-400 uppercase">Setor 01</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {beds.map((bed) => (
            <button
              key={bed.id}
              onClick={() => setSelectedBed(bed)}
              className={`p-3 rounded-2xl border transition-all active:scale-95 flex flex-col items-center text-center ${
                bed.status === 'Livre' ? 'bg-white border-green-200' : 'bg-white border-slate-200'
              }`}
            >
              <Bed size={20} className={`mb-2 ${bed.status === 'Livre' ? 'text-green-500' : 'text-slate-400'}`} />
              <span className="text-xs font-bold text-slate-900">Leito {bed.id}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${bed.color}`}>
                {bed.status}
              </span>
            </button>
          ))}
        </div>
      </section>

      {selectedBed && (
        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-lg space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Leito {selectedBed.id}</h3>
              <p className="text-sm text-slate-500">{selectedBed.patient || 'Sem paciente alocado'}</p>
            </div>
            <button onClick={() => setSelectedBed(null)} className="text-slate-400 hover:text-slate-600">
              <Info size={20} />
            </button>
          </div >

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Checklist de Cuidados</h4>
            <div className="space-y-2">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                >
                  <span className="text-sm font-medium text-slate-700">{item.task}</span>
                  <button className={`transition-colors ${item.done ? 'text-emerald-500' : 'text-slate-300'}`}>
                    <CheckCircle2 size={22} fill={item.done ? 'currentColor' : 'none'} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate(`/chart/${selectedBed.id}`)}
            className="w-full py-3 bg-medical-600 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95"
          >
            Acessar Prontuário <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Nursing;
