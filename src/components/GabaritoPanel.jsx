import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './GabaritoPanel.css';

/**
 * Painel de Gabarito
 * Exibe um grid com todas as questões e seu status (acerto/erro/não respondida)
 * No mobile: funciona como dropdown colapsável
 */
const GabaritoPanel = ({
  totalQuestoes,
  respostas,
  gabarito,
  onQuestaoClick,
  mostrarGabarito
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusQuestao = (numero) => {
    const resposta = respostas[numero];
    if (!resposta) return 'nao-respondida';
    // Feedback instantâneo: mostra acerto/erro assim que responde
    return resposta === gabarito[numero] ? 'acerto' : 'erro';
  };

  return (
    <div className="gabarito-panel">
      <div className="gabarito-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>Gabarito</h3>
        <button className="gabarito-toggle" aria-label="Expandir/Recolher Gabarito">
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </button>
      </div>
      <div className={`gabarito-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
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
    </div>
  );
};

export default GabaritoPanel;
