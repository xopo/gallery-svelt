<script lang="ts">
    export let task; 
    export let i = 2;
    export let setEdit = _ => {};
</script>
<style>
    .first {
        font-weight: bolder;
    }
    li {
        padding: 5px;
        display: flex;
        justify-content: space-between;
        border-radius: 5%;
        border: 1px solid #eee;
    }
    
    li:hover {
        border-color: #a2e0a2;
        background: rgba(0, 0, 0, 0.02);
    }

    .completed .text {
        text-decoration: line-through;
    } 
        
    .completed:hover {
        border-color: red;
    }
    .action {
        display: flex;
    }
    .action div {
        cursor: pointer;
        padding: 0 .8em;
        opacity: .1;
    }
    .action div:empty {
        display: none;
    }

    .action div:hover {
        opacity: 1;
    }
</style>

<li class:completed={task.c}>
    <span class='text'>{task.v}</span>
    
    <div class='action' class:first={i === 0}>
        <div on:click>{task.c ? '🔄'  : "✔️"}</div>
        <div on:click={ _ => setEdit(task.id)}>{!task.c ? '✏️' : '' }</div>
    </div>
</li>