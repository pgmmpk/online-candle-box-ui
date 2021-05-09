<script>
  export let params = { offset: 0 };
  export let pageSize = 15;

  import { user, api } from "../store.js";
  import { fmtDate } from '../createPdf.js';
  import { push } from 'svelte-spa-router';
  import Loading from "../components/Loading.svelte";

  async function preload(pageSize, offset) {
    const res = await api(`api/orders?pageSize=${pageSize}&offset=${offset}`);
    // res.nextOffset = 1;
    return res;
  }

  let promise;
  $: promise = preload(pageSize, params.offset);

  function prevPage() {
    if (params.offset <= 0) return;
    params.offset = Math.max(0, +params.offset - pageSize);
    push(`/orders/${params.offset}`);
  }
  function nextPage() {
    params.offset = +params.offset + pageSize;
    push(`/orders/${params.offset}`);
  }
  function showOrder(orderId) {
    push(`/order/${orderId}`);
  }
</script>

{#await promise}
  <Loading />
{:then data}
  <section class="text-gray-600 body-font">
    <div class="container px-5 pt-5 mx-auto">
      <div class="lg:w-4/5 w-full mx-auto overflow-auto">
        <table class="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr>
              <th
                class="px-4 py-3 title-font tracking-wider font-medium
                text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                Id
              </th>
              <th
                class="px-4 py-3 title-font tracking-wider font-medium
                text-gray-900 text-sm bg-gray-100">
                Items
              </th>
              <th
                class="px-4 py-3 title-font tracking-wider font-medium
                text-gray-900 text-sm bg-gray-100">
                Gross
              </th>
              <th
                class="px-4 py-3 title-font tracking-wider font-medium
                text-gray-900 text-sm bg-gray-100">
                Created
              </th>
              <th
                class="px-4 py-3 title-font tracking-wider font-medium
                text-gray-900 text-sm bg-gray-100">
                From
              </th>
              <th
                class="px-4 py-3 title-font tracking-wider font-medium
                text-gray-900 text-sm bg-gray-100">
                To
              </th>
              <th
                class="px-4 py-3 title-font tracking-wider font-medium
                text-gray-900 text-sm bg-gray-100">
                Link
              </th>
            </tr>
          </thead>
          <tbody>
            {#each data.orders as order}
              <tr>
                <td class="border-t-2 border-gray-200 px-4 py-3">{order.id}</td>
                <td class="border-t-2 border-gray-200 px-4 py-3">
                  {order.numItems}
                </td>
                <td class="border-t-2 border-gray-200 px-4 py-3">
                  ${(+order.gross).toFixed(2)}
                </td>
                <td class="border-t-2 border-gray-200 px-4 py-3">
                  {fmtDate(order.timestamp)}
                </td>
                <td class="border-t-2 border-gray-200 px-4 py-3">
                  {fmtDate(order.fromDate)}
                </td>
                <td class="border-t-2 border-gray-200 px-4 py-3">
                  {fmtDate(order.toDate)}
                </td>
                <td class="border-t-2 border-gray-200 px-4 py-3">
                  <div on:click={()=>showOrder(order.id)} class="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clip-rule="evenodd" />
                  </svg>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div class="flex pl-4 mt-4 lg:w-4/5 w-full mx-auto">
        <div on:click={prevPage} class="mr-5 ml-auto flex justify-center items-center py-2" class:text-gray-200={params.offset <=0} class:cursor-pointer={params.offset > 0}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <span class="flex mx-5 py-2">
        {+params.offset + 1}&nbsp;..&nbsp;{+params.offset+data.orders.length}
        </span>
        <div on:click={data.nextOffset && nextPage} class="ml-5 mr-auto flex justify-center items-center py-2" class:text-gray-200={!data.nextOffset} class:cursor-pointer={data.nextOffset}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  </section>
{:catch error}
  {error}
{/await}
