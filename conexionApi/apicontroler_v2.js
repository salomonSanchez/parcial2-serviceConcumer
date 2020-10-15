function listarCursos() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const getCursos = fetch('https://microservice-list.herokuapp.com/ListCourse', requestOptions)
        .then(checkStatus)
        .then(json);
    return getCursos
}

function listarPagos() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const getPagos = fetch('https://mics-pagos.herokuapp.com/api/v1/pagos/consultar/pagos', requestOptions)
        .then(checkStatus)
        .then(json);
    return getPagos
}


function registrarPagos(pago, elemento) {
    var urlencoded = new URLSearchParams();
    urlencoded.append("cod_estudiante", pago.cod_estudiante);
    urlencoded.append("cod_curso", pago.cod_curso);
    urlencoded.append("monto_pago", pago.monto_pago);

    var requestOptions = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
    };
    fetch('https://mics-pagos.herokuapp.com/api/v1/pagos/registrar/pago', requestOptions, elemento)
        .then(response => {
            validarRespuestaServidor(response, elemento)
        })
        .catch(error => console.log('error', error));
}

function registrarMatricula(matricula, elemento) {
    var urlencoded = new URLSearchParams();
    urlencoded.append("cod_curso", matricula.cod_curso);
    urlencoded.append("cod_estudiante", matricula.cod_estudiante);

    var requestOptions = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
    };
    fetch('https://mics-matriculas.herokuapp.com/api/v1/matricula/registrar', requestOptions, elemento)
        .then(response => {
            validarRespuestaServidor(response, elemento)
        })
        .catch(error => console.log('error', error));
}

function listarMatriculas() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const getmatricula = fetch('https://mics-matriculas.herokuapp.com/api/v1/matricula/consultar', requestOptions)
        .then(checkStatus)
        .then(json);
    return getmatricula
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json()
}


function validarRespuestaServidor(response, elemento) {
    var estado = false
    if (response.status == 200) {
        estado = true
        response.json()
    }
    if (response.status == 400) {
        submitContactFormMSG(estado, "No hay respuesta ", elemnto)
    }
    contactFormSuccess(estado, elemento)
}

function contactFormSuccess(estado, elemento) {
    if (estado == true) {
        submitContactFormMSG(estado, "Los datos han sido registrados exitosamente!", elemento);
    } else {
        submitContactFormMSG(estado, "Los datos no han sido registrados!", elemento);
    }
}

function submitContactFormMSG(valid, msg, elemnto) {
    if (valid == true) {
        var msgClasses = "h3 text-center text-success col-md-12";
    } else {
        var msgClasses = "h3 text-center text-danger col-md-12";
    }
    elemnto.className = "";
    elemnto.textContent = "";
    elemnto.className = msgClasses;
    elemnto.textContent += msg;
}




module.exports = {
    listarCursos,
    registrarPagos,
    listarPagos,
    registrarMatricula,
    listarMatriculas
}