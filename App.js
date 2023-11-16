import { Children, useState, useEffect } from "react";
import "./App.css";
import { FcPaid } from "react-icons/fc";
const col = ["A", "B", "C", "D", "E", "F", "G", "H"];
const lin = ["1", "2", "3", "4", "5", "6", "7", "8"];
var resu = [];
var barco = [];
var barco2 = [];
var barco3 = [];
var bloqueo = [];

var d1 = 0;
const Square = ({ Children, estado, index, Updatetablero, d }) => {
  const handleClick = (e) => {
    var x = 0;

    barco.forEach((Element) => {
      if (resu[index] === Element) {
        x = 1;

        console.log("x1", x);
        console.log("bar", resu[index], index);
      }
    });
    console.log("x2", x);
    x === 1
      ? (resu[index] = <FcPaid style={{ fontSize: "30px" }} />)
      : (resu[index] = "");

    Updatetablero(index, estado);
  };

  return (
    <div className="square" onClick={handleClick}>
      {resu[index]}
    </div>
  );
};

function App() {
  const [tablero, settablero] = useState(Array(64).fill(null));

  const [d, setd] = useState(30);
  const [d1, setd1] = useState(0);

  lin.forEach((element) => {
    for (let c = 0; c < col.length; c++) {
      resu.push(col[c].concat(element));
    }
  });
  const Reinicio = () => {
    console.log("Reniciar");

    const newtablero = Array(64).fill(null);
    settablero(newtablero);
    lin.forEach((element) => {
      for (let c = 0; c < col.length; c++) {
        resu.push(col[c].concat(element));
      }
    });
    Updatetablero();

    console.log(resu);
    setd(30);
  };
  const gen = resu;
  console.log (gen, "gen");

  const Barco1 = (acol, alin) => {
    var dire = Math.round(Math.random() * 1);
    if (dire === 1) {
      var acol = Math.round(Math.random() * 4);
      var alin = Math.round(Math.random() * 7);
      console.log(dire, "hori");

      for (let i = 0; i < 4; i++) {
        barco.push(col[acol + i].concat(lin[alin]));
        Bloqueo(acol, alin, i, dire);
      }
    }
    if (dire === 0) {
      var acol = Math.round(Math.random() * 7);
      var alin = Math.round(Math.random() * 4);
      console.log(dire, "vert");

      for (let i = 0; i < 4; i++) {
        barco.push(col[acol].concat(lin[alin + i]));
        Bloqueo(acol, alin, i, dire);
      }
    }
    console.log(bloqueo, "bloq" )
  };

  const Barco2 = (acol, alin) => {
    console.log(barco2);
    var barco2 = [];
    var bloqueo2 = [];
    var dire = Math.round(Math.random() * 1);
    if (dire === 1) {
      var acol = Math.round(Math.random() * 5);
      var alin = Math.round(Math.random() * 7);

      for (let i = 0; i < 3; i++) {
        barco2.push(col[acol + i].concat(lin[alin]));
        //Bloqueo(acol, alin, i, dire);
      }
    }
    if (dire === 0) {
      var acol = Math.round(Math.random() * 7);
      var alin = Math.round(Math.random() * 5);

      for (let i = 0; i < 3; i++) {
        barco2.push(col[acol].concat(lin[alin + i]));
        //Bloqueo(acol, alin, i, dire);
      }
    }

    bloqueo.forEach((Element) => {
      if (barco2.includes(Element)) {
        barco2 = [];

        Barco2(acol, alin);
      } else {
      }
    });
    console.log(barco, " barco");
    console.log(barco2, "barco2");
    barco.push(...barco2);
  };

  const Barco3 = (acol, alin) => {
    var barco3 = [];
    var dire = Math.round(Math.random() * 1);
    if (dire === 1) {
      var acol = Math.round(Math.random() * 6);
      var alin = Math.round(Math.random() * 7);

      for (let i = 0; i < 2; i++) {
        barco3.push(col[acol + i].concat(lin[alin]));
        Bloqueo(acol, alin, i, dire);
      }
    }
    if (dire === 0) {
      var acol = Math.round(Math.random() * 7);
      var alin = Math.round(Math.random() * 6);

      for (let i = 0; i < 2; i++) {
        barco3.push(col[acol].concat(lin[alin + i]));
        Bloqueo(acol, alin, i, dire);
      }
    }

    bloqueo.forEach((Element) => {
      if (barco3.includes(Element)) {
        barco3 = [];

        Barco3(acol, alin);
      } else {
      }
    });

    barco.push(...barco3);
  };

  const Bloqueo = (acol, alin, i, dire) => {
    console.log("bloqueo", acol, alin, i, dire);
    if (dire === 0) {
      if (lin[alin + (i - 1)] > -1) {
        bloqueo.push(col[acol].concat(lin[alin + (i - 1)]));
      };
      if (lin[alin + (i + 1)] < 8) {
        bloqueo.push(col[acol].concat(lin[alin + (i + 1)]));
      };
      if ((acol - 1) > -1) {
        bloqueo.push(col[acol - 1].concat(lin[alin + i]));
      };
      if ((acol + 1) < 8){bloqueo.push(col[acol + 1].concat(lin[alin + i]));
      };   

    } else {
      if ((acol + (i - 1) > -1)) {
        bloqueo.push(col[acol + (i - 1)].concat(lin[alin]));
      }
      if ((acol + (i + 1) < 8)) {
        bloqueo.push(col[acol + (i + 1)].concat(lin[alin]));
      }
      if (lin[alin - 1] > -1) {
        bloqueo.push(col[acol + i].concat(lin[alin - 1]));
      }
      if (lin[alin + 1] < 9) {
        bloqueo.push(col[acol + i].concat(lin[alin + 1]));
      }
      
      
    }
    console.log(bloqueo, "111");
    const dataArr = new Set(bloqueo);
    bloqueo = [];
    console.log(bloqueo, "222");
    bloqueo = [...dataArr];
    console.log(bloqueo,"333");
  };

  const Generar = () => {
    useEffect(() => {
      var dire = 0;
      var acol = 0;
      var alin = 0;

      console.log(barco);

      Barco1(acol, alin);
      //Barco2(acol, alin);
      //Barco2(acol, alin);
      //Barco3(acol, alin);
      //Barco3(acol, alin);
      //Barco3(acol, alin);

      console.log(barco);
    }, []);
  };
  Generar();

  //useEffect((alea) => {generar(), [alea]}) ;

  const Updatetablero = (index) => {
    const newd = d - 1;
    setd(newd);
  };
  //console.log(d);

  return (
    <>
      <h1>Batalla Naval</h1>,
      <div className="general">
        <div className="columnas">{col}</div>
        <div className="inter">
          <div className="lineas">{lin}</div>
          <div className="tablero">
            <section className="juego">
              {tablero.map((est, index) => {
                return (
                  <Square
                    key={index}
                    index={index}
                    estado={est}
                    Updatetablero={Updatetablero}
                  ></Square>
                );
              })}
            </section>
          </div>

          <div className="aux">
            <section className="port"></section>
            <h4>porta: x x x x</h4>
            <section className="dese"></section>
            <h4>desem 1: x x x</h4>
            <h4>desem 2: x x x</h4>
            <section className="tor"></section>
            <h4>torpe 1: x x </h4>
            <h4>torpe 2: x x </h4>
            <h4>torpe 3: x x </h4>
          </div>
        </div>
        <div className="comando">
          <div className="disp">
            <h3> Disparos disponibles: {d}</h3>
          </div>
          <div className="disp1">
            <h3> Disparos acertados: {d1}</h3>
          </div>
          <button className="reinicio" onClick={Reinicio}>
            Reiniciar
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
