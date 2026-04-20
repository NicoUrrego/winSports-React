import "./style.css";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useState } from "react";

interface TeamData {
  team: {
    name: string;
    info: {
      city: string;
      founded: string;
      stadium: string;
      president: string;
      last_title: string;
    };
    ranking: {
      position: string;
      competition: string;
    };
    social: {
      facebook: string;
      instagram: string;
      x: string;
    };
    links: {
      store: string;
      tickets: string;
    };
  };
}

function Equipo (){

    const { equipo } = useParams<{ equipo: string}>()
    const [data, setData] = useState<TeamData | null>(null);
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {

        if (!equipo) return;

        // Revisar si ya es favorito
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        if (favorites.includes(equipo)) {
          setIsFavorite(true);
        }

        const fetchData = async () => {
          try {
            const res = await fetch(`https://raw.githubusercontent.com/sdtibata/dataliga/main/${equipo}.json`);
            const data = await res.json()
    
            setData(data)
          } catch (error) {
            console.error('Error cargando datos:', error)
          }
        }

        fetchData()
  }, [equipo])

  const toggleFavorite = () => {
  if (!equipo) return;

  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

if (favorites.includes(equipo)) {
      favorites = favorites.filter((fav: string) => fav !== equipo);
      setIsFavorite(false);
    } else {
      favorites.push(equipo);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  if (!data) return <p>Cargando...</p>
    return(
        <div>


            <h1>{data.team.name}</h1>

              <button onClick={toggleFavorite}>
                {isFavorite ? "❤️" : "🤍"}
              </button>
            


            <h2>Informacion: </h2>
            <p><strong>Ciudad: </strong>{data.team.info.city}</p>
            <p><strong>Fundado: </strong>{data.team.info.founded}</p>
            <p><strong>Estadio: </strong>{data.team.info.stadium}</p>
            <p><strong>Presidente: </strong>{data.team.info.president}</p>
            <p><strong>Ultimo Titulo: </strong>{data.team.info.last_title}</p>
        </div>
    )
}

export default Equipo