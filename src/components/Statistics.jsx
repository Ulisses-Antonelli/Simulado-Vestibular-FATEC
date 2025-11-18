import React from 'react';
import './Statistics.css';

/**
 * Painel de Estatísticas
 * Exibe métricas em formato de card com 4 quadrantes
 */
const Statistics = ({ respostas, gabarito, totalQuestoes }) => {
  // Cálculos gerais
  const questoesRespondidas = Object.keys(respostas).length;
  const acertos = Object.keys(respostas).filter(
    (q) => respostas[q] === gabarito[q]
  ).length;
  const erros = questoesRespondidas - acertos;

  // Percentual = (acertos * 100) / questões respondidas
  const percentualAcerto = questoesRespondidas > 0
    ? ((acertos * 100) / questoesRespondidas).toFixed(1)
    : 0;

  return (
    <div className="statistics-panel">
      <h3>Estatísticas</h3>
      <div className="statistics-grid">
        <div className="stat-quadrant">
          <div className="stat-label">Respondidas</div>
          <div className="stat-value">{questoesRespondidas}/{totalQuestoes}</div>
        </div>

        <div className="stat-quadrant stat-acertos">
          <div className="stat-label">Acertos</div>
          <div className="stat-value">{acertos}</div>
        </div>

        <div className="stat-quadrant stat-erros">
          <div className="stat-label">Erros</div>
          <div className="stat-value">{erros}</div>
        </div>

        <div className="stat-quadrant stat-percentual">
          <div className="stat-label">Aproveitamento</div>
          <div className="stat-value">{percentualAcerto}%</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
