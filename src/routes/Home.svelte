<script>
import { user, api } from '../store.js';
import OrderComp from '../components/OrderComp.svelte';
import Nothing from '../components/Nothing.svelte';
import Loading from '../components/Loading.svelte';
import {push, pop, replace} from 'svelte-spa-router'

async function preload() {
    const order = await api('api/orders/pending', {
        headers: {
            'Authorization': 'Basic ' + btoa($user.token + ':')
        }
    });
    return order;
}

async function createOrder() {
    const order = await api('api/orders/create');
    push(`/orders/${order.id}`)
}
</script>

{#await preload()}
<Loading />
{:then order}
{#if order}
<OrderComp on:click={createOrder} header="Pending order" button="Create this order" {order} />
{:else}
<Nothing />
{/if}
{:catch error}
{error}
{/await}