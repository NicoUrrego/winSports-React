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

    useEffect(() => {

        if (!equipo) return;

        const fetchData = async () => {
          try {
            const res = await fetch('https://raw.githubusercontent.com/sdtibata/dataliga/main/${equipo.json}');
            const data = await res.json()
    
            setData(data)
          } catch (error) {
            console.error('Error cargando datos:', error)
          }
        }

        fetchData()
  }, [equipo])

  if (!data) return <p>Cargando...</p>
    return(
        <div>
            <h1>{data.team.name}</h1>

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