import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Pill, Package, Search, CheckCircle, AlertCircle } from 'lucide-react';

const Pharmacy = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('todos');

  const prescriptions = [
    { id: 1, patient: 'Ana Silva', med: 'Losartana 50mg', qty: '1x/dia', status: 'Pendente', priority: 'Alta' },
    { id: 2, patient: 'João Souza', med: 'Amoxicilina 500mg', qty: '8/8h', status: 'Preparando', priority: 'Média' },
    { id: 3, patient: 'Maria Oliveira', med: 'Omeprazol 20mg', qty: '1x/dia', status: 'Entregue', priority: 'Baixa' },
    { id: 4, patient: 'Carlos Alberto', med: 'Insulina Glargina', qty: '10 UI', status: 'Pendente', priority: 'Alta' },
  ];

  return (
    <div className="px-6 pt-8 pb-12 space-y-6">
      <header className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 shadow-sm active:bg-slate-50"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-slate-900">Farmácia Digital</h2>
        <div className="w-10 h-10"></div>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['todos', 'pendentes', 'preparando', 'entregues'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all ${
              filter === f ? 'bg-medical-600 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Prescrições Ativas</h3>
        <div className="space-y-3">
          {prescriptions.map((item) => (
            <div key={item.id} className="p-4 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4 active:bg-slate-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-medical-50 text-medical-600 rounded-xl">
                    <Pill size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{item.med}</p>
                    <p className="text-xs text-slate-500">{item.patient}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.priority === 'Alta' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  {item.priority}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <div className="flex items-center gap-2 text-slate-500">
                  <Package size={14} />
                  <span className="text-xs font-medium">{item.qty}</span>
                </div>
                <div className="flex gap-2">
                  {item.status === 'Pendente' && (
                    <button className="px-3 py-1.5 bg-medical-600 text-white text-xs font-bold rounded-lg active:scale-95 transition-all">
                      Preparar
                    </button>
                  )}
                  {item.status === 'Preparando' && (
                    <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg active:scale-95 transition-all">
                      Entregar
                    </button>
                  )}
                  {item.status === 'Entregue' && (
                    <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                      <CheckCircle size={14} /> Entregue
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;
