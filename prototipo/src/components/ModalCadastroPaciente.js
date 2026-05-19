import React, { useState, useEffect } from 'react';
import { FiX } from "react-icons/fi";

export default function ModalCadastroPaciente({ aoFechar, aoSalvar, dadosIniciais }) {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
        convenio: 'particular'
    });

    useEffect(() => {
        if (dadosIniciais) {
            setFormData({
                nome: dadosIniciais.nome || '',
                cpf: dadosIniciais.cpf || '',
                dataNascimento: dadosIniciais.dataNascimento || '',
                telefone: dadosIniciais.telefone || '',
                convenio: dadosIniciais.convenio || 'particular'
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

    // ==========================================
    // NOVA FUNÇÃO: Fechar ao clicar fora
    // ==========================================
    const lidarComCliqueFora = (e) => {
        // Verifica se o elemento clicado é exatamente o fundo escuro (overlay)
        if (e.target === e.currentTarget) {
            aoFechar();
        }
    };

    return (
        <div className="modal-overlay" onMouseDown={lidarComCliqueFora}>
            <div className="modal-form-container" style={{ width: '500px' }}>
                <div className="modal-form-header">
                    <h3>{dadosIniciais ? 'Editar Paciente' : 'Novo Paciente'}</h3>
                    <button type="button" className="btn-fechar-modal" onClick={aoFechar}>
                        <FiX />
                    </button>
                </div>
                
                <form onSubmit={lidarComSubmit}>
                    <div className="form-group">
                        <label>Nome Completo</label>
                        <input 
                            type="text" 
                            name="nome"
                            value={formData.nome}
                            onChange={lidarComMudanca}
                            placeholder="Nome do paciente" 
                            required 
                        />
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group half">
                            <label>CPF</label>
                            <input 
                                type="text" 
                                name="cpf"
                                value={formData.cpf}
                                onChange={lidarComMudanca}
                                placeholder="000.000.000-00" 
                                required 
                            />
                        </div>
                        <div className="form-group half">
                            <label>Data de Nascimento</label>
                            <input 
                                type="date" 
                                name="dataNascimento"
                                value={formData.dataNascimento}
                                onChange={lidarComMudanca}
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label>Telefone / Celular</label>
                            <input 
                                type="text" 
                                name="telefone"
                                value={formData.telefone}
                                onChange={lidarComMudanca}
                                placeholder="(00) 00000-0000" 
                                required 
                            />
                        </div>
                        <div className="form-group half">
                            <label>Convênio / Plano</label>
                            <select 
                                name="convenio"
                                value={formData.convenio}
                                onChange={lidarComMudanca}
                            >
                                <option value="particular">Particular</option>
                                <option value="unimed">Unimed</option>
                                <option value="bradesco">Bradesco Saúde</option>
                                <option value="sus">SUS</option>
                            </select>
                        </div>
                    </div>

                    <div className="modal-acoes">
                        <button type="submit" className="btn-salvar" style={{ width: '100%', padding: '12px' }}>
                            {dadosIniciais ? 'Salvar Alterações' : 'Cadastrar Paciente (Ctrl+Enter)'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}