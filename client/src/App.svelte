<script lang="ts">
  import Messages from './lib/Messages.svelte';
  import ShadowBlurs from './lib/ShadowBlurs.svelte';
  import DisplayNameInput from './lib/DisplayNameInput.svelte';
  import MessageInput from './lib/MessageInput.svelte';
  import UsersList from './lib/UsersList.svelte';
  import CursorsVisualizer from './lib/CursorsVisualizer.svelte';
</script>

<main class="bg-black grid place-items-center h-full">
  <ShadowBlurs />
  <CursorsVisualizer />

  <div
    class={`main-container gap-2 w-full px-2 z-10 flex justify-center sm:grid`}
  >
    <div class="hidden sm:block"></div>
    <div class="flex flex-col gap-2 relative w-80">
      <DisplayNameInput />
      <Messages />
      <MessageInput />
    </div>
    <div class="mt-8 hidden sm:block">
      <UsersList />
    </div>
  </div>
</main>

<style>
  .main-container {
    grid-template-columns: 1fr auto 1fr;

    animation: fadeIn 0.5s 0.8s;
    animation-iteration-count: 1;
    opacity: 0;
    animation-fill-mode: forwards;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(1rem);
    }
    to {
      opacity: 1;
    }
  }
</style>
