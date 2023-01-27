import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "../styles/favorite.css";
import { PokemonType } from "../interface/Pokemon";
import { Link } from "react-router-dom";

interface Pokemon {
  data: PokemonType;
  id: number;
  name: string;
}

const Favorites = () => {
  const [fav, setFav] = useState<Pokemon[]>([]);

  useEffect(() => {
    getFav().then((data) => {
      setFav(data);
    });
  }, []);

  async function getFav() {
    const { data: auth } = await supabase.auth.getUser();
    const { data } = await supabase
      .from("Favorites")
      .select("*")
      .eq("user_id", auth.user?.id);
    if (data) {
      return data;
    } else {
      return [];
    }
  }

  // Si ya pasamos la validación del error...
  return (
    <div>
      <h1 className="h1-fav">Mis favoritos</h1>
      <nav>
        <ul className="ul-fav">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <div className="fav-list">
        <ul className="ul-fav fav">
          {fav &&
            fav.map((item) => {
              return (
                <li key={item.id} className="styleList">
                  <img
                    className="pokemon-img"
                    src={item.data.sprites.front_default}
                    alt={item.name}
                  />
                  <span>{item.data.name}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;
