import React, { useEffect, useRef } from 'react';
import { LuSearch } from "react-icons/lu";
import './SearchBar.css';

export default function SearchBar() {
    const searchInputRef = useRef(null);

    // Requisito: Ativar busca com o atalho "/" (Corrigido)
    useEffect(() => {
        const handleKeyDown = (e) => {
            // 1. Descobre qual elemento HTML está selecionado no momento
            const elementoAtivo = e.target.tagName.toLowerCase();
            
            // 2. Verifica se o usuário está focado em um campo de texto
            const estaDigitando = elementoAtivo === 'input' || elementoAtivo === 'textarea';

            // 3. Só puxa o foco para a barra se apertar '/' E NÃO estiver digitando em outro lugar
            if (e.key === '/' && !estaDigitando) {
                e.preventDefault();
                searchInputRef.current.focus();
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="search-bar-universal">
            <LuSearch className="search-icon" />
            <input 
                ref={searchInputRef}
                type="text" 
                placeholder="Pesquisar (Aperte '/' para Pesquisar)"
            />
        </div>
    );
}