import { useState, useEffect } from 'react';

/**
 * Hook personalizado para persistir estado no localStorage
 * @param {string} key - Chave do localStorage
 * @param {any} initialValue - Valor inicial
 * @returns {[any, Function]} - [valor, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // Estado para armazenar o valor
  // Passa a função inicial ao useState para que a lógica seja executada apenas uma vez
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Buscar do localStorage pela chave
      const item = window.localStorage.getItem(key);
      // Parsear JSON armazenado ou retornar initialValue se não houver
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erro ao ler localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Retorna uma versão encapsulada da função useState setter que ...
  // ... persiste o novo valor no localStorage.
  const setValue = (value) => {
    try {
      // Permite que value seja uma função para ter a mesma API do useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Salvar no estado
      setStoredValue(valueToStore);

      // Salvar no localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Erro ao salvar localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

/**
 * Hook personalizado para gerenciar respostas com localStorage
 * @param {string} provaId - ID da prova
 * @returns {Object} - Objeto com respostas e funções de gerenciamento
 */
export const useRespostas = (provaId) => {
  const [respostas, setRespostas] = useState(() => {
    try {
      const item = window.localStorage.getItem(`fatec-respostas-${provaId}`);
      return item ? JSON.parse(item) : {};
    } catch (error) {
      console.error('Erro ao carregar respostas:', error);
      return {};
    }
  });

  // Atualizar respostas quando provaId mudar
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(`fatec-respostas-${provaId}`);
      setRespostas(item ? JSON.parse(item) : {});
    } catch (error) {
      console.error('Erro ao carregar respostas:', error);
      setRespostas({});
    }
  }, [provaId]);

  const setResposta = (numeroQuestao, resposta) => {
    setRespostas((prev) => {
      const novasRespostas = {
        ...prev,
        [numeroQuestao]: resposta
      };
      // Salvar no localStorage
      window.localStorage.setItem(`fatec-respostas-${provaId}`, JSON.stringify(novasRespostas));
      return novasRespostas;
    });
  };

  const resetRespostas = () => {
    setRespostas({});
    window.localStorage.setItem(`fatec-respostas-${provaId}`, JSON.stringify({}));
  };

  const getTotalRespondidas = () => {
    return Object.keys(respostas).length;
  };

  return {
    respostas,
    setResposta,
    resetRespostas,
    getTotalRespondidas
  };
};

export default useLocalStorage;
