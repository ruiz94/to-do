
const Task = function(){
    let tasks = [];
    let domTasks = document.querySelector('.tasks');
    this.init = () =>{
        document.querySelector('#texto').value = '';

        /** Comprobamos si el navegador es compatible con LocalStorage */
        if (typeof(Storage) !== "undefined") {
            /** traemos los datos del LocalStorage */
            let tsks = JSON.parse(localStorage.getItem("tasks"));
            if(tsks != null)
                tasks = tsks;
            if(tasks.length >= 1)
                this.draw();
        }
    }
    this.draw = (clas = '')=>{
        domTasks.innerHTML = '';
        tasks.some( (t, id) => {
            if(clas){
                if(clas == 'done'){
                    if(t.st == 0)
                        return false;
                }
                if(clas == 'pending'){
                    if(t.st == 1)
                        return false;
                }
            }
            let task = document.createElement('div');
            task.classList.add('task');
            task.dataset.id = id;

            let check = document.createElement('div');
            check.classList.add('check')
            if(t.st == 1)
                check.classList.add('done')

            let img1 = document.createElement('img');
            img1.classList.add('pen');
            img1.setAttribute('src', 'dry-clean.png')
            let img2 = document.createElement('img');
            img2.classList.add('done');
            img2.setAttribute('src', 'exito.png')
            check.append(img1, img2);

            task.append(check)

            let contenido = document.createElement('div');
            contenido.classList.add('contenido');
            let p = document.createElement('p');
            p.innerHTML = t.nombre;
            contenido.append(p);
            task.append(contenido)

            let spanDelete = document.createElement('img');
            spanDelete.classList.add('delete');
            spanDelete.setAttribute('src', 'cerrar.png')
            task.append(spanDelete)

            domTasks.appendChild(task);
        });
        focus()
    }
    this.newTask = (box)=>{
        tasks.push({nombre: box, st: 0});

        this.draw();
        document.querySelector('#texto').value = '';
        document.querySelector('#texto').focus()
        this.saveLocalStorage()
    }
    this.eliminar = (id)=>{
        tasks.splice(id, 1);
        this.draw();
        this.saveLocalStorage()
    }
    this.checker = (id) => {
        tasks[id].st = tasks[id].st == 0? 1 : 0;
        this.saveLocalStorage()
    }
    this.filtrar = (clas) => {
        this.draw(clas);
    }
    this.saveLocalStorage = () => {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
}

document.querySelector('.submit button').addEventListener('click', () =>{
    let box = document.querySelector('#texto').value
    if(box != '')
        task.newTask(box);
})
function focus(){
    document.querySelectorAll('.task').forEach( (taskEl) =>{
        taskEl.querySelector('.delete').addEventListener('click', eliminar);
    });

    document.querySelectorAll('.tasks .check').forEach( (check) => {
        check.addEventListener('click', checker);
    })

}
function eliminar(taskEl){
    id = taskEl.target.parentNode.dataset.id
    task.eliminar(id)
    
}
function checker(check){
    check = check.target.parentNode;
    id = check.parentNode.dataset.id
    check.classList.toggle('done')
    task.checker(id)
    
}
document.querySelectorAll('.filtos div').forEach( filtro => {
    filtro.addEventListener('click', (fil) => {
        quitaCheck();
        fil = fil.target
        clas = fil.classList[0]
        
        fil.classList.add('checked')
        task.filtrar(clas);
    })
})
function quitaCheck(){
    document.querySelectorAll('.filtos div').forEach( filtro => {
        filtro.classList.remove('checked')
    })
}
var task = new Task();
task.init();