import React, { useState } from 'react';
import { FiX } from "react-icons/fi";

export default function ModalGerarAtendimento({ paciente, aoFechar, aoConfirmar }) {
    const [queixa, setQueixa] = useState('');
    const [prioridadeRecepcao, setPrioridadeRecepcao] = useState('Normal');

    const lidarComSubmit = (e) => {
        e.preventDefault();
        // Aqui enviamos os dados do atendimento para a Tela principal
        aoConfirmar({ pacienteId: paciente.id, queixa, prioridadeRecepcao });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-form-container" style={{ width: '400px' }}>
                <div className="modal-form-header">
                    <h3>Gerar Atendimento</h3>
                    <button type="button" className="btn-fechar-modal" onClick={aoFechar}>
                        <FiX />
                    </button>
                </div>
                
                <form onSubmit={lidarComSubmit}>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <p style={{ margin: '0 0 5px 0', color: '#5f6368', fontSize: '13px' }}>Paciente Selecionado:</p>
                        <strong style={{ color: '#1a73e8', fontSize: '16px' }}>{paciente.nome}</strong>
                    </div>

                    <div className="form-group">
                        <label>Queixa Principal (O que o paciente relatou?)</label>
                        <textarea 
                            rows="3"
                            value={queixa}
                            onChange={(e) => setQueixa(e.target.value)}
                            placeholder="Ex: Paciente relata forte dor de cabeça e febre desde ontem à noite." 
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #dadce0', resize: 'none', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Necessidade de Cadeira de Rodas / Maca?</label>
                        <select 
                            value={prioridadeRecepcao}
                            onChange={(e) => setPrioridadeRecepcao(e.target.value)}
                        >
                            <option value="Normal">Não </option>
                            <option value="Cadeira de Rodas">Sim (Cadeira de Rodas)</option>
                            <option value="Maca">Sim (Maca)</option>
                        </select>
                    </div>

                    <div className="modal-acoes">
                        <button type="button" className="btn-cancelar" onClick={aoFechar} style={{ padding: '10px 16px', background: 'transparent', border: 'none', color: '#5f6368', fontWeight: 'bold', cursor: 'pointer' }}>Cancelar</button>
                        <button type="submit" className="btn-salvar" style={{ padding: '10px 16px' }}>
                            Enviar para Triagem
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}