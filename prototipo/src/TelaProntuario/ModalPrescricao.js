import React, { useState } from 'react';
import { LuX, LuSearch, LuPlus, LuFileText } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";
import './ModalPrescricao.css';

export default function ModalPrescricao({ isOpen, onClose, onSalvar, alergias }) {
    const [busca, setBusca] = useState('');
    const [medicamentosSelecionados, setMedicamentosSelecionados] = useState([]);

    // Banco de dados simulado de remédios do hospital
    const bancoMedicamentos = [
        "Amoxicilina 875mg", "Ibuprofeno 600mg", "Ondansetrona 8mg",
        "Dipirona 500mg", "Paracetamol 750mg", "Omeprazol 20mg", "Ceftriaxona 1g"
    ];

    if (!isOpen) return null;

    // Filtra sugestões baseadas na busca
    const sugestoes = busca.trim() === '' 
        ? [] 
        : bancoMedicamentos.filter(med => med.toLowerCase().includes(busca.toLowerCase()));

    // Transforma o texto em um Smart Chip
    const adicionarMedicamento = (medicamento) => {
        if (!medicamentosSelecionados.includes(medicamento)) {
            setMedicamentosSelecionados([...medicamentosSelecionados, medicamento]);
        }
        setBusca(''); // Limpa a busca após selecionar
    };

    const removerMedicamento = (medicamentoParaRemover) => {
        setMedicamentosSelecionados(medicamentosSelecionados.filter(med => med !== medicamentoParaRemover));
    };

    const handleSalvar = () => {
        if (medicamentosSelecionados.length > 0) {
            onSalvar(medicamentosSelecionados);
            setMedicamentosSelecionados([]); // Reseta para a próxima vez
        }
    };

    // Alerta em tempo real se o médico selecionar algo que o paciente tem alergia
    const temAlertaAlergia = medicamentosSelecionados.some(med => 
        alergias.toLowerCase().includes(med.split(' ')[0].toLowerCase())
    );

    return (
        <div className="modal-overlay">
            <div className="modal-content prescricao-modal">
                <div className="modal-header">
                    <h2><LuFileText /> Nova Prescrição</h2>
                    <button className="btn-close-modal" onClick={onClose}><LuX /></button>
                </div>

                <div className="modal-body">
                    {/* Barra de Busca de Medicamentos */}
                    <div className="busca-container">
                        <LuSearch className="busca-icon" />
                        <input 
                            autoFocus
                            type="text" 
                            className="input-busca-med"
                            placeholder="Busque o medicamento..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>

                    {/* Lista de Sugestões (Dropdown simpes) */}
                    {sugestoes.length > 0 && (
                        <div className="sugestoes-lista">
                            {sugestoes.map((med, index) => (
                                <div key={index} className="sugestao-item" onClick={() => adicionarMedicamento(med)}>
                                    <LuPlus /> {med}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Área dos Smart Chips */}
                    <div className="smart-chips-area">
                        {medicamentosSelecionados.length === 0 ? (
                            <p className="texto-vazio">Nenhum medicamento adicionado ainda.</p>
                        ) : (
                            medicamentosSelecionados.map((med, index) => (
                                <div key={index} className={`smart-chip ${alergias.toLowerCase().includes(med.split(' ')[0].toLowerCase()) ? 'chip-perigo' : ''}`}>
                                    <span>{med}</span>
                                    <button onClick={() => removerMedicamento(med)}><LuX /></button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Alerta de Segurança */}
                    {temAlertaAlergia && (
                        <div className="alerta-bloqueio">
                            <FiAlertTriangle />
                            Atenção: O paciente possui alergia relatada a um dos medicamentos selecionados!
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
                    <button 
                        className="btn-salvar-prescricao" 
                        onClick={handleSalvar}
                        disabled={medicamentosSelecionados.length === 0}
                    >
                        Gerar Prescrição
                    </button>
                </div>
            </div>
        </div>
    );
}