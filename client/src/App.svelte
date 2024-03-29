<script lang="ts">
  import { onTopic, send } from './lib/socket';
  import { TOPICS } from '../../topics';
  import type { Message } from './lib/types';
  import MessageBubble from './lib/MessageBubble.svelte';
  import ShadowBlurs from './lib/ShadowBlurs.svelte';
  import SendButton from './lib/SendButton.svelte';
  import DotBackground from './lib/DotBackground.svelte';

  let input = '';
  let displayNameInput: HTMLInputElement;
  let messageDiv: HTMLDivElement;
  let messages: Message[] = [];
  let users: string | undefined[] = [];

  function scrollToBottom() {
    setTimeout(() => {
      messageDiv.scrollTop = messageDiv.scrollHeight;
    }, 0);
  }

  onTopic(TOPICS.NEW_MESSAGE, (data) => {
    messages = messages.concat({
      sentBy: 'other',
      message: data,
    });
    scrollToBottom();
  });

  onTopic(TOPICS.USER_JOIN, (data) => {
    users = data;
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

  function handleDisplayNameChange() {
    const lettersOnly = displayNameInput.value.replace(/[^a-zA-Z]/g, '');
    displayNameInput.value = lettersOnly;
    send(TOPICS.UPDATE_NAME, lettersOnly);
  }
</script>

<main class="bg-black grid place-items-center h-full">
  <ShadowBlurs />
  <DotBackground />

  <div
    class="grid-container gap-2 w-full px-2 z-10 flex justify-center sm:grid"
  >
    <div class="hidden sm:block"></div>
    <div class="flex flex-col gap-2 relative w-80">
      <input
        on:input={handleDisplayNameChange}
        bind:this={displayNameInput}
        class="h-6 flex justify-end bg-transparent text-gray-500 outline-none font-bold px-2 placeholder-gray-800"
        placeholder="Display Name"
        type="text"
      />
      <div
        bind:this={messageDiv}
        class="h-96 w-full no-scrollbar bg-black border-gray-500 border p-4 overflow-y-scroll flex flex-col gap-2"
      >
        {#each messages as message}
          <MessageBubble {message} />
        {/each}
      </div>
      <form on:submit|preventDefault={() => {}} class="group flex w-full gap-2">
        <input
          class="rounded-none w-full outline-none p-1 bg-black text-white border border-gray-500"
          bind:value={input}
          type="text"
        />
        <SendButton {handleClick} />
      </form>
    </div>
    <div class="text-gray-600 mt-8 hidden sm:block">
      <ul class="flex flex-col gap-2">
        {#each users as user}
          {#if !user}
            <li
              class="bg-black italic w-fit border border-gray-500 px-2 py-1 text-gray-500"
            >
              Unknown
            </li>
          {:else}
            <li
              class="bg-black w-fit border border-gray-500 px-2 py-1 text-gray-500"
            >
              {user}
            </li>
          {/if}
        {/each}
      </ul>
    </div>
  </div>
</main>

<style>
  .grid-container {
    grid-template-columns: 1fr auto 1fr;
  }
</style>
