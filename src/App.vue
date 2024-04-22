<script setup>
import {onMounted, ref} from 'vue'

// Genera la variable reactiva con las monedas disponibles en la aplicación
const monedas = ref([
  {codigo: 'USD', texto: 'Dolar de Estados Unidos'},
  {codigo: 'EUR', texto: 'Euro'},
  {codigo: 'CLP', texto: 'Peso Chileno'},
  {codigo: 'ARS', texto: 'Peso Argentino'},
  {codigo: 'PEN', texto: 'Sol Peruano'},
  {codigo: 'MXN', texto: 'Peso Mexicano'},
  {codigo: 'GBP', texto: 'Libra Esterlina'},
])

// Genera la variable reactiva para contener las principales criptomonedas
const criptomonedas = ref([])

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
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select id="moneda">
            <option value="">-- Selecciona --</option>
            <option
                v-for="moneda in monedas"
                :value="moneda.codigo"
            >
              {{ moneda.texto }}
            </option>
          </select>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
