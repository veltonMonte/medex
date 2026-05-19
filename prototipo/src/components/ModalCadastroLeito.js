import React, { useState, useEffect } from 'react';
import { FiX } from "react-icons/fi";
// Importa o CSS global de modais que já criamos
import '../TelaPaciente/TelaPacientes.css'; 

export default function ModalCadastroLeito({ aoFechar, aoSalvar, dadosIniciais }) {
    const [formData, setFormData] = useState({
        numero: '',
        setor: 'Observação',
        tipo: 'Maca',
        status: 'Ativo',
        observacao: ''
    });

    useEffect(() => {
        if (dadosIniciais) {
            setFormData({
                numero: dadosIniciais.numero || '',
                setor: dadosIniciais.setor || 'Observação',
                tipo: dadosIniciais.tipo || 'Maca',
                status: dadosIniciais.status || 'Ativo',
                observacao: dadosIniciais.observacao || ''
            });
        }
    }, [dadosIniciais]);

    const lidarComMudanca = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const lidarComSubmit = (e) => {
        e.preventDefault();
        aoSalvar(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-form-container" style={{ width: '450px' }}>
                <div className="modal-form-header">
                    <h3>{dadosIniciais ? 'Editar Estrutura de Leito' : 'Cadastrar Novo Leito'}</h3>
                    <button type="button" className="btn-fechar-modal" onClick={aoFechar}>
                        <FiX />
                    </button>
                </div>
                
                <form onSubmit={lidarComSubmit}>
                    
                    <div className="form-row">
                        <div className="form-group half">
                            <label>Identificação / Número</label>
                            <input 
                                type="text" 
                                name="numero"
                                value={formData.numero}
                                onChange={lidarComMudanca}
                                placeholder="Ex: 01-A, UTI-05" 
                                required 
                            />
                        </div>
                        <div className="form-group half">
                            <label>Setor / Ala</label>
                            <select 
                                name="setor"
                                value={formData.setor}
                                onChange={lidarComMudanca}
                            >
                                <option value="Triagem">Triagem</option>
                                <option value="Observação">Observação</option>
                                <option value="Emergência">Emergência</option>
                                <option value="UTI Adulto">UTI Adulto</option>
                                <option value="Pediatria">Pediatria</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label>Tipo Físico</label>
                            <select 
                                name="tipo"
                                value={formData.tipo}
                                onChange={lidarComMudanca}
                            >
                                <option value="Maca">Maca</option>
                                <option value="Cama Padrão">Cama Padrão</option>
                                <option value="Cama Elétrica">Cama Elétrica</option>
                                <option value="Berço">Berço</option>
                                <option value="Poltrona de Medicação">Poltrona de Medicação</option>
                            </select>
                        </div>
                        <div className="form-group half">
                            <label>Status Operacional</label>
                            <select 
                                name="status"
                                value={formData.status}
                                onChange={lidarComMudanca}
                            >
                                <option value="Ativo">🟢 Ativo (Operante)</option>
                                <option value="Manutenção">🟡 Manutenção</option>
                                <option value="Bloqueado Administrativo">🔴 Bloqueado (Admin)</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Observação Interna (Opcional)</label>
                        <input 
                            type="text" 
                            name="observacao"
                            value={formData.observacao}
                            onChange={lidarComMudanca}
                            placeholder="Anotações técnicas sobre o leito..." 
                        />
                    </div>

                    <div className="modal-acoes">
                        <button type="submit" className="btn-salvar" style={{ width: '100%', padding: '12px' }}>
                            {dadosIniciais ? 'Atualizar Leito' : 'Salvar Novo Leito'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}