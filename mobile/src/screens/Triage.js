import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Thermometer, Activity, Droplet } from 'lucide-react';

const Triage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    temp: '',
    heartRate: '',
    spo2: '',
    priority: 'Verde'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Triagem salva com sucesso!');
    navigate('/');
  };

  return (
    <div className="px-6 pt-8 pb-12 space-y-6">
      <header className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 shadow-sm active:bg-slate-50"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-slate-900">Triagem Rápida</h2>
        <div className="w-10 h-10"></div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">Nome do Paciente</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
            placeholder="Nome completo"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-medical-500 transition-all outline-none shadow-sm"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
              <Thermometer size={16} className="text-medical-600" /> Temperatura
            </label>
            <input
              type="text"
              value={form.temp}
              onChange={(e) => setForm({...form, temp: e.target.value})}
              placeholder="36.5°C"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-medical-500 transition-all outline-none shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
              <Activity size={16} className="text-medical-600" /> FC (BPM)
            </label>
            <input
              type="text"
              value={form.heartRate}
              onChange={(e) => setForm({...form, heartRate: e.target.value})}
              placeholder="72"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-medical-500 transition-all outline-none shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
            <Droplet size={16} className="text-medical-600" /> SpO2 (%)
          </label>
          <input
            type="text"
            value={form.spo2}
            onChange={(e) => setForm({...form, spo2: e.target.value})}
            placeholder="98%"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-medical-500 transition-all outline-none shadow-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">Classificação de Risco (Manchester)</label>
          <div className="grid grid-cols-2 gap-3">
            {['Emergência', 'Muito Urgente', 'Urgente', 'Pouco Urgente', 'Não Urgente'].map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setForm({...form, priority: color})}
                className={`p-3 rounded-2xl font-bold text-xs transition-all ${
                  form.priority === color
                  ? 'bg-medical-600 text-white ring-2 ring-medical-300 ring-offset-2'
                  : 'bg-white text-slate-600 border border-slate-200 active:bg-slate-50'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-medical-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-medical-200 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Save size={20} /> Salvar Triagem
        </button>
      </form>
    </div>
  );
};

export default Triage;
