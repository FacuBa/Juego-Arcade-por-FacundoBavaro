	var juego = {
  		filas: [[],[],[]],
  		espacioVacio: {
    	 fila: 2,
    	 columna: 2
  },

    crearPieza: function(numero, fila, columna) {
      var nuevoElemento= $('<div>');

      nuevoElemento.addClass('pieza');

      nuevoElemento.css({
        backgroundImage:'url(./piezas/' + numero + '.png)',
        top: fila * 300,
        left: columna * 300
      });
		  return {
    el: nuevoElemento,
    numero: numero,
    filaInicial: fila,
    columnaInicial: columna,
	}
 },
    iniciarPiezas: function(contenedor) {
      var counter= 1;
    
  	 for (var fila = 0;fila < 3; fila++) {
    	 for (var columna = 0; columna < 3; columna++) {
      		  if(fila == this.espacioVacio.fila && columna == this.espacioVacio.columna) {

		  this.filas[fila][columna]= null;   
      } else {
        var pieza= this.crearPieza(counter++, fila, columna);
        contenedor.append(pieza.el);
        this.filas[fila][columna] = pieza;
   	}
   }
  }
 },

 	  intercambiarPosicionConEspacioVacio(fila, columna){
      var ficha = this.filas[fila] && this.filas[fila][columna];

    if(ficha){

      this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
      this.moverFichaFilaColumna(ficha,this.espacioVacio.fila,this.espacioVacio.columna);
      this.guardarEspacioVacio(fila,columna);
    }
  },

    moverFichaFilaColumna(ficha,fila,columna){
      ficha.el.css({
        top: fila * 300,
        left: columna * 300
      })
  },

    guardarEspacioVacio(fila,columna){
      this.espacioVacio.fila = fila;
      this.espacioVacio.columna = columna;
	     this.filas[fila][columna] = null;
  },
    

		  moverHaciaAbajo(){
    		var filaOrigen = this.espacioVacio.fila-1;
    		var columnaOrigen = this.espacioVacio.columna;

    	this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
  },
  		moverHaciaArriba(){
    		var filaOrigen = this.espacioVacio.fila+1;
    		var columnaOrigen = this.espacioVacio.columna;

    	this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
  },
  		moverHaciaLaDerecha(){
    		var filaOrigen = this.espacioVacio.fila;
    		var columnaOrigen = this.espacioVacio.columna-1;

    	this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
  },
  		moverHaciaLaIzquierda(){
    		var filaOrigen = this.espacioVacio.fila;
    		var columnaOrigen = this.espacioVacio.columna+1;

    	this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
  },

    mezclarFichas(veces){
    
        if (veces <= 0) { return; }

    var that = this;

    var funciones = ['moverHaciaAbajo','moverHaciaArriba','moverHaciaLaIzquierda','moverHaciaLaDerecha'];

    var numeroRandom = Math.floor(Math.random() * funciones.length);

    var nombreDeFuncion = funciones[numeroRandom];

      this[nombreDeFuncion]();

    setTimeout(function() {

      that.mezclarFichas(veces - 1);

    }, 15);

  },
  
			

    chequearSiGano(){
	   var that= this;
        for (var f = 0; f < this.filas.length; f++) {
          for (var c = 0; c < this.filas.length; c++) {
            var ficha = this.filas[f][c];
            if(ficha && !(ficha.filaInicial == f && ficha.columnaInicial == c)){
          return false;
        }
      }
    }
    return alert('¡Ganaste! Pulsa "enter" para reiniciar el juego'),
    this.mezclarFichas(10); /*Aca lo que hice fue llamar a la funcion mezclarFichas para que una vez completado el puzzle y cerrado el alert se vuelvan a mezclar las piezas */
  },


	capturarTeclas: function() {
		var that= this;

	$(document).keydown(function(evento) {
  		switch(evento.which) {
      		case 37:
       			that.moverHaciaLaIzquierda();
      		break;
      		case 38:
        		that.moverHaciaArriba();
      		break;
      		case 39:
        		that.moverHaciaLaDerecha();
      		break;
      		case 40:
        		that.moverHaciaAbajo();
      		break;

      		default: /* cuando no se cumple ninguna condicion aterior */ return;
				}
      		   that.chequearSiGano();
      			evento.preventDefault();
  			
		});
	},

  	iniciar: function(contenedor) {
  		this.iniciarPiezas (contenedor);
      this.mezclarFichas(10); /*Esta puesto en 10 para que sea mas facil de completar y asi comprobar que al finalizar el puzzle se vuelven a mezclar las fichas*/ 
  		this.capturarTeclas ();
    
	}

};



$(function() {
  var contenedor = $('#juego');       
  juego.iniciar(contenedor);
});


  
    