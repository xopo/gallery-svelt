<script lang="ts">
    import icons from '../../WS/UI/emoji';
    export let task; 
    export let setEdit = _ => {};
</script>
<style>
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
        align-items: center;
    }
    .action div {
        cursor: pointer;
        padding: 0 .8em;
        opacity: .1;
    }
    li:hover .action div {
        opacity: .4;
    }
    .action div:empty {
        display: none;
    }

    li:hover .action div:hover {
        opacity: 1;
    }
</style>

<li class:completed={task.c}>
    <span class='text'>{task.v}</span>
    
    <div class='action'>
        <div on:click>{task.c ? icons.reload  : icons.ok}</div>
        <div on:click={ _ => setEdit(task.id)}>{!task.c ? icons.edit : '' }</div>
    </div>
</li>