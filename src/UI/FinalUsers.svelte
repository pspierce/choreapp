<script>
  import { workers } from "../Stores/users.js";
  import { chores } from "../Stores/chores.js";
  import { cubicOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";
  import {
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
  } from "sveltestrap";

  export let spinActive;
  let availableWorkers = workers.getAvailableWorkers();
  let availableChores = $chores;

  function getAvailableChore(user) {
    let chosenChoreId = Math.floor(Math.random() * availableChores.length) + 1;
  }

  function spinIt() {
    while (spinActive) {
      let chosenUserId =
        Math.floor(Math.random() * availableWorkers.length) + 1;
      let choseUser = availableWorkers[chosenUserId];
      let chosenChoreId =
        Math.floor(Math.random() * availableChores.length) + 1;
      let choseChore = workers.takenChores();
    }
  }

  $: {
  }
</script>

<Row>
  {#each $workers as user}
    {#if user.available}
      <Col>
        <Card>
          <CardHeader>
            <CardTitle>
              <h3>{user.name}</h3>
            </CardTitle>
          </CardHeader>
        </Card>
      </Col>
    {/if}
  {/each}
</Row>
