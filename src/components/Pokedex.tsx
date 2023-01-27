import { useState, useEffect } from "react";
import PokedexScreen from "./PokedexScreen";
import PokemonForm from "./PokemonForm";
import "../styles/pokedex.css";
import { PokemonType } from "../interface/Pokemon";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Pokedex = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const randomId = Math.floor(Math.random() * 806 + 1);
  const [pokemonID, setPokemonId] = useState<number | string>(randomId);
  const navigate = useNavigate();
  const [loged, setLogin] = useState(
    Boolean(localStorage.getItem("login")) || false
  );

  // Solamente esta cargando mientras hacemos la petición,
  // cuando esta se resuelve o fue un éxito u un error.
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      .then((res) => res.json())
      .then((data) => {
        // Si todo esta cool, actualizamos el pokemón
        // Y le indicamos que no hay error
        setPokemon(data);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, [pokemonID]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const auth = await getUser();
    const { data, error } = await supabase
      .from("Favorites")
      .insert([
        {
          id: pokemon?.id,
          data: pokemon,
          name: pokemon?.name,
          user_id: auth.user?.id,
        },
      ]);
    if (error) {
      alert("Hubo un error o ya fue añadido");
    } else {
      alert("Subido correctamente");
    }
    console.log(data, error);
  };

  async function signInWithGitHub(event: any) {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    localStorage.setItem("login", "true");
    setLogin(true);
    return { data: data, error: error };
  }

  async function signout() {
    const { error } = await supabase.auth.signOut();
    localStorage.setItem("login", "false");
    setLogin(false);
    return error;
  }

  async function getUser() {
    const { data } = await supabase.auth.getUser();
    return data;
  }

  async function getFav() {
    const { error } = await supabase.auth.getUser();
    if (error) {
      return;
    } else {
      navigate("/favoritos");
    }
  }

  return (
    <>
      <div className="pokedex">
        <div className="pokedex-left">
          <div className="pokedex-left-top">
            <div
              className={`light is-sky is-big ${loading && "is-animated"}`}
            />
            <div className="light is-red" />
            <div className="light is-yellow" />
            <div className="light is-green" />
          </div>
          <div className="pokedex-screen-container">
            <PokedexScreen pokemon={pokemon} loading={loading} error={error} />
          </div>
          <div className="pokedex-left-bottom">
            <div className="pokedex-left-bottom-lights">
              <div className="light is-blue is-medium" />
              <div
                className="light is-green is-large is-pointer"
                onClick={handleSubmit}
              />
              <div className="light is-orange is-large" />
            </div>
            <PokemonForm
              setPokemonId={setPokemonId}
              setLoading={setLoading}
              setError={setError}
            />
          </div>
        </div>
        <div className="pokedex-right-front" />
        <div className="pokedex-right-back" />
        <button onClick={signInWithGitHub}>Log In</button>
        <button onClick={signout}>Log Out</button>
        {loged ? <button onClick={getFav}>Mis favoritos</button> : null}
      </div>
    </>
  );
};

export default Pokedex;
