<script lang="ts">
  import type { Message } from './types';

  export let message: Message;
  export let sameSenderAsPreviousMessage: boolean;
  const selfStyle = 'from-violet-950 to-violet-900 ring-1 ring-violet-600';
  const otherStyle = 'from-fuchsia-950 to-fuchsia-900 ring-1 ring-fuchsia-600';
  const self = message.sentBy === 'self';
</script>

<div
  class={`flex flex-col max-w-[10%] gap-1 first:mt-auto ${self ? 'self-end items-end' : ''}`}
>
  {#if !self && !sameSenderAsPreviousMessage}
    <span class="text-gray-500 text-sm">
      {message.senderName || 'Unknown'}
    </span>
  {/if}
  <div
    class={`
          ${self ? selfStyle : otherStyle}
            bg-gradient-to-t rounded-sm text-white py-1 px-2 w-fit
  `}
  >
    <span class="w-fit">
      {message.message}
    </span>
  </div>
</div>
