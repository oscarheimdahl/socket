<script lang="ts">
  import type { Message } from './types';

  export let message: Message;

  export let sameSenderAsPreviousMessage: boolean;
  const selfStyle = 'from-violet-950 to-violet-900 ring-1 ring-violet-600';
  const otherStyle = 'from-pink-950 to-pink-900 ring-1 ring-pink-600';
  const self = message.sentBy === 'self';
</script>

<div
  class={`bubble flex flex-col max-w-[80%] gap-1 first:mt-auto ${self ? 'self-end items-end' : ''}`}
>
  {#if !self && !sameSenderAsPreviousMessage}
    <span class="text-gray-500 text-sm">
      {message.senderName || 'Unknown'}
    </span>
  {/if}
  <div
    class={`${self ? selfStyle : otherStyle} bg-gradient-to-t rounded-sm text-white py-1 px-2 w-fit`}
  >
    <span class="w-fit">
      {message.message}
    </span>
  </div>
</div>

<style>
  .bubble > * {
    animation: fadeIn 0.2s 0.1s forwards;
    opacity: 0;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
