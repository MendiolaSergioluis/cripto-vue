<script setup>
import {ref} from 'vue'

const monedas = ref([
  {codigo: 'USD', texto: 'Dolar de Estados Unidos'},
  {codigo: 'EUR', texto: 'Euro'},
  {codigo: 'CLP', texto: 'Peso Chileno'},
  {codigo: 'ARS', texto: 'Peso Argentino'},
  {codigo: 'PEN', texto: 'Sol Peruano'},
  {codigo: 'MXN', texto: 'Peso Mexicano'},
  {codigo: 'GBP', texto: 'Libra Esterlina'},
])

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
