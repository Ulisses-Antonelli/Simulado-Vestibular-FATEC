import React from 'react';
import './GabaritoPanel.css';

/**
 * Painel de Gabarito
 * Exibe um grid com todas as questões e seu status (acerto/erro/não respondida)
 */
const GabaritoPanel = ({
  totalQuestoes,
  respostas,
  gabarito,
  onQuestaoClick,
  mostrarGabarito
}) => {
  const getStatusQuestao = (numero) => {
    const resposta = respostas[numero];
    if (!resposta) return 'nao-respondida';
    // Feedback instantâneo: mostra acerto/erro assim que responde
    return resposta === gabarito[numero] ? 'acerto' : 'erro';
  };

  return (
    <div className="gabarito-panel">
      <h3>Gabarito</h3>
      <div className="gabarito-grid">
        {Array.from({ length: totalQuestoes }, (_, i) => i + 1).map((numero) => {
          const status = getStatusQuestao(numero);
          return (
            <button
              key={numero}
              className={`gabarito-item ${status}`}
              onClick={() => onQuestaoClick(numero)}
              title={`Questão ${numero}${respostas[numero] ? ` - Resposta: ${respostas[numero]}` : ' - Não respondida'}`}
            >
              <span className="questao-numero">{numero}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GabaritoPanel;
