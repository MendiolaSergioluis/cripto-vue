<script setup>
import {ref, reactive, onMounted} from 'vue'

// Genera la variable reactiva con las monedas disponibles en la aplicación
const monedas = ref([
  {codigo: 'USD', texto: 'Dolar (US)'},
  {codigo: 'EUR', texto: 'Euro'},
  {codigo: 'ARS', texto: 'Peso Argentino'},
  {codigo: 'CLP', texto: 'Peso Chileno'},
  {codigo: 'MXN', texto: 'Peso Mexicano'},
  {codigo: 'PEN', texto: 'Sol Peruano'},
  {codigo: 'GBP', texto: 'Libra Esterlina'},
])

// Genera la variable reactiva para contener las principales criptomonedas
const criptomonedas = ref([])
// Cotización recibida del formulario
const cotizar = reactive({
  moneda: '',
  criptomoneda: ''
})

// Agrega los datos de la API a la aplicación cuando esta se inicia
onMounted(async () => {
  const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
  const respuesta = await fetch(url)
  criptomonedas.value = (await respuesta.json()).Data // Agrega las principales criptomonedas desde la API
})

</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>
    <div class="contenido">
      <form class="formulario">
        <!-- Selector de Moneda -->
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select
              id="moneda"
              v-model="cotizar.moneda"
          >
            <option value="">-- Selecciona --</option>
            <option
                v-for="moneda in monedas"
                :value="moneda.codigo"
            >
              {{ moneda.texto }}
            </option>
          </select>
        </div>
        <!-- Selector de Criptomoneda -->
        <div class="campo">
          <label for="cripto">Criptomoneda:</label>
          <select
              id="cripto"
              v-model="cotizar.criptomoneda"
          >
            <option value="">-- Selecciona --</option>
            <option
                v-for="criptomoneda in criptomonedas"
                :value="criptomoneda['CoinInfo'].Name"
            >
              {{ criptomoneda['CoinInfo'].FullName }}
            </option>
          </select>
        </div>
        <!-- Botón para Cotizar -->
        <input type="submit" value="Cotizar">
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
