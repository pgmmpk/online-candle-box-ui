<script>
  export let header;
  export let button;
  export let order;

  import { fmtDate, parseItems } from '../createPdf.js';

  function parseSku(sku) {
    if (sku === "names/living") return "namesLiving";
    if (sku === "names/deceased") return "namesDeceased";
    if (sku.startsWith("candle_small/")) return "candlesSmall";
    if (sku.startsWith("candle_medium/")) return "candlesMedium";
    if (sku.startsWith("candle_large/")) return "candlesLarge";
    throw new Error(`Failed to parse SKU ${sku}`);
  }

  function computeItemStats(items) {
    const { take, place, living, deceased } = parseItems(items);
    const quantity = {};
    const price = {};

    for (const item of items) {
      const key = parseSku(item.sku);
      quantity[key] = (quantity[key] || 0) + +item.quantity;
      price[key] = (price[key] || 0) + +item.quantity * +item.price;
    }

    return { quantity, price, take, place, living, deceased };
  }

  const { quantity, price, take, place, living, deceased } = computeItemStats(order.items);
</script>

<section class="text-gray-600 body-font overflow-hidden">
  <div class="container px-5 py-5 mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      <div class="w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h1 class="text-gray-900 text-2xl title-font font-medium mb-4">
          {header} #{order.id}
        </h1>
        {#if order.createdBy}
        <div class="flex border-t border-gray-200 py-1">
          <span class="text-gray-500">Created</span>
          <span class="ml-auto text-gray-900">by {order.createdBy} on {fmtDate(order.timestamp)}</span>
        </div>
        {/if}
        <div class="flex border-t border-gray-200 py-1">
          <span class="text-gray-500">From</span>
          <span class="ml-auto text-gray-900">{fmtDate(order.fromDate)}</span>
        </div>
        <div class="flex border-t border-gray-200 py-1">
          <span class="text-gray-500">To</span>
          <span class="ml-auto text-gray-900">{fmtDate(order.toDate)}</span>
        </div>
        <div class="flex border-t border-gray-200 py-1">
          <span class="text-gray-500">Items</span>
          <span class="ml-auto text-gray-900">{order.numItems}</span>
        </div>
        <div class="flex border-t border-gray-200 py-1">
          <span class="text-gray-500">Candles (Large/Medium/Small)</span>
          <span class="ml-auto text-gray-900">
            {quantity.candlesLarge || 0}/{quantity.candlesMedium || 0}/{quantity.candlesSmall || 0}
          </span>
        </div>
        <div class="flex border-t border-b mb-6 border-gray-200 py-1">
          <span class="text-gray-500">Names (Living/Deceased)</span>
          <span class="ml-auto text-gray-900">
            {quantity.namesLiving || 0}/{quantity.namesDeceased || 0}
          </span>
        </div>
        <div class="flex">
          <span class="title-font font-medium text-2xl text-gray-900">
            ${(+order.gross).toFixed(2)}
          </span>
          <button
            on:click
            class="flex ml-auto text-white bg-green-500 border-0 py-2 px-6
            focus:outline-none hover:bg-green-600 rounded">
            {button}
          </button>
        </div>

        {#if take.length}
        <details class="mt-5">
            <summary>Take</summary>
            <table class="table-auto w-full text-left whitespace-no-wrap my-5">
            <tbody>
                {#each take as x,i}
                <tr>
                <td class="py-1 border-t border-gray-200" class:border-b={i==take.length-1}>{x.name}</td>
                <td class="text-right py-1 border-t border-gray-200" class:border-b={i==take.length-1}>{x.quantity}</td>
                </tr>
                {/each}
            </tbody>
            </table>
        </details>
        {/if}

        {#if place.length}
        <details>
            <summary>Place</summary>
            <table class="table-auto w-full text-left whitespace-no-wrap my-5">
            <tbody>
                {#each place as x,i}
                <tr>
                <td class="py-1 border-t border-gray-200" class:border-b={i==place.length-1}>{x.name}</td>
                <td class="text-right py-1 border-t border-gray-200" class:border-b={i==place.length-1}>{x.quantity}</td>
                </tr>
                {/each}
            </tbody>
            </table>
        </details>
        {/if}

        {#if living.length}
        <details>
            <summary>Living</summary>
            <table class="table-auto w-full text-left whitespace-no-wrap my-5">
            <tbody>
                {#each living as x,i}
                <tr>
                <td class="py-1 border-t border-gray-200" class:border-b={i==living.length-1}>{x}</td>
                </tr>
                {/each}
            </tbody>
            </table>
        </details>
        {/if}

        {#if deceased.length}
        <details>
            <summary>Deceased</summary>
            <table class="table-auto w-full text-left whitespace-no-wrap">
            <tbody>
                {#each deceased as x,i}
                <tr>
                <td class="py-1 border-t border-gray-200" class:border-b={i==deceased.length-1}>{x}</td>
                </tr>
                {/each}
            </tbody>
            </table>
        </details>
        {/if}

      </div>
    </div>
  </div>
</section>
