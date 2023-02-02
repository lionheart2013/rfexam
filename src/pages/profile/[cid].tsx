import {Hero} from "@/common/hero.types";
import Image from "next/image";

export async function getServerSideProps(context: { params: { cid: string } }) {
    const {cid} = context.params;
    const resp = await fetch(`https://superheroapi.com/api.php/${process.env.API_KEY}/${cid}`);
    const data = await resp.json();
    if (data.response === 'success') {
        return {props: data}
    }
    return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
}

export default function Profile(hero: Hero) {
    return (
        <div className="wrapper">
            <div>
                <h1>#{hero.id} - {hero.biography["full-name"]}</h1>
                <Image src={hero.image.url} alt={hero.name} width="300" height="400"/>
            </div>
            <div id="powerstats-wrapper">
                <h4>Power Stats</h4>
                <ul>
                    <li>Intelligence: <span>{hero.powerstats.intelligence}</span></li>
                    <li>Strength: <span>{hero.powerstats.strength}</span></li>
                    <li>Speed: <span>{hero.powerstats.speed}</span></li>
                    <li>Durability: <span>{hero.powerstats.durability}</span></li>
                    <li>Power: <span>{hero.powerstats.power}</span></li>
                    <li>Combat: <span>{hero.powerstats.combat}</span></li>
                </ul>
            </div>
            {/* other details goes here */}
        </div>
    );
}
