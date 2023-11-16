import { Children, useState, useEffect } from "react";
import "./App.css";
import { FcPaid } from "react-icons/fc";
import { Howl, Howler } from "howler";
const col = ["A", "B", "C", "D", "E", "F", "G", "H"];
const lin = ["1", "2", "3", "4", "5", "6", "7", "8"];
var a = [];
var b = [];
var b1 = [];
var c = [];
var c1 = [];
var c2 = [];
var resu = [];
var barco = [];
var barco2 = [];
var barco3 = [];
var bloqueo = [];
var hundido = [];
var d1 = 0;
var cli = [];
var x = 0;
var acer = [];
var stop = false;
var porta = document.getElementsByClassName("port");
var desem = document.getElementsByClassName("dese");
var torpe = document.getElementsByClassName("tor");

const Square = ({ Children, estado, index, Updatetablero, d, Check }) => {
  const handleClick = (e) => {
    if (cli.includes(index)) {
    } else {
      var x = 0;
      barco.forEach((Element) => {
        if (resu[index] === Element) {
          Check(Element, x);

          x = 1;
        }
      });
      if (x === 1) {
        resu[index] = <FcPaid style={{ fontSize: "30px" }} />;
        acer.push(index);
      } else {
        resu[index] = "";
        const agua = () => {
          var sound = new Howl({
            src: ["sound/agua.m4a"],
          });
          sound.play();
        };
        agua();
      }

      cli.push(index);

      Updatetablero(index, estado);
    }
  };

  return (
    <div className="square" onClick={!stop ? handleClick : null}>
      {resu[index]}
    </div>
  );
};

function App() {
  const [tablero, settablero] = useState(Array(64).fill(null));

  const [d, setd] = useState(30);
  const [d1, setd1] = useState(0);
  const [rei, setRei] = useState(false);
  const [veo, setVeo] = useState(false);
  const [veo1, setVeo1] = useState(false);

  lin.forEach((element) => {
    for (let c = 0; c < col.length; c++) {
      resu.push(col[c].concat(element));
    }
  });
  const Reinicio = (rei) => {
    if (d === 0 || d1 === 16) {
      const newtablero = Array(64).fill(null);
      settablero(newtablero);

      resu = [];
      lin.forEach((element) => {
        for (let c = 0; c < col.length; c++) {
          resu.push(col[c].concat(element));
        }
      });

      barco = [];
      barco2 = [];
      barco3 = [];
      cli = [];
      bloqueo = [];
      acer = [];
      var dire = 0;
      var acol = 0;
      var alin = 0;
      setVeo(false);
      setVeo1(false);

      Barco1(acol, alin);
      Barco3(acol, alin);
      Barco2(acol, alin);
      Barco3(acol, alin);
      Barco2(acol, alin);
      Barco3(acol, alin);

      setd(30);
      setd1(0);
      hundido = [];
      a = [];
      b = [];
      b1 = [];
      c = [];
      c1 = [];
      c2 = [];
      console.log(barco);
      hundido = barco;
      porta[0].style.opacity = 1;
      desem[0].style.opacity = 1;
      torpe[0].style.opacity = 1;
      stop = false;
    }
  };
  var gen = resu;

  const Check = (Element, x) => {
    var t = 0;
    x = 0;

    t = hundido.indexOf(Element);

    if (t == 0 || t == 1 || t == 2 || t == 3) {
      a.push(hundido.indexOf(Element));
      if (a.length === 4) {
        x = 2;
        porta[0].style.opacity = 0;
      }
    }
    if (t == 4 || t == 5) {
      c.push(hundido.indexOf(Element));
      if (c.length === 2) {
        x = 2;
      }
    }
    if (t == 6 || t == 7 || t == 8) {
      b.push(hundido.indexOf(Element));
      if (b.length === 3) {
        x = 2;
      }
    }
    if (t == 9 || t == 10) {
      c1.push(hundido.indexOf(Element));
      if (c1.length === 2) {
        x = 2;
      }
    }
    if (t == 11 || t == 12 || t == 13) {
      b1.push(hundido.indexOf(Element));
      if (b1.length === 3) {
        x = 2;
      }
    }
    if (t == 14 || t == 15) {
      c2.push(hundido.indexOf(Element));
      if (c2.length === 2) {
        x = 2;
      }
    }
    if ((c.length || c1.length || c2.length) === 2) {
      torpe[0].style.opacity = 0.66;
    }
    if (
      c.length + c1.length === 4 ||
      c.length + c2.length === 4 ||
      c1.length + c2.length === 4
    ) {
      torpe[0].style.opacity = 0.33;
    }
    if (c.length + c1.length + c2.length === 6) {
      torpe[0].style.opacity = 0;
    }
    if (b.length === 3 || b1.length === 3) {
      desem[0].style.opacity = 0.5;
    }
    if (b.length + b1.length === 6) {
      desem[0].style.opacity = 0;
    }

    if (x === 0) {
      const tocado = () => {
        var sound = new Howl({
          src: ["sound/tocado.m4a"],
        });
        sound.play();
      };
      tocado();
    } else {
      const hundido = () => {
        var sound = new Howl({
          src: ["sound/hundido.m4a"],
        });
        sound.play();
      };
      hundido();
    }
  };

  const Barco1 = (acol, alin) => {
    var dire = Math.round(Math.random() * 1);
    if (dire === 1) {
      var acol = Math.round(Math.random() * 4);
      var alin = Math.round(Math.random() * 7);

      for (let i = 0; i < 4; i++) {
        barco.push(col[acol + i].concat(lin[alin]));
        Bloqueo(acol, alin, i, dire);
      }
    }
    if (dire === 0) {
      var acol = Math.round(Math.random() * 7);
      var alin = Math.round(Math.random() * 4);

      for (let i = 0; i < 4; i++) {
        barco.push(col[acol].concat(lin[alin + i]));
        Bloqueo(acol, alin, i, dire);
      }
    }

    var result = gen.filter((Element) => !bloqueo.includes(Element));
    gen = [];
    gen = result;
  };

  const Barco2 = (acol, alin) => {
    let f = 0;
    var barco2 = [];

    var dire = Math.round(Math.random() * 1);
    var bar = Math.round(Math.random() * (gen.length - 1));

    if (gen[bar] === undefined) {
      Barco2();
    } else {
      var barc = gen[bar].split("");

      acol = col.indexOf(barc[0]);

      alin = lin.indexOf(barc[1]);
    }

    if (dire === 1) {
      for (let i = 0; i < 3; i++) {
        if (col[acol + i] === undefined) {
          f = 1;
        } else {
          if (!gen.includes(col[acol + i].concat(lin[alin]))) {
            f = 1;
          }
        }
      }
      if (f !== 0) {
        Barco2();
      } else {
        for (let i = 0; i < 3; i++) {
          barco2.push(col[acol + i].concat(lin[alin]));

          Bloqueo(acol, alin, i, dire);
        }
      }
    }
    if (dire === 0) {
      for (let i = 0; i < 3; i++) {
        if (lin[alin + i] === undefined) {
          f = 1;
        } else {
          if (!gen.includes(col[acol].concat(lin[alin + i]))) {
            f = 1;
          }
        }
      }
      if (f !== 0) {
        Barco2();
      } else {
        for (let i = 0; i < 3; i++) {
          barco2.push(col[acol].concat(lin[alin + i]));

          Bloqueo(acol, alin, i, dire);
        }
      }
    }

    var result = gen.filter((Element) => !bloqueo.includes(Element));
    gen = [];
    gen = result;

    barco.push(...barco2);
  };

  const Barco3 = (acol, alin) => {
    let f = 0;
    var barco3 = [];
    var bloqueo2 = [];
    var dire = Math.round(Math.random() * 1);
    var bar = Math.round(Math.random() * (gen.length - 1));

    if (gen[bar] === undefined) {
      Barco3();
    } else {
      var barc = gen[bar].split("");

      acol = col.indexOf(barc[0]);

      alin = lin.indexOf(barc[1]);
    }

    if (dire === 1) {
      for (let i = 0; i < 2; i++) {
        if (col[acol + i] === undefined) {
          f = 1;
        } else {
          if (!gen.includes(col[acol + i].concat(lin[alin]))) {
            f = 1;
          }
        }
      }
      if (f !== 0) {
        Barco3();
      } else {
        for (let i = 0; i < 2; i++) {
          barco3.push(col[acol + i].concat(lin[alin]));

          Bloqueo(acol, alin, i, dire);
        }
      }
    }
    if (dire === 0) {
      for (let i = 0; i < 2; i++) {
        if (lin[alin + i] === undefined) {
          f = 1;
        } else {
          if (!gen.includes(col[acol].concat(lin[alin + i]))) {
            f = 1;
          }
        }
      }
      if (f !== 0) {
        Barco3();
      } else {
        for (let i = 0; i < 2; i++) {
          barco3.push(col[acol].concat(lin[alin + i]));

          Bloqueo(acol, alin, i, dire);
        }
      }
    }

    var result = gen.filter((Element) => !bloqueo.includes(Element));
    gen = [];
    gen = result;

    barco.push(...barco3);
  };

  const Bloqueo = (acol, alin, i, dire) => {
    if (dire === 0) {
      if (lin[alin + (i - 1)] > -1) {
        if (gen.includes(col[acol].concat(lin[alin + (i - 1)]))) {
          bloqueo.push(col[acol].concat(lin[alin + (i - 1)]));
        }
      }
      if (lin[alin + (i + 1)] < 8) {
        if (gen.includes(col[acol].concat(lin[alin + (i + 1)]))) {
          bloqueo.push(col[acol].concat(lin[alin + (i + 1)]));
        }
      }
      if (acol - 1 > -1) {
        if (gen.includes(col[acol - 1].concat(lin[alin + i]))) {
          bloqueo.push(col[acol - 1].concat(lin[alin + i]));
        }
      }
      if (acol + 1 < 8) {
        if (gen.includes(col[acol + 1].concat(lin[alin + i]))) {
          bloqueo.push(col[acol + 1].concat(lin[alin + i]));
        }
      }
    } else {
      if (acol + (i - 1) > -1) {
        if (gen.includes(col[acol + (i - 1)].concat(lin[alin]))) {
          bloqueo.push(col[acol + (i - 1)].concat(lin[alin]));
        }
      }
      if (acol + (i + 1) < 8) {
        if (gen.includes(col[acol + (i + 1)].concat(lin[alin]))) {
          bloqueo.push(col[acol + (i + 1)].concat(lin[alin]));
        }
      }
      if (lin[alin - 1] > -1) {
        if (gen.includes(col[acol + i].concat(lin[alin - 1]))) {
          bloqueo.push(col[acol + i].concat(lin[alin - 1]));
        }
      }
      if (lin[alin + 1] < 8) {
        if (gen.includes(col[acol + i].concat(lin[alin + 1]))) {
          bloqueo.push(col[acol + i].concat(lin[alin + 1]));
        }
      }
    }

    const dataArr = new Set(bloqueo);
    bloqueo = [...dataArr];
  };

  const Generar = () => {
    useEffect(() => {
      var dire = 0;
      var acol = 0;
      var alin = 0;

      Barco1(acol, alin);
      Barco3(acol, alin);
      Barco2(acol, alin);
      Barco3(acol, alin);
      Barco2(acol, alin);
      Barco3(acol, alin);

      hundido = [];
      console.log(barco);
      hundido = barco;
    }, []);
  };
  Generar(rei);

  const Updatetablero = (index) => {
    if (acer.includes(index)) {
      const newd1 = d1 + 1;
      setd1(newd1);
      if (d1 === 15) {
        setVeo(!veo);
        stop = true;
        const aplauso = () => {
          var sound = new Howl({
            src: ["sound/aplauso.mp3"],
          });
          sound.play();
        };
        aplauso();
      }
    }
    const newd = d - 1;
    setd(newd);
    if (d === 1) {
      setVeo1(!veo1);
      stop = true;
      const final = () => {
        var sound = new Howl({
          src: ["sound/gameover0.mp3"],
        });

        var sound1 = new Howl({
          src: ["sound/gameover1.mp3"],
        });
        sound.play();
        setTimeout(() => {
          sound1.play();
        }, 3000);
      };
      final();
    }
  };

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
                    Check={Check}
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
          </div>{(d === 0 || d1 ===16) && (<button className="reinicio" onClick={Reinicio}>
            Reiniciar
          </button>)}
          
        </div>
        <section>
          {veo && (<div className="ganador"></div>)}
        </section>
        <section>
          {veo1 && (<div className="final"></div>)}
        </section>

        
      </div>
    </>
  );
}

export default App;
