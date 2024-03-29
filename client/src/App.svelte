<script lang="ts">
  import { onTopic, send } from './lib/socket';
  import { TOPICS } from '../../topics';
  import type { Message } from './lib/types';
  import MessageBubble from './lib/MessageBubble.svelte';
  import ShadowBlurs from './lib/ShadowBlurs.svelte';
  import SendButton from './lib/SendButton.svelte';

  let input = '';
  let messageDiv: HTMLDivElement;
  let messages: Message[] = [];

  function scrollToBottom() {
    setTimeout(() => {
      messageDiv.scrollTop = messageDiv.scrollHeight;
    }, 0);
  }

  onTopic(TOPICS.NEW_MESSAGE, (message: string) => {
    messages = messages.concat({
      sentBy: 'other',
      message,
    });
    scrollToBottom();
  });

  async function handleClick() {
    if (!input.trim()) return;
    send(TOPICS.NEW_MESSAGE, input);
    messages = messages.concat({
      sentBy: 'self',
      message: input,
    });
    input = '';
    scrollToBottom();
  }
</script>

<main class="bg-black grid place-items-center h-full">
  <ShadowBlurs />
  <div
    class="box relative z-10 flex justify-between flex-col gap-2 w-64 shadow-sm"
  >
    <div
      bind:this={messageDiv}
      class="h-96 no-scrollbar bg-black border-gray-500 border p-4 overflow-y-scroll flex flex-col gap-2"
    >
      {#each messages as message}
        <MessageBubble {message} />
      {/each}
    </div>
    <form on:submit|preventDefault={() => {}} class="flex w-full gap-2">
      <input
        class="peer rounded-none outline-none p-1 bg-black text-white border border-gray-500"
        bind:value={input}
        type="text"
      />
      <SendButton {handleClick} />
    </form>
  </div>
</main>

<style>
  .box::after {
    content: '';
    width: 6rem;
    height: 100%;
    position: absolute;
    top: -0.3rem;
    border-top: 1px solid gray;
    pointer-events: none;
  }
</style>
