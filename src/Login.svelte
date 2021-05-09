<script>
    export let label = 'Log In';
    export let comment = '';
    import Input from './components/Input.svelte';
    import Loading from './components/Loading.svelte';
    import { user, login } from './store.js';

    let username, password;

    let promise = null;
    function submit() {
        promise = (async () => {
            $user = await login(username, password);
        })();
        password = '';
    }
</script>

{#await promise}
<Loading />
{:then}
<form on:submit|preventDefault={submit} class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-5">
    <h2 class="text-gray-900 text-lg font-medium title-font mb-5">{label}</h2>
    <Input bind:value={username} label="Email" type="email" required />
    <Input bind:value={password} label="Password" type="password" required />
    <button class="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Log In</button>
    <p class="text-xs text-gray-500 mt-3">{comment}</p>
</form>
{:catch error}
<string>{error}</string>
{/await}
