import React, { useState, useEffect } from 'react';
import { FiX } from "react-icons/fi";
// Puxando o CSS global para garantir a identidade visual do FortalMed
import '../TelaPaciente/TelaPacientes.css'; 

export default function ModalCadastroConvenio({ aoFechar, aoSalvar, dadosIniciais }) {
    const [formData, setFormData] = useState({
        nome: '',
        codigoAns: '',
        tipo: 'Cooperativa',
        padraoFaturamento: 'TISS 4.01',
        status: 'Ativo'
    });

    useEffect(() => {
        if (dadosIniciais) {
            setFormData({
                nome: dadosIniciais.nome || '',
                codigoAns: dadosIniciais.codigoAns || '',
                tipo: dadosIniciais.tipo || 'Cooperativa',
                padraoFaturamento: dadosIniciais.padraoFaturamento || 'TISS 4.01',
                status: dadosIniciais.status || 'Ativo'
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
            <div className="modal-form-container" style={{ width: '480px' }}>
                <div className="modal-form-header">
                    <h3>{dadosIniciais ? 'Editar Operadora/Convênio' : 'Cadastrar Operadora/Convênio'}</h3>
                    <button type="button" className="btn-fechar-modal" onClick={aoFechar}>
                        <FiX />
                    </button>
                </div>
                
                <form onSubmit={lidarComSubmit}>
                    
                    <div className="form-group">
                        <label>Nome Comercial / Razão Social</label>
                        <input 
                            type="text" 
                            name="nome"
                            value={formData.nome}
                            onChange={lidarComMudanca}
                            placeholder="Ex: Unimed Fortaleza, Bradesco Saúde..." 
                            required 
                        />
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group half">
                            <label>Código Registro ANS / Federação</label>
                            <input 
                                type="text" 
                                name="codigoAns"
                                value={formData.codigoAns}
                                onChange={lidarComMudanca}
                                placeholder="Ex: 055, 063, 005711" 
                                required 
                            />
                        </div>
                        <div className="form-group half">
                            <label>Categoria Fiscal</label>
                            <select 
                                name="tipo"
                                value={formData.tipo}
                                onChange={lidarComMudanca}
                            >
                                <option value="Cooperativa">Cooperativa Médica</option>
                                <option value="Seguradora">Seguradora Especializada</option>
                                <option value="Autogestão">Autogestão</option>
                                <option value="SUS">Sistema Único de Saúde (SUS)</option>
                                <option value="Particular">Direto / Particular</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label>Padrão de Faturamento XML</label>
                            <select 
                                name="padraoFaturamento"
                                value={formData.padraoFaturamento}
                                onChange={lidarComMudanca}
                            >
                                <option value="TISS 4.01">TISS 4.01</option>
                                <option value="TISS 3.05">TISS 3.05 (Legado)</option>
                                <option value="BPA/SIA">SIA/SUS (BPA)</option>
                                <option value="Isento">Isento (Particular)</option>
                            </select>
                        </div>
                        <div className="form-group half">
                            <label>Status Comercial</label>
                            <select 
                                name="status"
                                value={formData.status}
                                onChange={lidarComMudanca}
                            >
                                <option value="Ativo">🟢 Credenciamento Ativo</option>
                                <option value="Suspenso">🟡 Suspenso / Auditoria</option>
                                <option value="Descredenciado">🔴 Descredenciado</option>
                            </select>
                        </div>
                    </div>

                    <div className="modal-acoes">
                        <button type="submit" className="btn-salvar" style={{ width: '100%', padding: '12px' }}>
                            {dadosIniciais ? 'Salvar Configurações' : 'Confirmar Convênio'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}