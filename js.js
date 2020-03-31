
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10 //podemos agregar más secuencias

class Juego {

  constructor() {

    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel, 500)
  }

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.toggleBtbEmpezar()
    this.nivel = 1
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  toggleBtbEmpezar(){
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide')
    }else{
      btnEmpezar.classList.add('hide')
    }
  }

  generarSecuencia(){
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  siguienteNivel(){
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }

  transformarNumeroColor(numero) {
    switch (numero) {
      case 0:
        return 'celeste'

      case 1:
        return 'violeta'

      case 2:
        return 'naranja'

      case 3:
        return 'verde'
    }
  }

  transformarColorNumero(color) {
    switch (color) {
      case 'celeste':
        return 0

      case 'violeta':
        return 1

      case 'naranja':
        return 2

      case 'verde':
        return 3
    }
  }

  iluminarSecuencia(){
    for (var i = 0; i < this.nivel; i++) {
      //con let la variable color se mantenga para cada uno de los ciclos
      let color = this.transformarNumeroColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i)

    }
  }

  iluminarColor(color){
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color){
    this.colores[color].classList.remove('light')
  }

  agregarEventosClick(){
    this.colores.celeste.addEventListener('click', this.elegirColor.bind(this)) //necesitamos explícitamente decirle que le atemos al this de la clase juego
    this.colores.verde.addEventListener('click', this.elegirColor.bind(this))
    this.colores.violeta.addEventListener('click', this.elegirColor.bind(this))
    this.colores.naranja.addEventListener('click', this.elegirColor.bind(this))
  }

  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click', this.elegirColor.bind(this)) //necesitamos explícitamente decirle que le atemos al this de la clase juego
    this.colores.verde.removeEventListener('click', this.elegirColor.bind(this))
    this.colores.violeta.removeEventListener('click', this.elegirColor.bind(this))
    this.colores.naranja.removeEventListener('click', this.elegirColor.bind(this))

  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorNumero(nombreColor)

    this.iluminarColor(nombreColor)

    if(numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++

      if (this.subnivel === this.nivel){
        this.nivel++
        this.eliminarEventosClick()

        if(this.nivel === (ULTIMO_NIVEL + 1)){
          this.ganoJuego()

        }else{
          setTimeout(this.siguienteNivel, 1500)
        }
      }
    } else {
      this.perdioJuego()
    }
  }

  ganoJuego(){
    swal('Felicidades!','Has ganado!', 'success')
      .then(this.inicializar.bind(this))
  }

  perdioJuego(){
    swal('Oooooh!', 'Has perdido!', 'error')
      .then(() => {
        this.eliminarEventosClick()
        this.inicializar()
      })
  }
}

function empezarJuego() {
  window.juego = new Juego()
}
