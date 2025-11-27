import React, { useRef, useState } from 'react';
import Question from './components/Question';
import GabaritoPanel from './components/GabaritoPanel';
import Statistics from './components/Statistics';
import Filters from './components/Filters';
import ConfirmModal from './components/ConfirmModal';
import GabaritoModal from './components/GabaritoModal';
import { useLocalStorage, useRespostas } from './hooks/useLocalStorage';
import './styles/App.css';

// Importar configuração das provas
import provasConfig from './data/fatec-app-config.json';

function App() {
  // Estado para prova selecionada
  const [provaSelecionada, setProvaSelecionada] = useLocalStorage('fatec-prova-selecionada', '2024-1');

  // Estado para disciplina selecionada
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useLocalStorage('fatec-disciplina-selecionada', 'todas');

  // Estado para controlar drawer do gabarito (mobile landscape)
  const [gabaritoDrawerAberto, setGabaritoDrawerAberto] = useLocalStorage('fatec-gabarito-drawer', false);

  // Estado para controlar modal de confirmação
  const [modalAberto, setModalAberto] = useState(false);

  // Estado para controlar modal de gabarito
  const [gabaritoModalAberto, setGabaritoModalAberto] = useState(false);

  // Buscar dados da prova selecionada
  const provaAtual = provasConfig.provas.find(p => p.id === provaSelecionada);

  // Hook de respostas com localStorage
  const { respostas, setResposta, resetRespostas } = useRespostas(provaSelecionada);

  // Referência para scroll
  const questoesRefs = useRef({});

  // Gabarito vem direto do config
  const gabarito = provaAtual.gabarito;

  // Filtrar questões por disciplina
  const getQuestoesFiltradas = () => {
    if (disciplinaSelecionada === 'todas') {
      return Array.from({ length: provaAtual.totalQuestoes }, (_, i) => i + 1);
    }

    const disciplina = provaAtual.disciplinas.find(d => d.nome === disciplinaSelecionada);
    return disciplina ? disciplina.questoes : [];
  };

  const questoesFiltradas = getQuestoesFiltradas();

  // Scroll para questão específica
  const scrollToQuestao = (numero) => {
    const ref = questoesRefs.current[numero];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Handler para selecionar resposta
  const handleSelectResposta = (numeroQuestao, resposta) => {
    setResposta(numeroQuestao, resposta);
  };

  // Handler para mudar prova
  const handleChangeProva = (novaProva) => {
    setProvaSelecionada(novaProva);
    setDisciplinaSelecionada('todas');
  };

  // Handler para abrir modal de resetar respostas
  const handleResetRespostas = () => {
    setModalAberto(true);
  };

  // Handler para limpar apenas a prova atual
  const handleLimparProvaAtual = () => {
    resetRespostas();
    setModalAberto(false);
  };

  // Handler para limpar todas as provas
  const handleLimparTodasProvas = () => {
    // Limpar todas as provas
    provasConfig.provas.forEach(prova => {
      window.localStorage.setItem(`fatec-respostas-${prova.id}`, JSON.stringify({}));
    });
    resetRespostas(); // Atualizar estado atual
    setModalAberto(false);
  };

  // Handler para toggle do gabarito modal
  const handleToggleGabarito = () => {
    setGabaritoModalAberto(!gabaritoModalAberto);
  };

  return (
    <div className="app">
      {/* Modal de Confirmação */}
      <ConfirmModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onConfirmCurrent={handleLimparProvaAtual}
        onConfirmAll={handleLimparTodasProvas}
        currentExamName={provaAtual.nome}
      />

      {/* Modal de Gabarito */}
      <GabaritoModal
        isOpen={gabaritoModalAberto}
        onClose={() => setGabaritoModalAberto(false)}
        gabarito={gabarito}
        totalQuestoes={provaAtual.totalQuestoes}
        provaName={provaAtual.nome}
      />

      {/* Header */}
      <header className="app-header">
        <div className="container">
          <h1>Simulado Vestibular FATEC</h1>
          <p>Pratique para o vestibular com questões anteriores</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container">
        <div className="app-content">
          {/* Sidebar */}
          <aside className="sidebar">
            {/* Cabeçalho da sidebar com botão hambúrguer (landscape) */}
            <div className="sidebar-header-landscape">
              <Statistics
                respostas={respostas}
                gabarito={gabarito}
                totalQuestoes={provaAtual.totalQuestoes}
                disciplinas={provaAtual.disciplinas}
              />
              <button
                className="gabarito-hamburger-btn"
                onClick={() => setGabaritoDrawerAberto(!gabaritoDrawerAberto)}
                title="Ver gabarito"
              >
                <span className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                <span className="hamburger-label">Gabarito</span>
              </button>
            </div>

            {/* Statistics (modo normal) */}
            <div className="sidebar-stats-normal">
              <Statistics
                respostas={respostas}
                gabarito={gabarito}
                totalQuestoes={provaAtual.totalQuestoes}
                disciplinas={provaAtual.disciplinas}
              />
            </div>

            {/* Gabarito Panel (modo normal) */}
            <div className="sidebar-gabarito-normal">
              <GabaritoPanel
                totalQuestoes={provaAtual.totalQuestoes}
                respostas={respostas}
                gabarito={gabarito}
                onQuestaoClick={scrollToQuestao}
              />
            </div>
          </aside>

          {/* Drawer do Gabarito (mobile landscape) */}
          {gabaritoDrawerAberto && (
            <>
              <div
                className="gabarito-drawer-overlay"
                onClick={() => setGabaritoDrawerAberto(false)}
              />
              <div className="gabarito-drawer">
                <div className="gabarito-drawer-header">
                  <h3>Gabarito</h3>
                  <button
                    className="gabarito-drawer-close"
                    onClick={() => setGabaritoDrawerAberto(false)}
                  >
                    ✕
                  </button>
                </div>
                <div className="gabarito-drawer-content">
                  <GabaritoPanel
                    totalQuestoes={provaAtual.totalQuestoes}
                    respostas={respostas}
                    gabarito={gabarito}
                    onQuestaoClick={(numero) => {
                      scrollToQuestao(numero);
                      setGabaritoDrawerAberto(false);
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* Main Area */}
          <main className="main-content">
            {/* Filtros */}
            <Filters
              provas={provasConfig.provas}
              provaSelecionada={provaSelecionada}
              disciplinas={provaAtual.disciplinas}
              disciplinaSelecionada={disciplinaSelecionada}
              onChangeProva={handleChangeProva}
              onChangeDisciplina={setDisciplinaSelecionada}
              mostrarGabarito={gabaritoModalAberto}
              onToggleGabarito={handleToggleGabarito}
              onResetRespostas={handleResetRespostas}
            />

            {/* Lista de Questões */}
            <div className="questions-list">
              {questoesFiltradas.map((numero) => (
                <div
                  key={numero}
                  ref={(el) => (questoesRefs.current[numero] = el)}
                >
                  <Question
                    numero={numero}
                    imagemUrl={`${process.env.PUBLIC_URL}/questions/fatec/${provaSelecionada}/questao_${String(numero).padStart(2, '0')}.png`}
                    respostaSelecionada={respostas[numero] || null}
                    onSelectResposta={handleSelectResposta}
                    respostaCorreta={gabarito[numero]}
                    disabled={false}
                  />
                </div>
              ))}
            </div>

            {/* Botão de voltar ao topo */}
            <button
              className="btn-scroll-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              ↑ Voltar ao Topo
            </button>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container">
          <p>© 2024 FATEC - Sistema de Questões | Desenvolvido para estudo</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
