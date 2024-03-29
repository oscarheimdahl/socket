<script lang="ts">
  import type { Message } from './types';

  export let message: Message;
  const selfStyle =
    'self-end from-violet-950 to-violet-900 ring-1 ring-violet-600';
  const otherStyle = 'from-fuchsia-950 to-fuchsia-900 ring-1 ring-fuchsia-600';
</script>

<div
  class={`
  ${message.sentBy === 'self' ? selfStyle : otherStyle}
        first:mt-auto  bg-gradient-to-t rounded-sm text-white py-1 px-2 w-max max-w-[80%]
  `}
>
  <span class="max-w-full">
    {message.message}
  </span>
</div>
