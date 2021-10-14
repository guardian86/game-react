import { IonInput } from "@ionic/react";
import "./Home.css";
import { useState, useEffect, useMemo } from "react";

const SIGNOS = ["+", "-", "*", "/"];

const Home: React.FC = () => {
  const [primerNumero, setPrimerNumero] = useState(0);
  const [segundoNumero, setSegundoNumero] = useState(0);
  const [signo, setSigno] = useState("+");
  const [resultado, setResultado] = useState<string>("");
  const [calificacion, setCalificacion] = useState<boolean | null>(null);
  useEffect(() => {
    nuevaOperacion();
  }, []);

  const nuevaOperacion = () => {
    setPrimerNumero(Math.floor(generarNumeroAleatorio() * (10000 - 0 + 1 + 0)));
    setSegundoNumero(
      Math.floor(generarNumeroAleatorio() * (10000 - 0 + 1 + 0))
    );
    const position = Math.floor(generarNumeroAleatorio() * (3 - 0 + 1 + 0));
    setSigno(SIGNOS[position]);
    setCalificacion(null);
    setResultado("");
  };

  const generarNumeroAleatorio = () => {
    return Math.random();
  };

  const validarResultado = () => {
    const respuesta = eval(primerNumero + signo + segundoNumero);
    setCalificacion(respuesta == resultado);
  };

  return useMemo(() => (
    <div className="game-container center-flex">
      <div className="game-number center-flex">{primerNumero}</div>
      <div className="game-operator center-flex">{signo}</div>
      <div className="game-number center-flex">{segundoNumero}</div>
      <div className="game-form">
        <IonInput
          className="game-form-input"
          type="number"
          value={resultado}
          onIonChange={(e) => setResultado(e.detail.value!)}
        ></IonInput>
        <button className="game-form-button" onClick={validarResultado}>
          Validar
        </button>
        {calificacion && <div>Correcto</div>}
        {calificacion === false && <div>Incorrecto</div>}
        <button className="game-form-button" onClick={nuevaOperacion}>
          Generar nueva
        </button>
      </div>
    </div>
  ), [primerNumero, signo, segundoNumero, calificacion, resultado]);
};

export default Home;
