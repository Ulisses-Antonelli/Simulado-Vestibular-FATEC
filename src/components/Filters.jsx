import React from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
          <VisibilityOutlinedIcon fontSize="small" style={{ marginRight: '6px' }} />
          Ver Gabarito
        </button>

        <button
          className="btn-reset"
          onClick={onResetRespostas}
        >
          <DeleteOutlineIcon fontSize="small" style={{ marginRight: '6px' }} />
          Limpar Respostas
        </button>
      </div>
    </div>
  );
};

export default Filters;
