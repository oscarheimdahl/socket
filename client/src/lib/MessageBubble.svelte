<script lang="ts">
  import type { Message } from './types';

  export let message: Message;
</script>

<div
  class={`${message.sentBy === 'self' ? 'self-end bg-blue-600' : 'bg-gray-500'}
          first:mt-auto rounded-sm text-white px-2 w-fit
  `}
>
  <span class="max-w-full">
    {message.message}
  </span>
</div>
