import React from 'react';
import './Question.css';

/**
 * Componente de Questão
 * Exibe a imagem da questão e as opções de resposta (A-E)
 */
const Question = ({
  numero,
  imagemUrl,
  respostaSelecionada,
  onSelectResposta,
  mostrarGabarito,
  respostaCorreta,
  disabled
}) => {
  const opcoes = ['A', 'B', 'C', 'D', 'E'];

  const getStatusResposta = (opcao) => {
    // Feedback instantâneo: mostra acerto/erro assim que o usuário responde
    if (!respostaSelecionada) return ''; // Não respondida ainda

    // Se o usuário selecionou esta opção
    if (opcao === respostaSelecionada) {
      return opcao === respostaCorreta ? 'correta' : 'errada';
    }

    // Se o usuário errou, mostra a resposta correta também
    if (respostaSelecionada && respostaSelecionada !== respostaCorreta && opcao === respostaCorreta) {
      return 'correta';
    }

    // Se gabarito visível, mostra a resposta correta mesmo que não selecionada
    if (mostrarGabarito && opcao === respostaCorreta) {
      return 'correta';
    }

    return '';
  };

  const isRespondida = respostaSelecionada !== null;

  return (
    <div className={`question-container ${isRespondida ? 'respondida' : ''}`}>
      <div className="question-header">
        <h2>Questão {numero}</h2>
        {isRespondida && (
          <span className={`respondida-badge ${respostaSelecionada === respostaCorreta ? 'acerto' : 'erro'}`}>
            {respostaSelecionada === respostaCorreta ? 'Acertou' : 'Errou'}
          </span>
        )}
      </div>

      <div className="question-image">
        <img
          src={imagemUrl}
          alt={`Questão ${numero}`}
          loading="lazy"
        />
      </div>

      <div className="question-options">
        {opcoes.map((opcao) => (
          <button
            key={opcao}
            className={`option-button ${respostaSelecionada === opcao ? 'selected' : ''} ${getStatusResposta(opcao)}`}
            onClick={() => !disabled && onSelectResposta(numero, opcao)}
            disabled={disabled}
          >
            <span className="option-letter">{opcao}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
