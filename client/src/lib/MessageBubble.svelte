<script lang="ts">
  import type { Message } from './types';

  export let message: Message;

  console.log(message);

  export let sameSenderAsPreviousMessage: boolean;
  const selfStyle = 'from-violet-950 to-violet-900 ring-1 ring-violet-600';
  const otherStyle = 'from-pink-950 to-pink-900 ring-1 ring-pink-600';
  const self = message.sentBy === 'self';
</script>

<div
  class={`flex flex-col max-w-[80%] gap-1 first:mt-auto ${self ? 'self-end items-end' : ''}`}
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
<!-- <div
  class={`
      from-pink-950 to-pink-900 ring-1 ring-pink-600
        bg-gradient-to-t rounded-sm text-white py-1 px-2 w-fit
`}
>
  <span class="w-fit"> message </span>
</div>
<div
  class={`
      from-fuchsia-950 to-fuchsia-900 ring-1 ring-fuchsia-600
        bg-gradient-to-t rounded-sm text-white py-1 px-2 w-fit
`}
>
  <span class="w-fit"> message </span>
</div>
<div
  class={`
      from-blue-950 to-blue-900 ring-1 ring-blue-600
        bg-gradient-to-t rounded-sm text-white py-1 px-2 w-fit
`}
>
  <span class="w-fit"> message </span>
</div>
<div
  class={`
      from-slate-950 to-slate-900 ring-1 ring-slate-600
        bg-gradient-to-t rounded-sm text-white py-1 px-2 w-fit
`}
>
  <span class="w-fit"> message </span>
</div>
<div
  class={`
      from-orange-950 to-orange-900 ring-1 ring-orange-600
        bg-gradient-to-t rounded-sm text-white py-1 px-2 w-fit
`}
>
  <span class="w-fit"> message </span>
</div>
<div
  class={`
      from-green-950 to-slate-900 ring-1 ring-slate-600
        bg-gradient-to-t rounded-sm text-white py-1 px-2 w-fit
`}
>
  <span class="w-fit"> message </span>
</div>
<div
  class={`
      from-gray-950 to-gray-900 ring-1 ring-gray-600
        bg-gradient-to-t rounded-sm text-white py-1 px-2 w-fit
`}
>
  <span class="w-fit"> message </span>
</div>
<div
  class={`
      from-zinc-950 to-zinc-900 ring-1 ring-zinc-600
        bg-gradient-to-t rounded-sm text-white py-1 px-2 w-fit
`}
>
  <span class="w-fit"> message </span>
</div>
<div
  class={`
      from-neutral-950 to-neutral-900 ring-1 ring-neutral-600
        bg-gradient-to-t rounded-sm text-white py-1 px-2 w-fit
`}
>
  <span class="w-fit"> message </span>
</div>
<div
  class={`
      from-stone-950 to-stone-900 ring-1 ring-stone-600
        bg-gradient-to-t rounded-sm text-white py-1 px-2 w-fit
`}
>
  <span class="w-fit"> message </span>
</div>
<div
  class={`
      from-amber-950 to-amber-900 ring-1 ring-amber-600
        bg-gradient-to-t rounded-sm text-white py-1 px-2 w-fit
`}
>
  <span class="w-fit"> message </span>
</div>
<div
  class={`
      from-lime-950 to-lime-900 ring-1 ring-lime-600
        bg-gradient-to-t rounded-sm text-white py-1 px-2 w-fit
`}
>
  <span class="w-fit"> message </span>
</div>
<div
  class={`
      from-emerald-950 to-emerald-900 ring-1 ring-emerald-600
        bg-gradient-to-t rounded-sm text-white py-1 px-2 w-fit
`}
>
  <span class="w-fit"> message </span>
</div>
<div
  class={`
      from-teal-950 to-teal-900 ring-1 ring-teal-600
        bg-gradient-to-t rounded-sm text-white py-1 px-2 w-fit
`}
>
  <span class="w-fit"> message </span>
</div>
<div
  class={`
      from-sky-950 to-sky-900 ring-1 ring-sky-600
        bg-gradient-to-t rounded-sm text-white py-1 px-2 w-fit
`}
>
  <span class="w-fit"> message </span>
</div> -->
