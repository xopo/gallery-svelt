<script lang="ts" >
    import { onMount, onDestroy } from 'svelte';
    import type { Task } from '../WS/types';
    import TaskComponent from '../components/Taks/TaskComponent.svelte';
    import TaskForm from '../components/Taks/TaskForm.svelte'; 
    import getSocket from '../WS/socket';

    let tasks: Array<Task> = [];
    let history: Array<Task> = [];
    let setCompletedTask;
    let resetHistoryTask;
    let updateStarted = false;
    let taskToEdit;
    let saveTask;
    let WS;
    let subscription = () => {};


	onMount( () => {
		WS = getSocket();
        subscription = WS.tasks.subscribe( items => {
            tasks = items.filter(task => !task.c);
            history = items.filter(task => task.c);
            updateStarted = false;
        });

        setTimeout(() => {
            WS.send('getstories');
        }, 50);

		setCompletedTask = id => {
            if (updateStarted) return;
            updateStarted = true;
            const updateTask:Task = tasks.find(task => task.id === id);
            updateTask.c = updateTask.c ? !updateTask.c : true;
            WS.send({updateTask});
        }

        resetHistoryTask = id => {
            if (updateStarted) return;
            updateStarted = true;
            const updateTask:Task = history.find(task => task.id === id);
            updateTask.c = !updateTask.c;
            WS.send({updateTask});
        }

        saveTask = (ev) => {
            ev.preventDefault();
            WS.send({updateTask: taskToEdit});
            taskToEdit = undefined;
        }

        return () => {
            console.log('Here we cleanup');
        };
	})
    
    const setEdit = id => {
        taskToEdit = tasks.find(task => task.id === id);
    }

    onDestroy(subscription);
	
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
        {#each tasks as task (task.v)} 
            <TaskComponent  on:click={_=>setCompletedTask(task.id)} {task} {setEdit}/>
        {/each}
    </ol>
    <ol class='history'>
        {#each history as ctask (ctask.v)} 
            <TaskComponent  on:click={_=>resetHistoryTask(ctask.id)} task={ctask}/>
        {/each}
    </ol>
{/if}

