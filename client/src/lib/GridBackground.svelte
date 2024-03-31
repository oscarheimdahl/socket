<script lang="ts">
  import { onMount } from 'svelte';
  import { onTopic, send } from './socket';
  import { TOPICS } from '@root/topics';

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
      if (lastSend + 10 > Date.now()) return;
      lastSend = Date.now();
      send(TOPICS.MOUSE_MOVE, {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    });
  });
</script>

<div class="bg fixed top-0 left-0 w-full h-full">
  {#each positions as { x, y }, i}
    <div
      class="cursor ease-linear absolute size-[2px] bg-[#ffffff] rounded-full transition-transform duration-[10ms]"
      style="transform: translateX({x * window.innerWidth}px) translateY({y *
        innerHeight}px);"
    ></div>
  {/each}
</div>

<style>
  .cursor {
    box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.5);
  }
  .bg {
    --grid-color: rgba(0, 0, 0, 0.9);
    --grid-size: 2px;
    background-size: 8px 8px;
    background-image: linear-gradient(
        to right,
        var(--grid-color) var(--grid-size),
        transparent var(--grid-size)
      ),
      linear-gradient(
        to bottom,
        var(--grid-color) var(--grid-size),
        transparent var(--grid-size)
      );
  }
</style>
