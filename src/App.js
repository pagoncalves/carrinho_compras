import React from "react";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,//erro é nulo
      isLoaded: false,
      produtos: []
    };
  }

  componentDidMount() {//depois que Loading...
    fetch("http://127.0.0.1:3001/produtos")
      .then(res => res.json())//qndo recebe o resultado convert em json
      .then(//converte o resultado(result vira json) alterando o estado das variaveis
        (result) => {
          this.setState({
            isLoaded: true,
            produtos: result,
          });
        },
        // Nota: É importante lidar com os erros aqui
        // em vez de um bloco catch() para não recebermos
        // exceções de erros dos componentes.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, produtos } = this.state;//cria 3 variaveis constantes
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <ul style={{ listStyleType: 'none' }}>
            {produtos.map(item => (//imprimir o valor de todos os elemento .map(é um método), cada elemento da lista é um "item"
              <li key={item.id}>

<br/>
                Nome: {item.nome} <br/> Vlr unit: {item.vlu} <br/> Qtde:{item.qtd}
                <button onClick={this.handleAdd}> + </button>
                <button onClick={this.handleRem}> - </button> 
              </li>
            ))}
          </ul>
          <p>{this.state.op}</p>
          <div>

            <button onClick={this.handleEnviar}>Enviar: </button>

          </div>

        </div>

      );

    }//cada item é um objeto, 

  }

}
export default App;
