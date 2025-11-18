import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './Filters.css';

/**
 * Componente de Filtros
 * Permite filtrar questões por prova e disciplina
 */
const Filters = ({
  provas,
  provaSelecionada,
  disciplinas,
  disciplinaSelecionada,
  onChangeProva,
  onChangeDisciplina,
  mostrarGabarito,
  onToggleGabarito,
  onResetRespostas
}) => {
  return (
    <div className="filters-container">
      <div className="filters-grid">
        {/* Seletor de Prova */}
        <div className="filter-group">
          <label htmlFor="prova-select">Prova</label>
          <select
            id="prova-select"
            value={provaSelecionada}
            onChange={(e) => onChangeProva(e.target.value)}
            className="filter-select"
          >
            {provas.map((prova) => (
              <option key={prova.id} value={prova.id}>
                {prova.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Seletor de Disciplina */}
        <div className="filter-group">
          <label htmlFor="disciplina-select">Disciplina</label>
          <select
            id="disciplina-select"
            value={disciplinaSelecionada}
            onChange={(e) => onChangeDisciplina(e.target.value)}
            className="filter-select"
          >
            <option value="todas">Todas as Disciplinas</option>
            {disciplinas.map((disciplina) => (
              <option key={disciplina.nome} value={disciplina.nome}>
                {disciplina.nome} ({disciplina.questoes.length} questões)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Controles */}
      <div className="filter-controls">
        <button
          className={`btn-toggle-gabarito ${mostrarGabarito ? 'active' : ''}`}
          onClick={onToggleGabarito}
        >
          {mostrarGabarito ? (
            <>
              <VisibilityOffIcon fontSize="small" style={{ marginRight: '6px' }} />
              Ocultar Gabarito
            </>
          ) : (
            <>
              <VisibilityIcon fontSize="small" style={{ marginRight: '6px' }} />
              Mostrar Gabarito
            </>
          )}
        </button>

        <button
          className="btn-reset"
          onClick={() => {
            if (window.confirm('Tem certeza que deseja limpar todas as respostas? Esta ação não pode ser desfeita.')) {
              onResetRespostas();
            }
          }}
        >
          🔄 Limpar Respostas
        </button>
      </div>
    </div>
  );
};

export default Filters;
