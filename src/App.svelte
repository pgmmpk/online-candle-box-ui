<script>
	import Tailwindcss from './Tailwindcss.svelte';
	import Login from './Login.svelte';
	import { user } from './store.js';
	import Router from 'svelte-spa-router';
	import { location } from 'svelte-spa-router';
	import Home from './routes/Home.svelte';
	import Order from './routes/Order.svelte';
	import Orders from './routes/Orders.svelte';

	console.log($user);
</script>

<Tailwindcss />
<style>
a:visited {
	color: rgb(75, 85, 99);
}
a:hover {
	color: rgb(17, 24, 39);
}
</style>
{#if !$user}
<div class="container flex w-screen h-screen justify-center items-center mx-auto">
	<Login label="St. Vladimir Memorial Church" />
</div>
{:else}
<header class="text-gray-600 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center text-gray-600">
    <span class="flex title-font hover:no-underline font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="none" class="w-14 h-14 text-green-500" style="padding-bottom: 1.0rem" viewBox="-1 0 23 24">
        <!-- <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path> -->
    	<path fill-rule="evenodd" clip-rule="evenodd"
         	d="m 3.75,21 h 16.5 v 1.5 H 3.75 Z" />
    	<path fill-rule="evenodd" clip-rule="evenodd"
	        d="m 11.25,1.5 c 5.006745,2.8841419 6,5.25 6,7.5 0,5.25 -7.5,4.5 -4.5,10.5 0,0 -6,-2.25 -6,-7.5 0,-5.25 7.5,-5.25 4.5,-10.5 z" />
      </svg>
      <span class="ml-3 text-xl">Online Candle Box</span>
    </span>
    <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      <a href="#/" class="mr-5 border-b-2 hover:no-underline hover:text-gray-900" class:border-transparent={$location!='/'}>Home</a>
      <a href="#/orders/" class="mr-5 border-b-2 hover:no-underline hover:text-gray-900" class:border-transparent={!$location.startsWith('/orders')}>Orders</a>
    </nav>
    <button title="Log Out" on:click={()=>$user=null} class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">{$user.name}
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
</header>
<Router routes={{
	'/': Home,
	'/orders': Orders,
	'/orders/:offset': Orders,
	'/order/:orderId': Order,
}} />
{/if}

