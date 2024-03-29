<script lang="ts">
  export let handleClick: () => void;
  let clicked = false;

  function _handleClick() {
    handleClick();
    clicked = true;
    setTimeout(() => {
      clicked = false;
    }, 200);
  }
</script>

<button
  class={`${clicked ? 'border-white' : ''}
          peer/button transition-all relative flex w-full justify-center items-center outline-none
          bg-black border border-gray-500 text-white px-1 button hover:border-white active:border-gray-700 focus-visible:border-white
          `}
  type="submit"
  on:click={handleClick}
  >Send
</button>

<div
  class={`absolute -right-1 -bottom-1 transition-transform 
          peer-focus-visible/button:-translate-x-[4px]
          peer-focus-visible/button:-translate-y-[4px]

          peer-hover/button:-translate-x-[4px]
          peer-hover/button:-translate-y-[4px]
          peer-hover/button:opacity-0

          peer-focus-visible:-translate-x-[4px]
          peer-focus-visible:-translate-y-[4px]
          peer-focus/button:opacity-0
        `}
>
  <div
    class={`${clicked ? 'border-white' : ''}
          w-4 h-4 transition-all border border-l-0 border-t-0 border-gray-500`}
  ></div>
</div>

<style>
</style>
