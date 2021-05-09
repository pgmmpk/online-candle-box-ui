<script>
  export let size = 60;
  export let color = "rgba(16, 185, 129, 1)";
  export let unit = "px";
  export let duration = "0.75s";
</script>
<style>
  .circle {
    height: var(--size);
    width: var(--size);
    border-color: var(--color) transparent var(--color) var(--color);
    border-width: calc(var(--size) / 15);
    border-style: solid;
    border-image: initial;
    border-radius: 50%;
    animation: var(--duration) linear 0s infinite normal none running rotate;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
<section class="text-gray-600 body-font">
    <div class="container flex px-5 py-5 mx-auto justify-center items-center">
        <div class="circle" style="--size: {size}{unit}; --color: {color}; --duration: {duration}"></div>
    </div>
</section>