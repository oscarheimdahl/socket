<script lang="ts">
  import { TOPICS } from '@root/topics';
  import SendButton from './SendButton.svelte';

  import { send } from './socket/socket';
  import { addMessage, subscribe } from './store/store';

  let input: HTMLInputElement;
  let displayName = '';

  subscribe((store) => {
    displayName = store.displayName;
  });

  async function handleClick() {
    if (!input.value.trim()) return;
    send(TOPICS.NEW_MESSAGE, input.value);
    addMessage({
      sentBy: 'self',
      senderId: 'self',
      message: input.value,
      senderName: displayName,
    });
    input.value = '';
    input.focus();
  }
</script>

<form on:submit|preventDefault={() => {}} class="group flex w-full gap-2">
  <input
    class="rounded-none w-full outline-none p-1 bg-black text-white border border-gray-500"
    bind:this={input}
    type="text"
  />
  <SendButton {handleClick} />
</form>
