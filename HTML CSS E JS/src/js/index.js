let participantes = [
    {
      nome: "Marcelo Mello",
      email: "marcelo@gmail.com",
      dataInscricao: new Date(2024, 3, 1, 19, 35),
      dataCheckIn: new Date(2024, 3, 2, 8, 30),
    },
    {
      nome: "Maisa Porto",
      email: "maisa@gmail.com",
      dataInscricao: new Date(2024, 2, 6, 19, 35),
      dataCheckIn: null,
    },
    {
      nome: "Maria Luiza",
      email: "malu@gmail.com",
      dataInscricao: new Date(2024, 1, 29, 19, 35),
      dataCheckIn: new Date(2024, 2, 12, 8, 30),
    },
    {
      nome: "Mateus Silva",
      email: "mateus@gmail.com",
      dataInscricao: new Date(2023, 11, 1, 19, 35),
      dataCheckIn: null,
    },
    {
      nome: "Pedro Gouveia",
      email: "pedro@gmail.com",
      dataInscricao: new Date(2023, 11, 29, 19, 35),
      dataCheckIn: null,
    },
]

const criarNovoParticipante = (participante) => {
  const dataInscricao =  dayjs(Date.now()).to(participante.dataInscricao);
  
  let dataCheckIn =  dayjs(Date.now()).to(participante.dataCheckIn);

  if (participante.dataCheckIn === null) {
    dataCheckIn = `
      <button data-email="${participante.email}" onClick="fazerCheckIn(event)">Confirmar check-in</button>
    `
  }

  return `
    <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
          <br>
          <small>
            ${participante.email}
          </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizaLista = (participantes) => {
  let output = ""
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document.querySelector('tbody').innerHTML = output
}

atualizaLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null,
  }

  const participanteExiste = participantes.find((p) => p.email === participante.email)

  if (participanteExiste) {
    alert('Email já cadastrado.')
    return
  }

  participantes = [participante, ...participantes]
  atualizaLista(participantes)

  event.target.querySelector('[name="nome"]').value="";
  event.target.querySelector('[name="email"]').value="";

}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = confirm("Tem certeza que deseja fazer o check in?")
  
  if (mensagemConfirmacao === false) {
    return
  }

  const participante = participantes.find((p) => {
    return p.email === event.target.dataset.email
  })
  participante.dataCheckIn = new Date()

  atualizaLista(participantes)
}