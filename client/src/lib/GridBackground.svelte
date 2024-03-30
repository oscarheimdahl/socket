<script lang="ts">
  import { onMount } from 'svelte';
  import { onTopic, send } from './socket';
  import { TOPICS } from '../../../topics';

  type Position = {
    x: number;
    y: number;
  };
  let positions: Position[] = [];

  onTopic(TOPICS.MOUSE_MOVE, (data) => {
    positions = data.message;
  });

  let lastSend = Date.now();
  onMount(() => {
    window.addEventListener('mousemove', (e) => {
      if (lastSend + 100 > Date.now()) return;
      lastSend = Date.now();
      send(TOPICS.MOUSE_MOVE, { x: e.clientX, y: e.clientY });
    });
  });
</script>

<div class="bg fixed top-0 left-0 w-full h-full">
  {#each positions as { x, y }, i}
    <div
      class="cursor ease-linear absolute size-[2px] bg-[#ffffff] rounded-full transition-transform duration-100"
      style="transform: translateX({x}px) translateY({y}px);"
    ></div>
  {/each}
</div>

<style>
  .cursor {
    box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.5);
  }
  .bg {
    background-size: 8px 8px;
    background-image: linear-gradient(to right, black 2px, transparent 2px),
      linear-gradient(to bottom, black 2px, transparent 2px);
  }
</style>
