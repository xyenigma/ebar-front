<script setup>
import axios from 'axios'
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router';
import { parseISO, format } from 'date-fns'

const orders = ref([])
const pages = ref(1)
const curr = ref(1)
const router = useRouter()

// Function to fetch orders based on the current page
const fetchOrders = (page) => {
    axios
        .get(`http://arlindberisha-001-site1.htempurl.com/api/v1/orders?page=${page}&pageSize=12`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: `bearer ${localStorage.getItem('token')}`
            }
        })
        .then(({ data }) => {
            orders.value = data.orders
            pages.value = data.totalPages
        })
}

// Initial fetch of orders
fetchOrders(curr.value)

// Watch for changes in curr and fetch new orders when it changes
watch(curr, (newCurr) => {
    fetchOrders(newCurr)
})

const goToPage = (page) => {
    if (page !== '...') {
        curr.value = page;
    }
};

const visiblePages = computed(() => {
    const totalVisible = 10;
    const half = Math.floor(totalVisible / 2);
    let start = Math.max(curr.value - half, 1);
    let end = Math.min(start + totalVisible - 1, pages.value);

    if (end - start < totalVisible) {
        start = Math.max(end - totalVisible + 1, 1);
    }

    const pageArray = [];
    for (let i = start; i <= end; i++) {
        pageArray.push(i);
    }

    if (start > 1) {
        pageArray.unshift('...');
        pageArray.unshift(1);
    }

    if (end < pages.value) {
        pageArray.push('...');
        pageArray.push(pages.value);
    }

    return pageArray;
});
</script>

<template>
    <main class="max-w-screen-xl mx-auto px-4 my-6">
        <p class="text-4xl mb-5">Porositë</p>
        <div class="relative overflow-x-auto sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <!-- <th scope="col" class="px-6 py-3">Order ID</th> -->
                        <th scope="col" class="px-6 py-3">Data</th>
                        <th scope="col" class="px-6 py-3 hidden sm:block">Kamarieri</th>
                        <th scope="col" class="px-6 py-3">Tavolina</th>
                        <th scope="col" class="px-6 py-3 text-right">Totali</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order.orderId" @click="router.push(`/orders/${order.orderId}`)"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                        <!-- <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ order.orderId }}
            </th> -->
                        <td class="px-6 py-4">
                            {{ format(parseISO(order.receiptDatetime), 'yyyy-MM-dd HH:mm') }}
                        </td>
                        <td class="px-6 py-4 hidden sm:block">{{ order.staffName }}</td>
                        <td class="px-6 py-4">{{ order.tableName }}</td>
                        <td class="px-6 py-4 text-right">{{ order.billTotal }} €</td>
                    </tr>
                </tbody>
            </table>
            <nav aria-label="Page navigation example" class="flex justify-end mt-5">
                <ul class="flex items-center -space-x-px h-8 text-sm">
                    <li>
                        <button type="button" @click="curr--" :disabled="curr <= 1"
                            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Previous</span>
                            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M5 1 1 5l4 4" />
                            </svg>
                        </button>
                    </li>
                    <li v-for="item in visiblePages" :key="item">
                        <button type="button" :disabled="item === curr" @click="goToPage(item)"
                            :class="item === curr ? 'text-primary-500' : ''"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            {{ item }}
                        </button>
                    </li>
                    <li>
                        <button type="button" @click="curr++" :disabled="curr >= pages"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Next</span>
                            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </main>
</template>