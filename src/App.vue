<script setup>
import {reactive, ref} from 'vue'
import AlertaError from "./components/AlertaError.vue";
import Spinner from "./components/Spinner.vue";
import Cotizacion from "./components/Cotizacion.vue";
import useCripto from "./composables/useCripto.js";

const {monedas, criptomonedas, cotizacion, cargando, obtenerCotizacion, mostrarResultado} = useCripto()

const cotizar = reactive({
  moneda: '',
  criptomoneda: ''
})

const error = ref('')

const cotizarCripto = () => {
  // Validar que el objeto cotizar este lleno
  if (Object.values(cotizar).includes('')) {
    error.value = 'Todos los campos son obligatorios' // Agrega mensaje de error
    setTimeout(() => {
      error.value = '' // Vacía el contenido de la variable 'error'
    }, 3000) // El mensaje de alerta se borra después de 3 segundos
    return null
  }
  // Obtiene cotización
  obtenerCotizacion(cotizar)
}
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>
    <div class="contenido">
      <AlertaError v-if="error">{{ error }}</AlertaError>
      <form
          class="formulario"
          @submit.prevent="cotizarCripto"
      >
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
      <Spinner v-if="cargando"/>
      <Cotizacion
          v-if="mostrarResultado"
          :cotizacion="cotizacion"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
