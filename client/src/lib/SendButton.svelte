<script lang="ts">
  let clicked = false;
</script>

<div
  class={`absolute -left-1 -bottom-1 transition-transform  group-hover:translate-x-[4px] group-hover:translate-y-[-4px] group-focus-visible-w:translate-x-[-4px] group-focus-visible-w:translate-y-[-4px] group-focus-within:translate-x-[4px] group-focus-within:translate-y-[-4px]`}
>
  <div
    class={`${clicked ? 'border-white' : ''} w-4 h-4 transition-all border border-r-0 border-t-0 border-gray-500`}
  ></div>
</div>
<div
  class={`absolute -right-1 -bottom-1 transition-transform group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-focus-visible-w:translate-x-[-4px] group-focus-visible-w:translate-y-[-4px] group-focus-within:translate-x-[-4px] group-focus-within:translate-y-[-4px]`}
>
  <div
    class={`${clicked ? 'border-white' : ''} w-4 h-4 transition-all border border-l-0 border-t-0 border-gray-500`}
  ></div>
</div>
<button
  id="send-button"
  class={`${clicked ? 'border-white' : ''}
          transition-all relative flex w-fit justify-center items-center outline-none
          bg-black border border-gray-500 text-white px-4 button hover:border-white active:border-gray-700 focus-visible:border-white
          `}
  type="submit"
  >Send
</button>

<style>
</style>
