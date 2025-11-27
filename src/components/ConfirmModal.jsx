import React from 'react';
import './ConfirmModal.css';

/**
 * Modal de confirmação para limpar respostas
 */
const ConfirmModal = ({ isOpen, onClose, onConfirmCurrent, onConfirmAll, currentExamName }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-container">
        <div className="modal-header">
          <h3>Limpar Respostas</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-footer">
          <button
            className="modal-btn modal-btn-current"
            onClick={onConfirmCurrent}
          >
            Limpar apenas "{currentExamName}"
          </button>

          <button
            className="modal-btn modal-btn-all"
            onClick={onConfirmAll}
          >
            Limpar TODAS as provas
          </button>

          <button
            className="modal-btn modal-btn-cancel"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
