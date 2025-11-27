import React from 'react';
import './GabaritoModal.css';

/**
 * Modal para exibir o gabarito completo da prova
 */
const GabaritoModal = ({ isOpen, onClose, gabarito, totalQuestoes, provaName }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="gabarito-modal-overlay" onClick={onClose} />
      <div className="gabarito-modal-container">
        <div className="gabarito-modal-header">
          <h3>Gabarito - {provaName}</h3>
          <button className="gabarito-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="gabarito-modal-body">
          <div className="gabarito-modal-grid">
            {Array.from({ length: totalQuestoes }, (_, i) => i + 1).map((numero) => (
              <div key={numero} className="gabarito-modal-item">
                <span className="gabarito-modal-numero">{numero}</span>
                <span className="gabarito-modal-resposta">{gabarito[numero]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gabarito-modal-footer">
          <button className="gabarito-modal-btn-close" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </>
  );
};

export default GabaritoModal;
