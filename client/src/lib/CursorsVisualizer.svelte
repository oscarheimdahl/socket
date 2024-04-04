<script lang="ts">
  import { onMount } from 'svelte';
  import { onTopic, send } from './socket/socket';
  import { TOPICS } from '@root/topics';

  type Position = {
    x: number;
    y: number;
  };
  let userPositions: { userId: string; position: Position }[] = [];
  let clickIndicatorPositions: { id: string; position: Position }[] = [];

  onTopic(TOPICS.MOUSE_MOVE, (data) => {
    userPositions = data.message;
  });

  onTopic(TOPICS.MOUSE_CLICK, (data) => {
    const userId = data.message;
    const userPosition = userPositions.find((pos) => pos.userId === userId);
    if (!userPosition) return;
    const indicatorId = crypto.randomUUID();
    clickIndicatorPositions = [
      ...clickIndicatorPositions,
      { position: userPosition.position, id: indicatorId },
    ];

    // setTimeout(() => {
    //   clickIndicatorPositions = clickIndicatorPositions.filter(
    //     (indicator) => indicatorId !== indicator.id
    //   );
    // }, 2000);
  });

  let lastMove = Date.now();
  function onMouseMove(e: MouseEvent) {
    const DEBOUNCE = 50;
    if (lastMove + DEBOUNCE > Date.now()) return;
    lastMove = Date.now();
    send(TOPICS.MOUSE_MOVE, {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    });
  }

  let lastClick = Date.now();
  function onMouseClick() {
    const DEBOUNCE = 500;
    if (lastClick + DEBOUNCE > Date.now()) return;
    lastClick = Date.now();
    send(TOPICS.MOUSE_CLICK);
  }

  onMount(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onMouseClick);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onMouseClick);
    };
  });
</script>

<div class="bg fixed top-0 left-0 w-full h-full">
  {#each userPositions as { userId, position }}
    <div
      class="absolute"
      style="transform: translateX({position.x *
        window.innerWidth}px) translateY({position.y * innerHeight}px);"
    >
      <div
        class="text-white -translate-x-1/2 -translate-y-1/2 cursor ease-linear size-[2px] bg-[#ffffff] rounded-full transition-transform duration-[10ms]"
      ></div>
    </div>
  {/each}
  {#each clickIndicatorPositions as { id, position }}
    <div
      {id}
      class="absolute"
      style="transform: translateX({position.x *
        window.innerWidth}px) translateY({position.y * innerHeight}px);"
    >
      <div class="-translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          class="click-indicator size-80 border-4 border-[#ffffffcc] rounded-full"
        ></div>
      </div>
    </div>
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

  .click-indicator {
    animation: grow 2s 1 cubic-bezier(0.13, 1.08, 0.26, 0.96);
    animation-fill-mode: forwards;
  }

  @keyframes grow {
    from {
      transform: scale(0.1);
      opacity: 1;
    }
    to {
      transform: scale(1);
      opacity: 0;
    }
  }
</style>
