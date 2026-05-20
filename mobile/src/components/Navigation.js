import React from 'react';
import { User, Settings, Bell, Activity, ClipboardList, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ role }) => {
  const allItems = [
    { path: '/', icon: <User size={24} />, label: 'Início', roles: ['Admin', 'Médico', 'Enfermagem', 'Recepção', 'Farmacêutico'] },
    { path: '/queue', icon: <Bell size={24} />, label: 'Fila', roles: ['Admin', 'Médico'] },
    { path: '/nursing', icon: <ClipboardList size={24} />, label: 'Leitos', roles: ['Admin', 'Enfermagem'] },
    { path: '/pharmacy', icon: <Activity size={24} />, label: 'Farmácia', roles: ['Admin', 'Farmacêutico'] },
    { path: '/patients', icon: <Users size={24} />, label: 'Pacientes', roles: ['Admin', 'Recepção'] },
    { path: '/settings', icon: <Settings size={24} />, label: 'Ajustes', roles: ['Admin'] },
  ];

  const filteredItems = allItems.filter(item => item.roles.includes(role));

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 flex justify-between items-center z-50 safe-area-bottom">
      {filteredItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center transition-all duration-200 ${
              isActive ? 'text-medical-600 scale-110' : 'text-slate-400'
            }`
          }
        >
          <div className={`p-2 rounded-2xl transition-all duration-200 ${
            'group-hover:bg-medical-50'
          }`}>
            {item.icon}
          </div>
          <span className="text-[10px] font-bold mt-1">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
