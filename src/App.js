import React, { useRef } from 'react';
import Question from './components/Question';
import GabaritoPanel from './components/GabaritoPanel';
import Statistics from './components/Statistics';
import Filters from './components/Filters';
import { useLocalStorage, useRespostas } from './hooks/useLocalStorage';
import './styles/App.css';

// Importar configuração das provas
import provasConfig from './data/fatec-app-config.json';

function App() {
  // Estado para prova selecionada
  const [provaSelecionada, setProvaSelecionada] = useLocalStorage('fatec-prova-selecionada', '2024-1');

  // Estado para disciplina selecionada
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useLocalStorage('fatec-disciplina-selecionada', 'todas');

  // Estado para mostrar/ocultar gabarito
  const [mostrarGabarito, setMostrarGabarito] = useLocalStorage('fatec-mostrar-gabarito', false);

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
    if (window.confirm('Ao trocar de prova, as respostas atuais serão mantidas. Deseja continuar?')) {
      setProvaSelecionada(novaProva);
      setDisciplinaSelecionada('todas');
    }
  };

  // Handler para resetar respostas
  const handleResetRespostas = () => {
    resetRespostas();
  };

  return (
    <div className="app">
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
            <Statistics
              respostas={respostas}
              gabarito={gabarito}
              totalQuestoes={provaAtual.totalQuestoes}
              disciplinas={provaAtual.disciplinas}
              mostrarGabarito={mostrarGabarito}
            />

            <GabaritoPanel
              totalQuestoes={provaAtual.totalQuestoes}
              respostas={respostas}
              gabarito={gabarito}
              onQuestaoClick={scrollToQuestao}
              mostrarGabarito={mostrarGabarito}
            />
          </aside>

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
              mostrarGabarito={mostrarGabarito}
              onToggleGabarito={() => setMostrarGabarito(!mostrarGabarito)}
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
                    imagemUrl={`${process.env.PUBLIC_URL}/questions/fatec/${provaSelecionada}/clean/questao_${String(numero).padStart(2, '0')}.png`}
                    respostaSelecionada={respostas[numero] || null}
                    onSelectResposta={handleSelectResposta}
                    mostrarGabarito={mostrarGabarito}
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
