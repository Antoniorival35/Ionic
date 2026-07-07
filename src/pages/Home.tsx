import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [endereco, setEndereco] = useState({
    cep: "",
    localidade: "",
    uf: "",
    logradouro: "",
    bairro: "",
  });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const buscarCep = async () => {
      setLoading(true);
      setErro("");

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await fetch(
          "https://viacep.com.br/ws/49680000/json/"
        );

        const data = await response.json();

        if (data.erro) {
          setErro("CEP inválido.");
        } else {
          setEndereco(data);
        }
      } catch (error) {
        setErro("Erro ao buscar o CEP.");
      } finally {
        setLoading(false);
      }
    };

    buscarCep();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Consulta CEP</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ padding: "20px" }}>
          <h1>Consulta CEP</h1>

          {loading && <p>Carregando...</p>}

          {erro && (
            <p style={{ color: "red" }}>
              {erro}
            </p>
          )}

          {!loading && !erro && (
            <>
              <h2>Cidade</h2>
              <p>{endereco.localidade}</p>

              <h2>CEP</h2>
              <p>{endereco.cep}</p>

              <h2>Estado</h2>
              <p>{endereco.uf}</p>

              <h2>Rua</h2>
              <p>{endereco.logradouro}</p>

              <h2>Bairro</h2>
              <p>{endereco.bairro}</p>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
