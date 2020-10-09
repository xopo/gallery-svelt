<script lang='ts'>
    import type { Task } from "../../WS/types";


    export let taskToEdit: Task;
    
</script>

<!-- svelte-ignore a11y-autofocus -->
<style>
    form {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border: 1px solid #08a7f3;
        box-shadow: 0 0 20px #eee;
    }
    input {
        width: 80%;
        padding: 0 1em;
        outline: none;
        margin-left: 1.5em;
        border: 1px solid #eee;
        border-radius: 3px;
    }
    input:hover{
        border-color: lime;
    }
</style>

<form>
    <input autofocus={true} bind:value={taskToEdit.v} placeholder='task cannot be empty'/>
    <button type='submit' on:click>💾</button>
</form>
