import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, MessageSquare, Activity, FileText } from 'lucide-react';

const Chart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('resumo');

  const patientData = {
    name: 'Carlos Alberto',
    age: 54,
    bloodType: 'O+',
    status: 'Estável',
    lastVisit: '2026-05-18'
  };

  return (
    <div className="px-6 pt-8 pb-24 space-y-6">
      <header className="flex items-center justify-between">
        
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 shadow-sm active:bg-slate-50"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-slate-900">Prontuário Digital</h2>
        <button className="p-2 bg-medical-600 text-white rounded-xl shadow-md active:scale-95">
          <Save size={20} />
        </button>
      </header>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-medical-100 rounded-2xl flex items-center justify-center font-bold text-medical-600 text-xl">
            {patientData.name[0]}
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">{patientData.name}</h3>
            <p className="text-sm text-slate-500">{patientData.age} anos • {patientData.bloodType}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 bg-slate-50 rounded-2xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status Atual</p>
            <p className="text-sm font-bold text-slate-900">{patientData.status}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Última Visita</p>
            <p className="text-sm font-bold text-slate-900">{patientData.lastVisit}</p>
          </div>
        </div>
      </div>

      <div className="flex p-1 bg-slate-200 rounded-2xl">
        {['resumo', 'evolução', 'prescrição'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
              activeTab === tab ? 'bg-white text-medical-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {activeTab === 'resumo' && (
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold">
                <Activity size={18} className="text-medical-600" />
                <h4>Sinais Vitais</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">PA</p>
                  <p className="text-lg font-bold text-slate-800">120/80</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">FC</p>
                  <p className="text-lg font-bold text-slate-800">72 bpm</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Temp</p>
                  <p className="text-lg font-bold text-slate-800">36.5°C</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">SpO2</p>
                  <p className="text-lg font-bold text-slate-800">98%</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold">
                <FileText size={18} className="text-medical-600" />
                <h4>Histórico Recente</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Paciente apresenta quadro de hipertensão controlada, sem queixas recentes de cefaleia ou tontura. Mantendo medicação prescrita.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'evolução' && (
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-slate-400">18/05/2026 14:30</p>
                <span className="text-[10px] font-bold text-medical-600">Dr. Silva</span>
              </div>
              <p className="text-sm text-slate-600">Paciente relata melhora nos sintomas respiratórios após início do novo protocolo.</p>
            </div>
            <button className="w-full p-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 flex items-center justify-center gap-2 text-sm font-semibold hover:border-medical-300 hover:text-medical-600 transition-all">
              <Plus size={18} /> Adicionar Evolução
            </button>
          </div>
        )}

        {activeTab === 'prescrição' && (
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <p className="font-bold text-slate-900">Losartana Potássica 50mg</p>
                <span className="text-xs font-bold text-slate-500">1x ao dia</span>
              </div>
              <p className="text-xs text-slate-600 italic">Via Oral - Manhã</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <p className="font-bold text-slate-900">Hidroclorotiazida 25mg</p>
                <span className="text-xs font-bold text-slate-500">1x ao dia</span>
              </div>
              <p className="text-xs text-slate-600 italic">Via Oral - Manhã</p>
            </div>
            <button className="w-full p-4 bg-medical-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-medical-200 active:scale-95 transition-all">
              <Plus size={18} /> Nova Prescrição
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chart;
