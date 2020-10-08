<script lang="ts" >
    import { onMount } from 'svelte';
    import { getMessage, setMessage } from '../WS/wsHelper';
    import type { Task } from '../WS/types';
    import TaskComponent from '../components/Taks/TaskComponent.svelte';
    import TaskForm from '../components/Taks/TaskForm.svelte';

    let tasks: Array<Task> = [];
    let history: Array<Task> = [];
    let setCompletedTask;
    let resetHistoryTask;
    let updateStarted = false;
    let taskToEdit;
    let saveTask;
    $: console.log(taskToEdit);

	onMount(async() => {
		const protocol = window && window.location.protocol === 'https' ? 'wss' : 'ws';
		const wsurl = `${protocol}://${window.location.host}`;
		const ws = new WebSocket(wsurl, 'story');
		
		ws.onopen = _ => ws.send(setMessage('getstories'));
		ws.onclose = _ => ws.send(setMessage('I just close'));

		ws.addEventListener('message', ({data}) => {
            const result = getMessage(data);
            if (result.tasks) {
                tasks = result.tasks.filter(task => !task.c);
                history = result.tasks.filter(task => task.c);
                console.log(tasks, history);
                updateStarted = false;
            }
		});

		setCompletedTask = id => {
            if (updateStarted) return;
            updateStarted = true;
            const updateTask:Task = tasks.find(task => task.id === id);
            updateTask.c = updateTask.c ? !updateTask.c : true;
            ws.send(setMessage({updateTask}))
        }

        resetHistoryTask = id => {
            if (updateStarted) return;
            updateStarted = true;
            const updateTask:Task = history.find(task => task.id === id);
            updateTask.c = !updateTask.c;
            ws.send(setMessage({updateTask}))
        }

        saveTask = (ev) => {
            ev.preventDefault();
            console.log(' save task', taskToEdit)
            ws.send(setMessage({updateTask: taskToEdit}));
            taskToEdit = undefined;
        }
	})
    
    const setEdit = id => {
        console.log({id});
        taskToEdit = tasks.find(task => task.id === id);
    }
	
</script>

<style>
    ol {
        box-shadow: 0px 0px 9px #eee;
        padding: 30px;
    }
   
    .history {
        margin-top: 2em;
        opacity: .7;
    }
</style>

<head>
	<title>Gallery</title>
</head>

{#if updateStarted}
    <p>Update list...</p>
{:else}
    {#if taskToEdit}
        <TaskForm bind:taskToEdit={taskToEdit} on:click={saveTask}/>
    {/if}
    <ol>
        {#each tasks as task, i (task.v)} 
            <TaskComponent  on:click={_=>setCompletedTask(task.id)} {task} {i} {setEdit}/>
        {/each}
    </ol>
    <ol class='history'>
        {#each history as ctask (ctask.v)} 
            <TaskComponent  on:click={_=>resetHistoryTask(ctask.id)} task={ctask}/>
        {/each}
    </ol>
{/if}

