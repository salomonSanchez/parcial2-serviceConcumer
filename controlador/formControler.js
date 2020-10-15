const apiControlv2 = require("../conexionApi/apicontroler_v2")

//formulario lista cursos matriculados
const listCursosForm = document.querySelector("#buscarCursosForm");
//formulario registro pagos 
const pagosForm = document.querySelector("#pagosForm");
//formulario registro matriculas
const matriculaForm = document.querySelector("#matriculaForm");


if (listCursosForm) {
    const cursosTablebody = document.querySelector("#tablabody_cursos");
    const cuentabuscarlabel = document.querySelector("#msgTablacursos");
    llenar_tabla_cuentas();

    listCursosForm.addEventListener("submit", async(e) => {
        e.preventDefault()
        llenar_tabla_cuentas();

    });

    function llenar_tabla_cuentas() {
        var h_cursos = apiControlv2.listarCursos();
        h_cursos.then(res => {
            if (res.length !== 0) {
                cursosTablebody.innerHTML = "";
                for (var i = 0; i < res.length; i++) {
                    var row = `<tr>  
                                    <td>${res[i].codigo}</td>
                                    <td>${res[i].nombre}</td>
                                    <td>${res[i].creditos}</td>
                                </tr>`
                    cursosTablebody.innerHTML += row;
                }
                // pintarLabel(lb_ncuenta, "");
                paginarTabla('#id_bcursos', '#tabla_cursos')

            } else {
                agregarMensaje(cuentabuscarlabel, "no hay datos para mostrar")
            }
        });
    }
}

if (pagosForm) {

    const pagoscoMesg = document.querySelector("#msgContactSubmitpago");
    const pagoseMonto = document.querySelector("#monto_pago");
    const pagoscodEstudiante = document.querySelector("#estudiante_id");
    const pagoscodCurso = document.querySelector("#curso_id");

    const pagosTablebody = document.querySelector("#tabla_body_pagos");
    const pagosbuscarlabel = document.querySelector("#msgTablapagos");

    llenar_tabla_pagos()
    pagosForm.addEventListener("submit", async(e) => {
        try {
            e.preventDefault();
            const Pago = {
                cod_estudiante: pagoscodEstudiante.value,
                cod_curso: pagoscodCurso.value,
                monto_pago: pagoseMonto.value,

            };

            apiControlv2.registrarPagos(Pago, pagoscoMesg);
            pagosForm.reset();
            llenar_tabla_pagos()
                //actualizar()
        } catch (error) {
            console.log(error);
        }
    });

    function llenar_tabla_pagos() {
        var h_pagos = apiControlv2.listarPagos();
        h_pagos.then(res => {
            if (res.length !== 0) {
                console.log("tare: ", res)
                pagosTablebody.innerHTML = "";
                for (var i = 0; i < res.length; i++) {
                    var row = `<tr>  
                                    <td>${res[i]._id}</td>
                                    <td>${res[i].cod_estudiante}</td>
                                    <td>${res[i].cod_curso}</td>
                                    <td>${res[i].monto_pago}</td>
                                </tr>`
                    pagosTablebody.innerHTML += row;
                }
                // pintarLabel(lb_ncuenta, "");
                paginarTabla('#el_bpago', '#tabla_pagos')

            } else {
                agregarMensaje(pagosbuscarlabel, "no hay datos para mostrar")
            }
        });
    }

}

if (matriculaForm) {
    const matriculacodEstudiante = document.querySelector("#cod_estudiante");
    //const matriculanNombreEst = document.querySelector("#nombre_estudiante");
    const matriculaCodCurso = document.querySelector("#cod_curso");
    //const matriculaSexoEstudiante = document.querySelector("#sexo_id");
    const matriculaMesanje = document.querySelector("#msgContactSubmitmatricula");

    const matriculaTablebody = document.querySelector("#tablabody_matricula");
    const matriculabuscarlabel = document.querySelector("#msgTablamatriculas");

    llenar_tabla_matricula();
    matriculaForm.addEventListener("submit", async(e) => {
        try {
            e.preventDefault();
            const matricula = {
                cod_curso: matriculacodEstudiante.value,
                cod_estudiante: matriculaCodCurso.value
            };
            apiControlv2.registrarMatricula(matricula, matriculaMesanje);
            matriculaForm.reset();
            llenar_tabla_matricula();
            //actualizar()
        } catch (error) {
            console.log(error);
        }
    });

    function llenar_tabla_matricula() {
        var h_matricula = apiControlv2.listarMatriculas();
        h_matricula.then(res => {
            if (res.length !== 0) {

                matriculaTablebody.innerHTML = "";
                for (var i = 0; i < res.length; i++) {
                    var row = `<tr>  
                                    <td>${res[i]._id}</td>
                                    <td>${res[i].cod_estudiante}</td>
                                    <td>${res[i].cod_curso}</td>
                                </tr>`
                    matriculaTablebody.innerHTML += row;
                }
                // pintarLabel(lb_ncuenta, "");
                paginarTabla('#el_buscaMatricula', '#Tabla_matricula')

            } else {
                agregarMensaje(matriculabuscarlabel, "no hay datos para mostrar")
            }
        });
    }
}

function actualizar() {
    location.reload(true);
}

function pintarLabel(elemneto, color) {
    elemneto.style.color = color
}

function agregarMensaje(elemento, mensaje) {
    var msgClasses = "h5 text-center text-danger col-md-12";
    elemento.className = "";
    elemento.textContent = "";
    elemento.className = msgClasses;
    elemento.textContent = mensaje;
}

function paginarTabla(el_idBuscador, el_idTabla) {
    let options = {
        numberPerPage: 8,
        goBar: true,
        pageCounter: false,
    };
    let filterOptions = {
        el: el_idBuscador
    };
    paginate.init(el_idTabla, options, filterOptions);
}