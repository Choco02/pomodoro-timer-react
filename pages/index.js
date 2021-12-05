import Head from "next/head";
import styles from "../styles/Home.module.css";

import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Button } from "../components/Button";

export default function Home() {
  const [tempo, setTempo] = useState(0);
  const [executando, setExecutando] = useState(false);
  const [selecionado, setSelecionado] = useState(25);
  const [audio, setAudio] = useState("");
  const [pausarButton, setPausarButton] = useState("Pausar");

  let countDownTimeout;

  useEffect(() => {
    if (tempo > 0 && executando) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      countDownTimeout = setTimeout(() => {
        setTempo(tempo - 1);
      }, 1000);
    }
    else if (tempo <= 0) {
      setExecutando(false);
      setAudio('/alarm.mp3');
    }
  }, [tempo, executando]);

  const iniciar = () => {
    setAudio('');
    if (executando) return;
    const sel = selecionado < 60 ? selecionado * 60 : selecionado;
    setSelecionado(sel);
    setTempo(sel);
    setExecutando(true);
  };

  const pausar = () => {
    if (executando) {
      setPausarButton("Continuar");
      setExecutando(false);
    }
    else if (!executando) {
      setPausarButton("Pausar");
      setExecutando(true);
    }
  }

  const parar = () => {
    setTempo(0);
    setExecutando(false);
    clearTimeout(countDownTimeout);
  }

  const formatarTempo = (tempoFuturo) => {
    const d = new Date(tempoFuturo);
    return `${d.getMinutes()}:${d.getSeconds()}`;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pomodoro Timer</title>
        <meta name="description" content="Um simples relógio usado para ajudar a focar em suas tarefas" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <CircularProgressbar
          className={styles.clock}
          value={tempo}
          maxValue={selecionado}
          text={`${formatarTempo(tempo * 1000)}`}
          background={true}
          styles={buildStyles({
            pathColor: "#03fce3",
            textColor: "white",
            backgroundColor: "#b574ff",
          })}
        />
        <div>
          <Button
            className={`${styles.buttonIniciar} ${styles.button}`}
            text="Iniciar"
            outlineColor="DodgerBlue"
            onClick={() => iniciar()}
          />
          <Button
            className={`${styles.buttonPausar} ${styles.button}`}
            text={pausarButton}
            outlineColor="#ff6721"
            onClick={() => pausar()}
          />
          <Button
            className={`${styles.buttonParar} ${styles.button}`}
            text="Parar"
            outlineColor="Red"
            onClick={() => parar()}
          />
        </div>
        <p>
          Selecione o tempo em minutos
        </p>
        <input
          type="number"
          className={styles.input}
          defaultValue={selecionado <= 40 ? selecionado : selecionado / 60}
          min="1"
          max="40"
          disabled={executando}
          onChange={({ target: { value } }) => setSelecionado(value * 60)}
        />

        <audio style={{ display: 'none' }} src={audio} controls autoPlay />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/Choco02/pomodoro-timer-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          Criado por Choco02
        </a>
      </footer>
    </div>
  );
}
