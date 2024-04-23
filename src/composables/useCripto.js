import {ref, onMounted, computed} from 'vue'

export default function useCripto() {

    onMounted(async () => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
        const respuesta = await fetch(url)
        criptomonedas.value = (await respuesta.json()).Data
    })
    const monedas = ref([
        {codigo: 'USD', texto: 'Dolar (US)'},
        {codigo: 'EUR', texto: 'Euro'},
        {codigo: 'ARS', texto: 'Peso Argentino'},
        {codigo: 'CLP', texto: 'Peso Chileno'},
        {codigo: 'MXN', texto: 'Peso Mexicano'},
        {codigo: 'PEN', texto: 'Sol Peruano'},
        {codigo: 'GBP', texto: 'Libra Esterlina'},
    ])
    const criptomonedas = ref([])
    const cotizacion = ref({})
    const cargando = ref(false)

    const obtenerCotizacion = async (cotizar) => {
        cargando.value = true
        const {moneda, criptomoneda} = cotizar
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const respuesta = await fetch(url)
        cotizacion.value = (await respuesta.json())['DISPLAY'][criptomoneda][moneda]
        cargando.value = false
    }

    const mostrarResultado = computed(() => {
        return Object.entries(cotizacion.value).length > 0 && !cargando.value
    })

    return {
        monedas,
        criptomonedas,
        cotizacion,
        cargando,
        obtenerCotizacion,
        mostrarResultado
    }
}