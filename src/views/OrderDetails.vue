<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { parseISO, format } from 'date-fns'

const route = useRoute()
const router = useRouter()
const orderId = ref(route.params.id)

const orderDetails = ref(null)

const fetchOrderDetails = async (id) => {
	axios
    .get(`https://arlindberisha-001-site1.htempurl.com/api/v1/orders/${id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `bearer ${localStorage.getItem('token')}`
      }
    })
    .then(({ data }) => {
      orderDetails.value = data
    })
}

onMounted(() => {
  fetchOrderDetails(orderId.value)
})
</script>

<template>
	<main class="max-w-screen-xl mx-auto px-4 my-6 text-neutral-600">
		<button @click="router.push('/')" class="flex items-center gap-2 text-primary-500 mb-4">
			<svg class="h-4 w-4" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path>
</svg> Kthehu
		</button>
        <p class="text-4xl mb-5 flex items-center gap-2"> Detajet e porosisë</p>
				
				<div class="flex justify-end flex-col gap-2 mb-5 ">
					<div>
						Data: <b>{{ orderDetails ? format(parseISO(orderDetails?.receiptDatetime), 'yyyy-MM-dd HH:mm') : null }}</b>
					</div>
					<div>
						Kamarieri: <b>{{ orderDetails?.staffName }}</b>
					</div>
					<div>
						Tavolina: <b>{{ orderDetails?.tableName }}</b>
					</div>
				</div>
        <div class="relative overflow-x-auto sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <!-- <th scope="col" class="px-6 py-3">Order ID</th> -->
                        <th scope="col" class="px-6 py-3">Emri i produktit</th>
                        <th scope="col" class="px-6 py-3">Sasia</th>
                        <th scope="col" class="px-6 py-3 text-right">Totali</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in orderDetails?.orderlines" :key="product.productId"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-6 py-4">
                            {{ product.productName }}
                        </td>
                        <td class="px-6 py-4">{{ product.quantity }} pcs</td>
                        <td class="px-6 py-4 text-right">{{ product.totalPrice }} €</td>
                    </tr>
                </tbody>
            </table>
        </div>
				
					<div class="flex justify-end text-2xl mt-6">
						Totali: {{ orderDetails?.billTotal }} €
					</div>
    </main>
</template>