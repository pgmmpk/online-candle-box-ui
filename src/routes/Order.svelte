<script>
    export let params;

    import OrderComp from '../components/OrderComp.svelte';
    import Loading from '../components/Loading.svelte';
    import { user, api } from '../store.js';
    import { fmtDate, createPdf } from '../createPdf.js';

    async function preload() {
        const order = await api(`api/orders/${params.orderId}`);
        return order;
    }

    function download(order) {
        createPdf({
            order,
            user: $user.name,
        }).download(`candlebox_order_${order.id}.pdf`);

        // const take = [
        //     {
        //         name: 'candle_large',
        //         quantity: 5,
        //     },
        //     {
        //         name: 'candle_medium',
        //         quantity: 2,
        //     },
        //     {
        //         name: 'candle_small',
        //         quantity: 15,
        //     }
        // ];
        // const place = [
        //     {
        //         name: 'icon_theotokos/candle_large',
        //         quantity: 3,
        //     },
        //     {
        //         name: 'icon_theotokos/candle_small',
        //         quantity: 3,
        //     },
        //     {
        //         name: 'icon_theotokos/candle_medium',
        //         quantity: 3,
        //     },

        //     {
        //         name: 'icon_theotokos2/candle_large',
        //         quantity: 3,
        //     },
        //     {
        //         name: 'icon_theotokos2/candle_small',
        //         quantity: 3,
        //     },
        //     {
        //         name: 'icon_theotokos2/candle_medium',
        //         quantity: 3,
        //     },

        //     {
        //         name: 'icon_theotokos2/candle_large',
        //         quantity: 3,
        //     },
        //     {
        //         name: 'icon_theotokos2/candle_small',
        //         quantity: 3,
        //     },
        //     {
        //         name: 'icon_theotokos2/candle_medium',
        //         quantity: 3,
        //     },

        //     {
        //         name: 'icon_theotokos2/candle_large',
        //         quantity: 3,
        //     },
        //     {
        //         name: 'icon_theotokos2/candle_small',
        //         quantity: 3,
        //     },
        //     {
        //         name: 'icon_theotokos2/candle_medium',
        //         quantity: 3,
        //     },
        //     {
        //         name: 'icon_theotokos2/candle_large',
        //         quantity: 3,
        //     },
        //     {
        //         name: 'icon_theotokos2/candle_small',
        //         quantity: 3,
        //     },
        //     {
        //         name: 'icon_theotokos2/candle_medium',
        //         quantity: 3,
        //     },
        //     {
        //         name: 'icon_theotokos2/candle_large',
        //         quantity: 3,
        //     },
        //     {
        //         name: 'icon_theotokos2/candle_small',
        //         quantity: 3,
        //     },
        //     {
        //         name: 'icon_theotokos2/candle_medium',
        //         quantity: 3,
        //     },

        // ];

        // const living = [
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        // ];

        // const deceased = [
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        //     'Михаила',
        // ];
    }
</script>

{#await preload()}
<Loading />
{:then order}
<OrderComp on:click={()=>download(order)} header="Order" button="Download PDF" {order} />
{:catch error}
<strong>{error}</strong>
{/await}
