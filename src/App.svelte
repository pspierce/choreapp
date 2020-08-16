<script>
  import { onMount } from "svelte";
  import { state } from "./Stores/state.js";
  import { workers } from "./Stores/users.js";
  import { chores } from "./Stores/chores.js";
  import { current_component, listen, debug, assign } from "svelte/internal";
  import { quintOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";

  import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Col,
    Container,
    Row,
    FormGroup,
    Form,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
  } from "sveltestrap";

  export let name;

  let currentUser = "";
  let userLabel;
  let open = false;
  let tmpChorePlace = null;
  let availableWorkers = [];
  let takenChores = [];
  let spinActive = false;
  let noUsers = true;
  let numUsers = 0;
  let spinInterval;

  workers.subscribe(() => {
    availableWorkers = workers.getAvailableWorkers();
    takenChores = workers.takenChores();
  });

  function newPlace(place) {
    if (tmpChorePlace == null || tmpChorePlace != place) {
      tmpChorePlace = place;
      return true;
    }
    return false;
  }

  let pickedChores = [];
  let chore;
  let assignedChores = [];
  let assignedWorkerId;
  function randomChore() {
    chore = $chores[Math.floor(Math.random() * $chores.length)];
    // Get the index of the assigned chore.
    availableWorkers.forEach(w => {
      w.chores = w.chores.filter(c => {
        return c != chore.id;
      });
      console.log(w.name, w.chores);
    });

    let workerIdx = Math.floor(Math.random() * availableWorkers.length);
    availableWorkers[workerIdx].chores.push(chore.id);
    availableWorkers = [...availableWorkers];
  }

  function spinIt() {
    spinActive = !spinActive;
    let currentWorker;
    if (spinActive) {
      spinInterval = setInterval(randomChore, 150);
    } else {
      clearInterval(spinInterval);
    }
  }

  $: {
    availableWorkers = $workers.filter(w => w.available == true);
    numUsers = availableWorkers.length;
    noUsers = numUsers <= 0 ? true : false;
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  h2 {
    padding-bottom: 2rem;
    border-bottom: 1px solid lightgray;
    margin-bottom: 2rem;
  }

  :global(.card-title > h2, h3) {
    font-size: 2em;
    color: #ff3e00;
    margin-bottom: 1px;
  }

  :global(.card-title > h4) {
    text-transform: uppercase;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  span.idx:after {
    content: "\002E";
  }

  label.user-input {
    width: 100%;
    border: 1px solid blue;
    padding: 0.5rem;
  }

  label.user-input:hover {
    background-color: green;
  }

  input.user-input[type="radio"] {
    display: none;
  }

  button.worker {
    padding: 20px;
    min-width: 40px;
    color: green;
  }

  :global(div.card) {
    margin: 1rem 0;
  }

  h3.chore-place {
    text-transform: uppercase;
  }

  .chore {
    font-size: 0.8em;
    background-color: cadetblue;
    border: 1px solid black;
    margin: 0.5rem;
    padding: 0.4rem;
    width: 50%;
    color: white;
  }

  :global(div.chorebody) {
    height: 400px;
  }
</style>

<main>

  <div class="mx-auto col-md-6">
    <Card class="mb-3">
      <CardHeader>
        <CardTitle>
          <h1>Chorinator</h1>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <CardSubtitle>
          <h2>Because adults contribute!</h2>
        </CardSubtitle>
        <div>
          <CardText>
            <Card>
              <CardTitle>
                <h3>Whose getting something done today?</h3>
                <div class="btn-group" data-toggle="buttons">
                  {#each $workers as worker}
                    <label
                      class="btn btn-primary"
                      class:active={worker.available}
                      id="worker{worker.id}">
                      <input
                        type="checkbox"
                        on:change={() => workers.setWorker(worker.id)}
                        disabled={spinActive}
                        autocomplete="off" />
                      {worker.name}
                    </label>
                  {/each}
                </div>
              </CardTitle>
              <CardBody>
                <Row>
                  {#each availableWorkers as user}
                    <Col>
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            <h3>{user.name}</h3>
                          </CardTitle>
                        </CardHeader>
                        <CardBody class="chorebody">
                          <CardText>
                            {#each user.chores as chore, idx}
                              <p>{chores.getChoreFromId(chore).name}</p>
                            {/each}
                          </CardText>
                        </CardBody>
                      </Card>
                    </Col>
                  {/each}
                </Row>
                <p class="text-center">
                  <button on:click={spinIt} disabled={noUsers}>
                    {!spinActive ? 'Spin' : 'Stop'} the wheel!
                  </button>
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardTitle>
                <h2>Chores</h2>
              </CardTitle>
              <CardBody class="text-left">

                {#each $chores as chore, i}
                  {#if newPlace(chore.place)}
                    <h4 class="chore-place">{chore.place}</h4>
                  {/if}
                  <div class="chore " id="chore{i}">
                    <span class="idx">{i + 1}</span>
                    {chore.name}
                  </div>
                {/each}
              </CardBody>
            </Card>
          </CardText>
        </div>
      </CardBody>
      <CardFooter>Footer</CardFooter>
    </Card>
  </div>
</main>
