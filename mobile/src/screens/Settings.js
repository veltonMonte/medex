import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Lock, Eye, Moon, ShieldCheck } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Conta',
      items: [
        { icon: <User size={20} />, label: 'Meu Perfil', description: 'Editar informações pessoais' },
        { icon: <Lock size={20} />, label: 'Segurança', description: 'Trocar senha e autenticação' },
      ]
    },
    {
      title: 'Preferências',
      items: [
        { icon: <Bell size={20} />, label: 'Notificações', description: 'Alertas de triagem e avisos' },
        { icon: <Moon size={20} />, label: 'Aparência', description: 'Modo escuro e temas' },
      ]
    },
    {
      title: 'Sistema',
      items: [
        { icon: <ShieldCheck size={20} />, label: 'Permissões', description: 'Gerenciar níveis de acesso' },
        { icon: <Eye size={20} />, label: 'Logs de Auditoria', description: 'Ver atividades do sistema' },
      ]
    }
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
        <h2 className="text-lg font-bold text-slate-900">Configurações</h2>
        <div className="w-10 h-10"></div>
      </header>

      <div className="space-y-8">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">{section.title}</h3>
            <div className="space-y-2">
              {section.items.map((item, iIdx) => (
                <button
                  key={iIdx}
                  className="w-full p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between active:bg-slate-50 transition-all shadow-sm group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-100 text-slate-600 rounded-xl group-hover:bg-medical-50 group-hover:text-medical-600 transition-colors">
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-900 text-sm">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/login')}
        className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all border border-red-100"
      >
        Sair do Sistema
      </button>
    </div>
  );
};

export default Settings;
